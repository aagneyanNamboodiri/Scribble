import React, { useEffect, useState } from "react";

import { PageLoader } from "neetoui";
import { Route, useParams, Redirect, Switch } from "react-router";

import publicArticlesApi from "apis/Public/articles";
import publicCategoriesApi from "apis/Public/categories";

import ArticleSearchModal from "./ArticleSearchModal";
import ErrorPage from "./ErrorPage";
import Header from "./Header";
import ShowArticle from "./ShowArticle";
import Sidebar from "./Sidebar";

const Eui = () => {
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const { slug } = useParams(slug);

  const fetchArticles = async () => {
    const payload = { search_term: "" };
    try {
      const {
        data: { articles },
      } = await publicArticlesApi.list(payload);
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

  const fetchData = async () => {
    setLoading(true);
    await Promise.all([fetchArticles(), fetchCategories()]);
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

  if (articles.length === 0) {
    return (
      <div>
        <Header />
        <ErrorPage error="no articles" />;
      </div>
    );
  }

  return (
    <>
      <Header
        isSearchEnabled={articles.length > 0}
        setIsSearchModalOpen={setIsSearchModalOpen}
      />
      {isSearchModalOpen && (
        <ArticleSearchModal
          articles={articles}
          isSearchModalOpen={isSearchModalOpen}
          setIsSearchModalOpen={setIsSearchModalOpen}
        />
      )}
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
