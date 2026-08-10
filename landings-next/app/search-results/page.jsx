import { SiteFooter, SiteHeader } from "../../../src/next/SiteChrome";
import { SearchResultsNext } from "../../../src/next/LegacyNextPages";

export const metadata = {
  title: "Результаты поиска | Людно",
  robots: { index: false, follow: true },
};

export default function SearchResults() {
  return <div className="app__container"><SiteHeader /><main className="content"><SearchResultsNext /></main><SiteFooter /></div>;
}
