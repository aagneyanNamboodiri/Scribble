import React, { useState, useEffect } from "react";

import { Button, Typography, Table, PageLoader } from "neetoui";
import { Header, Container } from "neetoui/layouts";

import articlesApi from "apis/articles";
import categoriesApi from "apis/categories";

import { COLUMN_DATA } from "./constants";
import Navbar from "./Navbar";
import SideMenu from "./SideMenu";

const Dashboard = () => {
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const {
        data: { articles },
      } = await articlesApi.list();
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
      } = await categoriesApi.list();
      setCategories(categories);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchArticles();
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
      <div className="flex">
        <SideMenu articles={articles} categories={categories} />
        <Container>
          <Header
            actionBlock={<Button label="Create new article" to="/create" />}
            searchProps={{
              onChange: function noRefCheck() {},
              value: "",
              placeholder: "Search artcile titles",
            }}
          />
          <Typography className="font-semibold" style="h3">
            {articles.length} Articles
          </Typography>
          <p>Articles : {JSON.stringify(articles)}</p>;
          <p>Categories : {JSON.stringify(categories)}</p>
          <Table columnData={COLUMN_DATA} rowData={articles} />
        </Container>
      </div>
    </>
  );
};

export default Dashboard;
