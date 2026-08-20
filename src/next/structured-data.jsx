export const SITE_URL = "https://ludno.ru";
export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export function absoluteUrl(pathname = "/") {
  return new URL(pathname, SITE_URL).href;
}

export function JsonLd({ data }) {
  const value = Array.isArray(data) && data.length === 1 ? data[0] : data;
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(value).replace(/</g, "\\u003c"),
      }}
    />
  );
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: "Людно",
    legalName: "ООО «Людно»",
    url: `${SITE_URL}/`,
    logo: `${SITE_URL}/favicon.svg`,
    image: `${SITE_URL}/assets/images/third.webp`,
    email: "info@ludno.ru",
    telephone: "+7-800-350-24-20",
    sameAs: ["https://t.me/ludnoo", "https://www.pinterest.com/ludnoru"],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: `${SITE_URL}/`,
    name: "Людно",
    inLanguage: "ru-RU",
    publisher: { "@id": ORGANIZATION_ID },
  };
}

export function breadcrumbSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function webPageSchema({ name, description, path, type = "WebPage" }) {
  const url = absoluteUrl(path);
  return {
    "@context": "https://schema.org",
    "@type": type,
    "@id": `${url}#webpage`,
    url,
    name,
    description,
    inLanguage: "ru-RU",
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORGANIZATION_ID },
  };
}

export function itemListSchema({ name, path, items }) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${absoluteUrl(path)}#itemlist`,
    name,
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: absoluteUrl(item.path),
      ...(item.image ? { image: item.image } : {}),
    })),
  };
}

export function StandardPageJsonLd({ name, description, path, type = "WebPage" }) {
  return (
    <JsonLd data={[
      webPageSchema({ name, description, path, type }),
      breadcrumbSchema([
        { name: "Главная", path: "/" },
        { name, path },
      ]),
    ]} />
  );
}
