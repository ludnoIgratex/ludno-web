import React from "react";

const CodeSize = ({ size }) => {
  return (
    <div>
      <h4>Габариты</h4>
      <p>{size || "—"}</p>
    </div>
  );
};

export default CodeSize;