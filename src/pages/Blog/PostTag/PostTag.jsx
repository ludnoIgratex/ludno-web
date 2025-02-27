import React, { useEffect, useState } from "react";
import styles from "./styles/PostTag.module.css";

const PostTag = ({ onTagSelect, selectedTags }) => {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await fetch("https://admin.ludno.ru/api/post-tags");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();

        if (Array.isArray(data.data)) {
          setTags(data.data);
        } else {
          console.error("Expected an array but received:", data);
        }
      } catch (error) {
        console.error("Error fetching tags:", error);
      }
    };

    fetchTags();
  }, []);

  return (
    <div className={styles.tagsWrapper}>
      {Array.isArray(tags) && tags.length > 0
        ? tags.map((tag) => (
            <button
              key={tag.id}
              onClick={() => onTagSelect(tag.name)}
              className={selectedTags.includes(tag.name) ? styles.active : ""}
            >
              {tag.name}
            </button>
          ))
        : null}
    </div>
  );
};

export default PostTag;
