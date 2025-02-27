import React, { useState, useEffect } from "react";
import PostTag from "./PostTag/PostTag";
import PostCatalog from "./PostCatalog/PostCatalog";
import styles from "./styles/Blog.module.css";
import LoaderRound from "../../components/Loader/LoaderRound";

const Blog = () => {
  const [selectedTags, setSelectedTags] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleTagSelect = (tag) => {
    setSelectedTags((prevTags) =>
      prevTags.includes(tag)
        ? prevTags.filter((selectedTag) => selectedTag !== tag)
        : [...prevTags, tag]
    );
  };

  useEffect(() => {
    window.onload = () => {
      setIsLoading(false);
    };

    const fetchData = async () => {
      try {
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  }, []);

  if (isLoading) return <LoaderRound show={true} />;

  return (
    <div className={styles.blogWrapper}>
      <h1>Каталог статей</h1>
      <PostTag onTagSelect={handleTagSelect} selectedTags={selectedTags} />
      <PostCatalog selectedTags={selectedTags} />
    </div>
  );
};

export default Blog;
