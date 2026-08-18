import { SiteFooter, SiteHeader } from "../../../src/next/SiteChrome";
import { ContactsNext } from "../../../src/next/LegacyNextPages";

const title = "Контакты и консультация | Людно";
const description = "Свяжитесь с командой Людно по вопросам проектирования, подбора и поставки оборудования для детских, спортивных и общественных пространств.";

export const metadata = {
  title,
  description,
  alternates: { canonical: "/contacts" },
  openGraph: { title, description, url: "/contacts", siteName: "Людно", locale: "ru_RU", type: "website" },
};

export default function ContactsPage() {
  return <div className="app__container"><SiteHeader /><main className="content"><h1 className="seo-visually-hidden">Контакты компании Людно</h1><ContactsNext /></main><SiteFooter /></div>;
}
