import React, { useState, useEffect } from "react";

const ArticleListing = ({ selectedCategory }) => {
  const [placeholder, setPlaceholder] = useState("something");
  useEffect(() => {
    setPlaceholder("Articles");
  }, []);

  return (
    <div>
      {placeholder}, {JSON.stringify(selectedCategory)}
    </div>
  );
};

export default ArticleListing;
