import React, { useState, useEffect } from "react";

import { PageLoader } from "neetoui";

import categoriesApi from "apis/Api/categories";

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

  return <div>{JSON.stringify(articles)}</div>;
};

export default ArticleListing;
