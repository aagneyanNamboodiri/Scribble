import React, { useEffect, useState } from "react";

import { PageLoader } from "neetoui";

import publicArticlesApi from "apis/Public/articles";
import publicCategoriesApi from "apis/Public/categories";
import publicPreferencesApi from "apis/Public/preferences";

import Header from "./Header";
import Sidebar from "./Sidebar";

const Eui = () => {
  const [loading, setLoading] = useState(false);
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [siteName, setSiteName] = useState("");

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
      </div>
    </>
  );
};
export default Eui;
