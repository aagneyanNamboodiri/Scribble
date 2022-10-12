import React, { useEffect, useState } from "react";

import { PageLoader } from "neetoui";
import { Route, useParams, Redirect, Switch } from "react-router";

import publicArticlesApi from "apis/Public/articles";
import publicCategoriesApi from "apis/Public/categories";
import publicPreferencesApi from "apis/Public/preferences";

import ErrorPage from "./ErrorPage";
import Header from "./Header";
import ShowArticle from "./ShowArticle";
import Sidebar from "./Sidebar";

const Eui = () => {
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [siteName, setSiteName] = useState("");
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

  if (loading) {
    return (
      <div className="h-screen w-full">
        <PageLoader />
      </div>
    );
  }

  if (!slug) {
    if (articles.length === 0) {
      return (
        <div>
          <Header siteName={siteName} />
          <ErrorPage error="no articles" />;
        </div>
      );
    }
  }

  return (
    <>
      <Header siteName={siteName} />
      <div className="flex">
        <Switch>
          <Route exact path="/public/:slug">
            <Sidebar articles={articles} categories={categories} />
            <ShowArticle />
          </Route>
          <Redirect
            exact
            from="/public"
            to={`/public/${
              articles.find(
                article => article.category_name === categories[0].name
              )?.slug
            }`}
          />
        </Switch>
      </div>
    </>
  );
};
export default Eui;
