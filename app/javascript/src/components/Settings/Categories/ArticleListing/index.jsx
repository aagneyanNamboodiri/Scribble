import React, { useState, useEffect } from "react";

const ArticleListing = ({ selectedCategory }) => {
  const [bruh, setBruh] = useState("something");
  useEffect(() => {
    setBruh("Articles");
  }, []);

  return (
    <div>
      {bruh}, {JSON.stringify(selectedCategory)}
    </div>
  );
};

export default ArticleListing;
