import { SiteFooter, SiteHeader } from "../../../src/next/SiteChrome";
import BlogCatalog from "../../../src/next/BlogCatalog";
import { getPosts, getPostTags } from "../../../src/next/blog-data";

const title = "Блог Людно о детских площадках и благоустройстве";
const description = "Статьи Людно о проектировании детских и спортивных площадок, благоустройстве общественных пространств, безопасности, материалах и оборудовании.";

export const metadata = {
  title,
  description,
  alternates: { canonical: "/blog" },
  openGraph: {
    title,
    description,
    url: "/blog",
    siteName: "Людно",
    locale: "ru_RU",
    type: "website",
  },
};

export default async function BlogPage() {
  const [posts, tags] = await Promise.all([getPosts(), getPostTags()]);
  return (
    <div className="app__container">
      <SiteHeader />
      <main className="content">
        <BlogCatalog posts={posts} tags={tags} />
      </main>
      <SiteFooter />
    </div>
  );
}
