import React, { useState, useEffect } from "react";

import { PageLoader } from "neetoui";

import categoriesApi from "apis/Api/categories";

import Card from "./Card";

const ArticleListing = ({ selectedCategory }) => {
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState([]);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const {
        data: { articles },
      } = await categoriesApi.show_articles(selectedCategory.id);
      setArticles(articles);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [selectedCategory]);

  if (loading) {
    return (
      <div className="h-screen w-full">
        <PageLoader />
      </div>
    );
  }

  return (
    <div>
      {articles.map(item => (
        <div className="p-2" key={item.id}>
          <Card article={item} />
        </div>
      ))}
    </div>
  );
};

export default ArticleListing;
