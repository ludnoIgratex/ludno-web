import { SiteFooter, SiteHeader } from "../../../src/next/SiteChrome";
import { EpdmConfiguratorNext } from "../../../src/next/LegacyNextPages";

const title = "Конфигуратор цветовых смесей EPDM | Людно";
const description = "Онлайн-конфигуратор смесей EPDM-крошки: подбор цветов и пропорций для покрытий детских и спортивных площадок.";

export const metadata = {
  title,
  description,
  alternates: { canonical: "/epdm-configurator" },
  openGraph: { title, description, url: "/epdm-configurator", siteName: "Людно", locale: "ru_RU", type: "website" },
};

export default function EpdmConfiguratorPage() {
  return <div className="app__container"><SiteHeader /><main className="content"><EpdmConfiguratorNext /></main><SiteFooter /></div>;
}
