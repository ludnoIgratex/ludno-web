import "../../src/index.css";
import "../../src/App.css";

export const metadata = {
  metadataBase: new URL("https://ludno.ru"),
  title: "Архитектурные игровые и спортивные площадки | Людно",
  description: "Людно проектирует и производит архитектурные детские и спортивные площадки, оборудование для парков, дворов и общественных пространств.",
  applicationName: "Людно",
  verification: {
    yandex: "01566f4a9307cd48",
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({ children }) {
  return <html lang="ru"><body>{children}</body></html>;
}
