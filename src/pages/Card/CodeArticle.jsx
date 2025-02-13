import React from "react";

const CodeArticle = ({ article }) => {
  return (
    <div>
      <h4>Артикул</h4>
      <p>{article || "—"}</p>
    </div>
  );
};

export default CodeArticle;
