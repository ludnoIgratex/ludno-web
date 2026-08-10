import { SiteFooter, SiteHeader } from "../../src/next/SiteChrome";
import NotFoundPage from "../../src/components/NotFoundPage/NotFoundPage";

export const metadata = {
  title: "Страница не найдена | Людно",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return <div className="app__container"><SiteHeader /><main className="content"><NotFoundPage /></main><SiteFooter /></div>;
}
