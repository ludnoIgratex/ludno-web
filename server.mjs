import { createReadStream } from "node:fs";
import { access, stat } from "node:fs/promises";
import { createServer } from "node:http";
import { extname, join, normalize } from "node:path";

const PORT = Number(process.env.PORT) || 3000;
const DIST_DIR = join(process.cwd(), "dist");
const API_KEY = process.env.UNISENDER_API_KEY;
const LIST_ID = process.env.UNISENDER_LIST_ID || "6";
const BODY_LIMIT = 10_000;
const attempts = new Map();

const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".gif": "image/gif",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".mp4": "video/mp4",
  ".pdf": "application/pdf",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".ttf": "font/ttf",
  ".webmanifest": "application/manifest+json",
  ".woff2": "font/woff2",
};

function json(response, status, body) {
  response.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
  });
  response.end(JSON.stringify(body));
}

function clientIp(request) {
  return (
    request.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
    request.socket.remoteAddress ||
    "unknown"
  );
}

function isRateLimited(ip) {
  const now = Date.now();
  const recent = (attempts.get(ip) || []).filter((time) => now - time < 60_000);
  recent.push(now);
  attempts.set(ip, recent);
  return recent.length > 5;
}

function readJson(request) {
  return new Promise((resolve, reject) => {
    let body = "";

    request.setEncoding("utf8");
    request.on("data", (chunk) => {
      body += chunk;
      if (body.length > BODY_LIMIT) {
        reject(new Error("payload_too_large"));
        request.destroy();
      }
    });
    request.on("end", () => {
      try {
        resolve(JSON.parse(body));
      } catch {
        reject(new Error("invalid_json"));
      }
    });
    request.on("error", reject);
  });
}

async function subscribe(request, response) {
  if (isRateLimited(clientIp(request))) {
    return json(response, 429, {
      message: "Слишком много попыток. Попробуйте через минуту.",
    });
  }

  if (!API_KEY) {
    console.error("UNISENDER_API_KEY is not configured");
    return json(response, 503, {
      message: "Подписка временно недоступна.",
    });
  }

  let data;
  try {
    data = await readJson(request);
  } catch {
    return json(response, 400, { message: "Некорректные данные формы." });
  }

  const name = typeof data.name === "string" ? data.name.trim() : "";
  const email = typeof data.email === "string" ? data.email.trim() : "";
  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (!name || name.length > 100 || !isEmail || email.length > 254) {
    return json(response, 400, {
      message: "Проверьте имя и адрес электронной почты.",
    });
  }
  if (
    data.personalDataConsent !== true ||
    data.marketingConsent !== true
  ) {
    return json(response, 400, {
      message: "Для подписки необходимо принять оба согласия.",
    });
  }

  const params = new URLSearchParams({
    format: "json",
    api_key: API_KEY,
    list_ids: LIST_ID,
    "fields[email]": email,
    "fields[Name]": name,
    double_optin: "3",
    overwrite: "2",
  });

  try {
    const unisenderResponse = await fetch(
      "https://api.unisender.com/ru/api/subscribe",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params,
        signal: AbortSignal.timeout(10_000),
      }
    );
    const result = await unisenderResponse.json();

    if (!unisenderResponse.ok || result.error) {
      console.error("Unisender subscribe error:", result.code || result.error);
      return json(response, 502, {
        message: "Не удалось оформить подписку. Попробуйте позже.",
      });
    }

    return json(response, 200, {
      message: "Готово! Вы подписаны на рассылку.",
    });
  } catch (error) {
    console.error("Unisender request failed:", error.message);
    return json(response, 502, {
      message: "Сервис рассылки временно недоступен. Попробуйте позже.",
    });
  }
}

async function serveStatic(request, response) {
  const url = new URL(request.url, `http://${request.headers.host || "localhost"}`);
  const requestedPath = normalize(decodeURIComponent(url.pathname)).replace(
    /^(\.\.(\/|\\|$))+/,
    ""
  );
  let filePath = join(DIST_DIR, requestedPath);

  try {
    const fileStat = await stat(filePath);
    if (fileStat.isDirectory()) filePath = join(filePath, "index.html");
    await access(filePath);
  } catch {
    filePath = join(DIST_DIR, "index.html");
  }

  const extension = extname(filePath).toLowerCase();
  const immutable = requestedPath.startsWith("/assets/");
  response.writeHead(200, {
    "Content-Type": mimeTypes[extension] || "application/octet-stream",
    "Cache-Control": immutable
      ? "public, max-age=31536000, immutable"
      : "no-cache",
    "X-Content-Type-Options": "nosniff",
  });
  createReadStream(filePath).pipe(response);
}

const server = createServer(async (request, response) => {
  if (
    request.method === "POST" &&
    request.url === "/api/newsletter/subscribe"
  ) {
    return subscribe(request, response);
  }
  if (request.method === "GET" || request.method === "HEAD") {
    return serveStatic(request, response);
  }

  return json(response, 405, { message: "Метод не поддерживается." });
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Ludno server is listening on port ${PORT}`);
});
