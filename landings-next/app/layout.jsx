import "../../src/index.css";
import "../../src/App.css";

export const metadata = {
  metadataBase: new URL("https://ludno.ru"),
  title: "Архитектурные игровые и спортивные площадки | Людно",
  description: "Людно проектирует и производит архитектурные детские и спортивные площадки, оборудование для парков, дворов и общественных пространств.",
  applicationName: "Людно",
};

export default function RootLayout({ children }) {
  return <html lang="ru"><body>{children}</body></html>;
}
