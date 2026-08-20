import { SiteFooter, SiteHeader } from "../../../src/next/SiteChrome";
import { SwingCalculatorNext } from "../../../src/next/LegacyNextPages";
import { StandardPageJsonLd } from "../../../src/next/structured-data";

const title = "Калькулятор зоны приземления качелей | Людно";
const description = "Расчёт зоны приземления, высоты свободного падения и безопасных расстояний для детских качелей разных типов.";

export const metadata = {
  title,
  description,
  alternates: { canonical: "/kalkulyator-prizemleniya-kacheley" },
  openGraph: { title, description, url: "/kalkulyator-prizemleniya-kacheley", siteName: "Людно", locale: "ru_RU", type: "website" },
};

export default function SwingCalculatorPage() {
  return <div className="app__container"><SiteHeader /><main className="content"><SwingCalculatorNext /></main><SiteFooter /><StandardPageJsonLd name={title} description={description} path="/kalkulyator-prizemleniya-kacheley/" type="WebApplication" /></div>;
}
