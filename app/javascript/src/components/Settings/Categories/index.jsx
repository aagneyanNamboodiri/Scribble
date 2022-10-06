import React, { useState, useEffect } from "react";

import { Typography, PageLoader } from "neetoui";

import categoriesApi from "apis/categories";

import Card from "./Card";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchCategories = async () => {
    try {
      setLoading(true);
      const {
        data: { categories },
      } = await categoriesApi.list();
      setCategories(categories);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-full">
        <PageLoader />
      </div>
    );
  }

  return (
    <div className="flex w-full justify-center py-4">
      <div className="w-1/2 flex-col">
        <div className="space-y-10">
          <div className="flex-col space-y-2">
            <Typography style="h2" weight="medium">
              Manage Categories
            </Typography>
            <Typography className="text-gray-600" style="body2">
              Create and configure categories inside your scribble
            </Typography>
          </div>
          <div className="w-full flex-col space-y-1">
            {categories.map(category => (
              <Card
                category={category}
                key={category.id}
                refetch={fetchCategories}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Categories;
