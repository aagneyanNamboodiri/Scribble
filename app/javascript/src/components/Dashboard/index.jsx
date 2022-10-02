import React, { useState, useEffect } from "react";

import { Button, Typography, Table, PageLoader } from "neetoui";
import { Header, Container } from "neetoui/layouts";

import articlesApi from "apis/articles";
import categoriesApi from "apis/categories";

import ColumnDropdown from "./ColumnDropdown";
import { COLUMN_DATA, initialColumnsList } from "./constants";
import Navbar from "./Navbar";
import SideMenu from "./SideMenu";

const Dashboard = () => {
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [articleCategory, setArticleCategory] = useState("");
  const [articleStatus, setArticleStatus] = useState("all");
  const [columnList, setColumnList] = useState(initialColumnsList);

  const filterRowData = () => {
    if (articleCategory === "" && articleStatus === "all") return articles;

    if (articleCategory !== "" && articleStatus === "all") {
      return articles.filter(
        article => article.category_name === articleCategory
      );
    }

    if (articleCategory === "" && articleStatus !== "all") {
      return articles.filter(article => article.status === articleStatus);
    }

    return articles
      .filter(article => article.category_name === articleCategory)
      .filter(article => article.status === articleStatus);
  };

  const filterColumnData = () =>
    COLUMN_DATA.filter(column => columnList[column.key] === true);
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
        <SideMenu
          articleCategory={articleCategory}
          articleStatus={articleStatus}
          articles={articles}
          categories={categories}
          setArticleCategory={setArticleCategory}
          setArticleStatus={setArticleStatus}
        />
        <Container>
          <Header
            actionBlock={
              <>
                <ColumnDropdown
                  columnList={columnList}
                  setColumnList={setColumnList}
                />
                <Button label="Create new article" to="/create" />
              </>
            }
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
          <p>Category ID : {articleCategory}</p>
          <p>Status : {articleStatus}</p>
          <p>Columns: {JSON.stringify(columnList)}</p>
          <Table columnData={filterColumnData()} rowData={filterRowData()} />
        </Container>
      </div>
    </>
  );
};

export default Dashboard;
