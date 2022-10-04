import React, { useState, useEffect } from "react";

import { Button, Typography, Table, PageLoader } from "neetoui";
import { Header, Container } from "neetoui/layouts";

import articlesApi from "apis/articles";
import categoriesApi from "apis/categories";

import ColumnDropdown from "./ColumnDropdown";
import { initialColumnsList } from "./constants";
import DeleteAlert from "./DeleteAlert";
import Navbar from "./Navbar";
import SideMenu from "./SideMenu";
import { filterRowData, filterColumnData } from "./utils";

const Dashboard = () => {
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [articleCategory, setArticleCategory] = useState("");
  const [articleStatus, setArticleStatus] = useState("all");
  const [columnList, setColumnList] = useState(initialColumnsList);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [slugToDelete, setSlugToDelete] = useState("");

  const handleDelete = slug => {
    setSlugToDelete(slug);
    setShowDeleteAlert(true);
  };
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
                <Button label="Create new article" to="/articles/create" />
              </>
            }
            searchProps={{
              onChange: function noRefCheck() {},
              value: "",
              placeholder: "Search artcile titles",
            }}
          />
          <Typography className="font-semibold" style="h3">
            {articles.length === 1
              ? `${articles.length} Article`
              : `${articles.length} Articles`}
          </Typography>
          <Table
            columnData={filterColumnData(handleDelete, columnList)}
            rowData={filterRowData(articles, articleCategory, articleStatus)}
          />
          {showDeleteAlert && (
            <DeleteAlert
              refetch={fetchArticles}
              slug={slugToDelete}
              onClose={() => setShowDeleteAlert(false)}
            />
          )}
        </Container>
      </div>
    </>
  );
};

export default Dashboard;
