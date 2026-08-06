import { SiteFooter, SiteHeader } from "../../src/next/SiteChrome";
import HomePageNext from "../../src/next/HomePageNext";

const title = "Архитектурные игровые и спортивные площадки | Людно";
const description = "Людно проектирует и производит архитектурные детские и спортивные площадки, оборудование для парков, дворов и современных общественных пространств.";

export const metadata = {
  title,
  description,
  alternates: { canonical: "/" },
  openGraph: {
    title,
    description,
    url: "/",
    siteName: "Людно",
    locale: "ru_RU",
    type: "website",
    images: [{ url: "/assets/images/third.webp", alt: "Архитектурная игровая площадка Людно" }],
  },
};

const organizationData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Людно",
  url: "https://ludno.ru",
  logo: "https://ludno.ru/favicon.svg",
  description,
  email: "info@ludno.ru",
  telephone: "+7-800-350-24-20",
  sameAs: ["https://t.me/ludnoo", "https://www.pinterest.com/ludnoru"],
};

export default function HomePage() {
  return (
    <div className="app__container">
      <SiteHeader />
      <main className="content">
        <HomePageNext />
      </main>
      <SiteFooter />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
      />
    </div>
  );
}

