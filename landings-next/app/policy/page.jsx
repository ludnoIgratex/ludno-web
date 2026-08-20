import { SiteFooter, SiteHeader } from "../../../src/next/SiteChrome";
import { PolicyNext } from "../../../src/next/LegacyNextPages";
import { StandardPageJsonLd } from "../../../src/next/structured-data";

const title = "Правовая информация | Людно";
const description = "Правовая информация ООО «Людно»: интеллектуальная собственность, условия использования сайта и обработка персональных данных.";

export const metadata = {
  title,
  description,
  alternates: { canonical: "/policy" },
  openGraph: { title, description, url: "/policy", siteName: "Людно", locale: "ru_RU", type: "website" },
};

export default function PolicyPage() {
  return <div className="app__container"><SiteHeader /><main className="content"><PolicyNext /></main><SiteFooter /><StandardPageJsonLd name={title} description={description} path="/policy/" /></div>;
}
