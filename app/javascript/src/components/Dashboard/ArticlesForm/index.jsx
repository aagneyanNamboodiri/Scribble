import React, { useState, useEffect } from "react";

import { PageLoader } from "neetoui";
import { useParams } from "react-router-dom";

import articlesApi from "apis/articles";
import categoriesApi from "apis/categories";

import Form from "./Form";

const CreateAndEdit = () => {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [fetchedArticle, setFetchedArticle] = useState({});
  const { id } = useParams();

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
      const data = await articlesApi.show(id);
      setFetchedArticle(data);
    } catch (error) {
      logger.error(error);
    }
  };
  const fetchData = async () => {
    setLoading(true);
    await fetchCategories();
    if (typeof id !== "undefined") await fetchArticle();
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
    <div className="justify-center">
      <Form
        articleData={fetchedArticle.data}
        categories={categories}
        id={id}
        isEdit={!!id}
      />
    </div>
  );
};

export default CreateAndEdit;
