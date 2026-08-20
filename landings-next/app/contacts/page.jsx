import { SiteFooter, SiteHeader } from "../../../src/next/SiteChrome";
import { ContactsNext } from "../../../src/next/LegacyNextPages";
import { JsonLd, ORGANIZATION_ID, StandardPageJsonLd } from "../../../src/next/structured-data";

const title = "Контакты и консультация | Людно";
const description = "Свяжитесь с командой Людно по вопросам проектирования, подбора и поставки оборудования для детских, спортивных и общественных пространств.";

export const metadata = {
  title,
  description,
  alternates: { canonical: "/contacts" },
  openGraph: { title, description, url: "/contacts", siteName: "Людно", locale: "ru_RU", type: "website" },
};

export default function ContactsPage() {
  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": "https://ludno.ru/contacts/#contact",
    name: title,
    url: "https://ludno.ru/contacts/",
    mainEntity: { "@id": ORGANIZATION_ID },
  };
  return <div className="app__container"><SiteHeader /><main className="content"><h1 className="seo-visually-hidden">Контакты компании Людно</h1><ContactsNext /></main><SiteFooter /><StandardPageJsonLd name={title} description={description} path="/contacts/" /><JsonLd data={contactSchema} /></div>;
}
