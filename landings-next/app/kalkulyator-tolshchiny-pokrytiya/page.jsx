import { SiteFooter, SiteHeader } from "../../../src/next/SiteChrome";
import { SurfaceCalculatorNext } from "../../../src/next/LegacyNextPages";

const title = "Калькулятор толщины покрытия площадки | Людно";
const description = "Расчёт необходимой толщины безопасного покрытия детской площадки с учётом типа оборудования и высоты свободного падения.";

export const metadata = {
  title,
  description,
  alternates: { canonical: "/kalkulyator-tolshchiny-pokrytiya" },
  openGraph: { title, description, url: "/kalkulyator-tolshchiny-pokrytiya", siteName: "Людно", locale: "ru_RU", type: "website" },
};

export default function SurfaceCalculatorPage() {
  return <div className="app__container"><SiteHeader /><main className="content"><SurfaceCalculatorNext /></main><SiteFooter /></div>;
}
