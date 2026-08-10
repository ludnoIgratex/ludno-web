import { marked } from "marked";
import { FaPinterest, FaTelegram } from "react-icons/fa";
import styles from "../pages/Blog/PostPage/styles/PostPage.module.css";
import { imageAlt } from "./image-alt";

function contentBlocks(markdown = "") {
  const renderer = new marked.Renderer();
  renderer.blockquote = function (token) {
    if ((token.text || "").trim().toLowerCase() === "quote") return "{{quote}}";
    return `<blockquote>${this.parser.parse(token.tokens, this.options)}</blockquote>`;
  };

  const tokens = marked.lexer(String(markdown || ""));
  const h1Index = tokens.findIndex((token) => token.type === "heading" && token.depth === 1);
  if (h1Index !== -1) tokens.splice(h1Index, 1);
  const html = marked.parser(tokens, { renderer });
  const pieces = html.split(/(<img.*?>)/g).filter((piece) => piece.trim());
  const blocks = [];
  let images = [];

  const flushImages = () => {
    if (images.length) blocks.push({ type: "images", content: images });
    images = [];
  };

  for (const piece of pieces) {
    const image = piece.match(/<img.*?src="(.*?)".*?alt="(.*?)".*?>/);
    if (image) {
      const caption = image[2] || "Изображение";
      images.push({ src: image[1], alt: imageAlt(caption, "Изображение"), caption });
      continue;
    }
    flushImages();
    const parts = piece.split("{{quote}}");
    parts.forEach((part, index) => {
      if (part) blocks.push({ type: "text", content: part });
      if (index < parts.length - 1) blocks.push({ type: "quote" });
    });
  }
  flushImages();
  return blocks;
}

export default function PostContent({ text }) {
  return contentBlocks(text).map((block, index) => {
    if (block.type === "text") {
      return <div key={index} dangerouslySetInnerHTML={{ __html: block.content }} />;
    }
    if (block.type === "images") {
      if (block.content.length > 1) {
        return (
          <div key={index} className={styles.imageScrollContainer}>
            {block.content.map((image) => (
              <figure key={image.src} className={styles.scrollImage}>
                <img src={image.src} alt={image.alt} loading="lazy" />
                <figcaption className={styles.alt}>{image.caption}</figcaption>
              </figure>
            ))}
          </div>
        );
      }
      const image = block.content[0];
      return (
        <figure className={styles.singleImageContainer} key={index}>
          <img src={image.src} alt={image.alt} loading="lazy" />
          <figcaption className={styles.altSingle}>{image.caption}</figcaption>
        </figure>
      );
    }
    return (
      <aside className={styles.quoteContainer} key={index}>
        <div className={styles.quoteWrapper}>
          <div className={styles.quoteLinksContainer}>
            <a href="https://www.pinterest.com/ludnoru" target="_blank" rel="noopener noreferrer"><FaPinterest />Pinterest</a>
            <a href="https://t.me/ludnoo" target="_blank" rel="noopener noreferrer"><FaTelegram />Telegram</a>
          </div>
          <p>Это наши соцсети, там ещё больше интересной информации</p>
        </div>
      </aside>
    );
  });
}
