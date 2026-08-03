import "../../src/index.css";
import "../../src/App.css";

export const metadata = {
  metadataBase: new URL("https://ludno.ru"),
  title: "Людно — архитектура игровых пространств",
  description: "Архитектурные игровые и спортивные площадки Людно.",
};

export default function RootLayout({ children }) {
  return <html lang="ru"><body>{children}</body></html>;
}
