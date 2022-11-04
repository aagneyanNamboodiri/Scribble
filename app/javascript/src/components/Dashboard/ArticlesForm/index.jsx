import React, { useState, useEffect } from "react";

import { PageLoader } from "neetoui";
import { useParams } from "react-router-dom";

import articlesApi from "apis/Api/articles";
import categoriesApi from "apis/Api/categories";
import { useArticleStatusDispatchContext } from "contexts/articleStatus";

import Form from "./Form";
import VersionList from "./VersionList";

const CreateAndEdit = () => {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [fetchedArticle, setFetchedArticle] = useState({});
  const { id } = useParams();

  const articleStatusDispatch = useArticleStatusDispatchContext();

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
      const { data } = await articlesApi.show(id);
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

  useEffect(() => {
    if (!loading) articleStatusDispatch({ status: fetchedArticle.status });

    return () => {
      articleStatusDispatch({ status: "" });
    };
  }, [loading]);

  if (loading) {
    return (
      <div className="h-screen w-full">
        <PageLoader />
      </div>
    );
  }

  return (
    <div className="flex w-full">
      <Form
        articleData={fetchedArticle}
        categories={categories}
        className="w-2/4"
        id={id}
        isEdit={!!id}
      />
      {id && (
        <VersionList
          article={fetchedArticle}
          className="w-1/3"
          fetchData={fetchData}
        />
      )}
    </div>
  );
};

export default CreateAndEdit;
