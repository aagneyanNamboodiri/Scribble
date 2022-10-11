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
      setLoading(true);
      const {
        data: { articles },
      } = await publicArticlesApi.list();
      setArticles(articles);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const {
        data: { categories },
      } = await publicCategoriesApi.list();
      setCategories(categories);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPreferences = async () => {
    try {
      setLoading(true);
      const { data } = await publicPreferencesApi.list();
      setSiteName(data.site_name);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
    fetchCategories();
    fetchPreferences();
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
        <Sidebar />
      </div>
      <p>{JSON.stringify(articles)}</p>
      <p>{JSON.stringify(categories)}</p>
    </>
  );
};
export default Eui;
