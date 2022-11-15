import React, { useState, useEffect } from "react";

import { PageLoader, Typography, Select } from "neetoui";

import categoriesApi from "apis/Api/categories";

import Card from "./Card";

import { buildCategoryList } from "../utils";

const ArticleListing = ({ selectedCategory, categories }) => {
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

  const handleHideInfo = () => {};

  if (loading) {
    return (
      <div className="h-screen w-full">
        <PageLoader />
      </div>
    );
  }

  return (
    <div className="p-2">
      <div className="space-y-2">
        <div className="flex justify-between px-2 pt-1">
          <Typography style="h2" weight="medium">
            Manage Articles
          </Typography>
          <div>
            <Select
              isSearchable
              options={buildCategoryList(categories)}
              placeholder="Move to"
            />
          </div>
        </div>
        <Typography className="rounded bg-indigo-100 p-2" style="body3">
          You can reorder articles or categories by dragging and dropping here.
          You can also multiselect articles and move them to another category.{" "}
          <span className="cursor-pointer underline" onClick={handleHideInfo}>
            Dont show this info again
          </span>
        </Typography>
      </div>
      {articles.map(item => (
        <div key={item.id}>
          <Card article={item} />
        </div>
      ))}
    </div>
  );
};

export default ArticleListing;
