import { notFound } from "next/navigation";
import LandingPage from "../../../src/next/LandingPage";
import { landingMetadata, landingSlugs } from "../../../src/next/landing-metadata";

export const dynamicParams = false;

export function generateStaticParams() {
  return landingSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const landing = landingMetadata[slug];
  if (!landing) return {};
  return {
    title: landing.title,
    description: landing.description,
    alternates: { canonical: `/${slug}` },
    openGraph: { title: landing.title, description: landing.description, url: `/${slug}`, siteName: "Людно", locale: "ru_RU", type: "website" },
  };
}

export default async function Page({ params }) {
  const { slug } = await params;
  if (!landingMetadata[slug]) notFound();
  return <LandingPage slug={slug} />;
}
