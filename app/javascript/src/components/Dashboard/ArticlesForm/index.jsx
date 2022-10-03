import React, { useState, useEffect } from "react";

import { PageLoader } from "neetoui";

import categoriesApi from "apis/categories";

import ArticleForm from "./Form";

import Navbar from "../Navbar";

const Create = () => {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

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
    <>
      <Navbar />
      <div className="justify-center">
        <ArticleForm categories={categories} />
      </div>
    </>
  );
};

export default Create;
