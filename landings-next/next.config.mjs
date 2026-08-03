import path from "node:path";

const nextConfig = {
  output: "export",
  trailingSlash: true,
  distDir: ".next",
  images: { unoptimized: true },
  webpack(config) {
    config.resolve.alias["react-router-dom"] = path.resolve(
      process.cwd(),
      "src/next/router-adapter.jsx"
    );
    return config;
  },
};

export default nextConfig;
