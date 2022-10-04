import React, { useState, useEffect } from "react";

import { PageLoader } from "neetoui";
import { useParams } from "react-router-dom";

import articlesApi from "apis/articles";
import categoriesApi from "apis/categories";

import ArticleForm from "./Form";

import Navbar from "../../Navbar";

const Create = () => {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [fetchedArticle, setFetchedArticle] = useState({});
  const { slug } = useParams(slug);

  const fetchCategories = async () => {
    try {
      const {
        data: { categories },
      } = await categoriesApi.list();
      setCategories(categories);
    } catch (error) {
      logger.error(error);
    }
  };
  const fetchArticle = async () => {
    try {
      const data = await articlesApi.show(slug);
      setFetchedArticle(data);
    } catch (error) {
      logger.error(error);
    }
  };
  const fetchData = async () => {
    setLoading(true);
    await fetchCategories();
    if (slug) {
      await fetchArticle();
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
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
        <ArticleForm
          articleData={fetchedArticle.data}
          categories={categories}
          isEdit={!!slug}
          slug={slug}
        />
      </div>
    </>
  );
};

export default Create;
