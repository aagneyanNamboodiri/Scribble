import React, { useEffect, useState } from "react";

import { PageLoader } from "neetoui";
import { useHistory, useParams } from "react-router";

import publicArticlesApi from "apis/Public/articles";
import publicCategoriesApi from "apis/Public/categories";
import publicPreferencesApi from "apis/Public/preferences";

import Header from "./Header";
import ShowArticle from "./ShowArticle";
import Sidebar from "./Sidebar";

const Eui = () => {
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [siteName, setSiteName] = useState("");
  const history = useHistory();
  const { slug } = useParams(slug);
  const fetchArticles = async () => {
    try {
      const {
        data: { articles },
      } = await publicArticlesApi.list();
      setArticles(articles);
    } catch (error) {
      logger.error(error);
    }
  };

  const fetchCategories = async () => {
    try {
      const {
        data: { categories },
      } = await publicCategoriesApi.list();
      setCategories(categories);
    } catch (error) {
      logger.error(error);
    }
  };

  const fetchPreferences = async () => {
    try {
      const { data } = await publicPreferencesApi.list();
      setSiteName(data.site_name);
    } catch (error) {
      logger.error(error);
    }
  };

  const fetchData = async () => {
    setLoading(true);
    await fetchArticles();
    await fetchCategories();
    await fetchPreferences();
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (!slug && !loading) {
      history.push(
        `/public/${
          articles.filter(
            article => article.category_name === categories[0].name
          )[0].slug
        }`
      );
    }
  }, [loading]);

  if (loading) {
    return (
      <div className="h-screen w-full">
        <PageLoader />
      </div>
    );
  }

  return (
    <>
      <Header siteName={siteName} />
      <div className="flex">
        <Sidebar articles={articles} categories={categories} />
        <ShowArticle />
      </div>
    </>
  );
};
export default Eui;
