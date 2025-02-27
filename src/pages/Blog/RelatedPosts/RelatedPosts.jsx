import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { marked } from "marked";
import { slugify } from "transliteration";
import qs from "qs";
import styles from "./styles/RelatedPosts.module.css";

const RelatedPosts = () => {
  const { id } = useParams();
  const [relatedPosts, setRelatedPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const query = qs.stringify({
          populate: ["image", "post_tags"],
        });

        const response = await fetch(
          `https://admin.ludno.ru/api/posts?${query}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();

        if (Array.isArray(data.data)) {
          const filteredPosts = data.data
            .filter((post) => post.id !== Number(id))
            .slice(0, 4);
          setRelatedPosts(filteredPosts);
        } else {
          console.error("Expected an array but received:", data);
        }
      } catch (error) {
        console.error("Error fetching related posts:", error);
      }
    };

    fetchPosts();
  }, [id]);

  const extractFirstH1 = (text) => {
    const tokens = marked.lexer(text);
    const h1Token = tokens.find(
      (token) => token.type === "heading" && token.depth === 1
    );
    return h1Token ? h1Token.text : "Без заголовка";
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("ru-RU", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);
  };

  return (
    <div className={styles.relativePostsWrapper}>
      <h3>Другие статьи</h3>
      <div className={styles.relativePostsContainer}>
        {relatedPosts.map((post) => {
          const postTitle = extractFirstH1(post.text);
          const postSlug = slugify(postTitle, { lower: true, strict: true });
          const imageUrl =
            Array.isArray(post.image) && post.image.length > 0
              ? post.image[0]?.formats?.medium?.url ||
                post.image[0]?.url ||
                null
              : null;

          return (
            <div key={post.id} className={styles.postItem}>
              <Link to={`/blog/${post.id}/${postSlug}`}>
                {imageUrl ? (
                  <img
                    src={`https://admin.ludno.ru${imageUrl}`}
                    alt={postTitle}
                  />
                ) : (
                  <p>Изображение не найдено</p>
                )}
                <p>{formatDate(post.date)}</p>
                <h4>{postTitle}</h4>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RelatedPosts;
