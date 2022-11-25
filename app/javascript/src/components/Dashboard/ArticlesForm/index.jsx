import React, { useState, useEffect } from "react";

import { PageLoader, Button } from "neetoui";
import { useParams } from "react-router-dom";

import articlesApi from "apis/Api/articles";
import categoriesApi from "apis/Api/categories";
import schedulesApi from "apis/Api/schedules";
import { useArticleStatusDispatchContext } from "contexts/articleStatus";

import Form from "./Form";
import Schedules from "./Schedules";
import Versions from "./Versions";

const CreateAndEdit = () => {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [fetchedArticle, setFetchedArticle] = useState({});
  const [showVersionList, setShowVersionList] = useState(true);

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
      const {
        data: { article },
      } = await articlesApi.show(id);
      setFetchedArticle(article);
    } catch (error) {
      logger.error(error);
    }
  };
  const fetchSchedules = async () => {
    const payload = {
      article_id: id,
    };
    try {
      const {
        data: { schedules },
      } = await schedulesApi.list(payload);
      setSchedules(schedules);
    } catch (error) {
      logger.error(error);
    }
  };
  const fetchData = async () => {
    setLoading(true);
    await Promise.all([fetchCategories(), fetchSchedules()]);
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
    <div className={id ? "flex w-full" : "justify-center"}>
      <Form
        articleData={fetchedArticle}
        categories={categories}
        className="w-2/4"
        fetchSchedules={fetchSchedules}
        id={id}
        isEdit={!!id}
        schedules={schedules}
      />
      {id && (
        <div className="border-l h-screen w-1/4 flex-col">
          <div className="flex justify-between p-4">
            <Button
              label="Version list"
              onClick={() => setShowVersionList(true)}
            />
            <Button
              label="Schedules"
              onClick={() => setShowVersionList(false)}
            />
          </div>
          {showVersionList ? (
            <Versions
              article={fetchedArticle}
              categories={categories}
              className="h-24"
              fetchData={fetchData}
            />
          ) : (
            <Schedules schedules={schedules} />
          )}
        </div>
      )}
    </div>
  );
};

export default CreateAndEdit;
