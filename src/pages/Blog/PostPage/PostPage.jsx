import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { marked } from "marked";
import qs from "qs";
import { slugify } from "transliteration";
import styles from "./styles/PostPage.module.css";
import LoaderRound from "../../../components/Loader/LoaderRound";
import RelatedPosts from "../RelatedPosts/RelatedPosts";
import { FaPinterest } from "react-icons/fa";
import { FaTelegram } from "react-icons/fa";
import BreadCrumbs from "../BreadCrumbs/BreadCrumbs";

const PostPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    if (!id) return;
    const fetchPost = async () => {
      try {
        const query = qs.stringify(
          {
            filters: { id: { $eq: id } },
            populate: ["post_tags", "image"],
          },
          { encode: false }
        );
        const response = await fetch(
          `https://admin.ludno.ru/api/posts?${query}`
        );
        if (!response.ok)
          throw new Error(`Network response was not ok: ${response.status}`);
        const data = await response.json();
        setPost(data.data[0]);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPost();
  }, [id]);

  if (!post) return <LoaderRound show={true} />;

  const { text, post_tags } = post;
  const postText = text || "";

  // Кастомный рендерер для блок-квот
  const renderer = new marked.Renderer();
  renderer.blockquote = function (token) {
    const check = (token.text || "").trim().toLowerCase();
    if (check === "quote") return "{{quote}}";
    const inner = this.parser.parse(token.tokens, this.options);
    return `<blockquote>${inner}</blockquote>`;
  };

  // Парсинг markdown в токены
  const tokens = marked.lexer(postText);

  // Ищем h1, чтобы вынести его отдельно
  const h1Index = tokens.findIndex(
    (t) => t.type === "heading" && t.depth === 1
  );
  let h1Token = null;
  if (h1Index !== -1) {
    h1Token = tokens[h1Index];
    tokens.splice(h1Index, 1);
  }

  // Парсим оставшиеся токены в HTML, получаем готовый HTML + {{quote}} где надо
  const restHtml = marked.parser(tokens, { renderer });

  // Извлекаем заголовок из h1 (если был)
  const extractedH1Text = h1Token ? h1Token.text : "";
  const postSlug = slugify(extractedH1Text, { lower: true, strict: true });

  // Форматирование даты
  const formatDate = (dateString) => {
    const months = [
      "января",
      "февраля",
      "марта",
      "апреля",
      "мая",
      "июня",
      "июля",
      "августа",
      "сентября",
      "октября",
      "ноября",
      "декабря",
    ];
    const date = new Date(dateString);
    return {
      day: date.getDate(),
      month: months[date.getMonth()],
      year: date.getFullYear(),
    };
  };

  const { day, month, year } = formatDate(post.date);

  // --- Разбиваем HTML на чередование "текст/блок" и "<img...>" ---
  // Любые подряд идущие <img> будут сгруппированы в один скролл.
  const tokensForImages = restHtml.split(/(\<img.*?\>)/g);

  let finalBlocks = [];
  let tempImages = [];

  tokensForImages.forEach((token) => {
    const trimmed = token.trim();
    if (!trimmed) return;
    if (trimmed.startsWith("<img")) {
      tempImages.push(trimmed);
    } else {
      if (tempImages.length > 0) {
        finalBlocks.push({ type: "images", content: [...tempImages] });
        tempImages = [];
      }
      finalBlocks.push({ type: "text", content: trimmed });
    }
  });

  // Если в конце остались картинки подряд
  if (tempImages.length > 0) {
    finalBlocks.push({ type: "images", content: [...tempImages] });
    tempImages = [];
  }

  // --- Теперь в finalBlocks у нас текстовые блоки и блоги-картинок.
  // Разбиваем текстовые блоки по {{quote}} чтобы вставить блок с соцсетями ---
  let finalStructuredBlocks = [];

  finalBlocks.forEach((block) => {
    if (block.type === "text") {
      const parts = block.content.split("{{quote}}");
      parts.forEach((part, i) => {
        if (part) {
          finalStructuredBlocks.push({ type: "text", content: part });
        }
        if (i < parts.length - 1) {
          finalStructuredBlocks.push({ type: "quote" });
        }
      });
    } else {
      finalStructuredBlocks.push(block);
    }
  });

  // Финальный рендер
  const finalContent = finalStructuredBlocks.map((block, index) => {
    if (block.type === "text") {
      return (
        <div key={index} dangerouslySetInnerHTML={{ __html: block.content }} />
      );
    }
    if (block.type === "images") {
      // Если в блоке больше 1 картинки, делаем горизонтальный скролл
      if (block.content.length > 1) {
        return (
          <div key={index} className={styles.imageScrollContainer}>
            {block.content.map((imgTag, idx) => (
              <div
                key={idx}
                className={styles.scrollImage}
                dangerouslySetInnerHTML={{ __html: imgTag }}
              />
            ))}
          </div>
        );
      } else {
        // Одиночная картинка
        return (
          <div
            key={index}
            dangerouslySetInnerHTML={{ __html: block.content[0] }}
          />
        );
      }
    }
    if (block.type === "quote") {
      return (
        <div className={styles.quoteContainer} key={index}>
          <div className={styles.quoteWrapper}>
            <div className={styles.quoteLinksContainer}>
              <a
                href="https://www.pinterest.com/ludnoru"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaPinterest />
                Pinterest
              </a>
              <a
                href="https://t.me/ludnoo"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTelegram />
                Telegram
              </a>
            </div>
            <p>Это наши соцсети, там еще больше интересной информации</p>
          </div>
        </div>
      );
    }
    return null;
  });

  return (
    <div className={styles.postWrapper}>
      <BreadCrumbs articleTitle={extractedH1Text} />

      <section className={styles.tagsContainer}>
        <div className={styles.tagsWrapper}>
          {Array.isArray(post_tags) &&
            post_tags.map((tag) => (
              <span key={tag.id} className={styles.tag}>
                {tag.name}
              </span>
            ))}
        </div>
      </section>

      <section className={styles.postTitleWrapper}>
        <div className={styles.dateWrapper}>
          <span className={styles.day}>{day}</span>
          <span className={styles.month}>{month}</span>
          <span className={styles.year}>{year}</span>
        </div>
        {h1Token && <h1>{h1Token.text}</h1>}
      </section>

      <section className={styles.contentWrapper}>
        <p className={styles.description}>{post.description}</p>
        <div className={styles.markdownContent}>{finalContent}</div>
      </section>

      <RelatedPosts />
    </div>
  );
};

export default PostPage;
