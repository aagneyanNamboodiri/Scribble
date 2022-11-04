import React, { useState, useEffect } from "react";

import { Button, Typography, Table, PageLoader } from "neetoui";
import { Header, Container } from "neetoui/layouts";

import articlesApi from "apis/Api/articles";
import categoriesApi from "apis/Api/categories";

import ColumnDropdown from "./ColumnDropdown";
import { initialColumnsList } from "./constants";
import DeleteAlert from "./DeleteAlert";
import NoArticles from "./NoArticles";
import SideMenu from "./SideMenu";
import { filterColumnData } from "./utils";

const Main = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState([]);
  const [articleStatus, setArticleStatus] = useState("all");
  const [columnList, setColumnList] = useState(initialColumnsList);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [idToDelete, setIdToDelete] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentTablePage, setCurrentTablePage] = useState(1);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [articleStatusCounts, setArticleStatusCounts] = useState({});

  const handleDelete = id => {
    setIdToDelete(id);
    setShowDeleteAlert(true);
  };
  const fetchArticles = async () => {
    try {
      setLoading(true);
      const {
        data: { articles },
      } = await articlesApi.list();
      setArticleStatusCounts({
        all: articles.length,
        published: articles.filter(article => article.status === "published")
          .length,
        draft: articles.filter(article => article.status === "draft").length,
      });
      setFilteredArticles(articles);
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
  const fetchFilteredArticles = async () => {
    const payload = {
      selected_category_fiter: selectedCategoryFilter,
      search_query: searchQuery.toLowerCase(),
      article_status: articleStatus,
    };
    try {
      const {
        data: { articles },
      } = await articlesApi.list(payload);
      setFilteredArticles(articles);
    } catch (error) {
      logger.error(error);
    }
  };
  useEffect(() => {
    fetchArticles();
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchFilteredArticles();
  }, [selectedCategoryFilter, articleStatus]);

  useEffect(() => {
    const getData = setTimeout(() => fetchFilteredArticles(), 400);

    return () => clearTimeout(getData);
  }, [searchQuery]);

  if (loading) {
    return (
      <div className="h-screen w-full">
        <PageLoader />
      </div>
    );
  }

  return (
    <div className="flex">
      <SideMenu
        articleStatus={articleStatus}
        articleStatusCounts={articleStatusCounts}
        categories={categories}
        refetch={fetchCategories}
        selectedCategoryFilter={selectedCategoryFilter}
        setArticleStatus={setArticleStatus}
        setSelectedCategoryFilter={setSelectedCategoryFilter}
      />
      <Container>
        <Header
          actionBlock={
            <>
              <ColumnDropdown
                columnList={columnList}
                setColumnList={setColumnList}
              />
              <Button label="Add new article" to="/articles/create" />
            </>
          }
          searchProps={{
            onChange: e => {
              setSearchQuery(e.target.value);
            },
            value: searchQuery,
            placeholder: "Search artcile titles",
          }}
        />
        {articleStatusCounts.all === 0 && <NoArticles className="w-full" />}
        {articleStatusCounts.all > 0 && (
          <>
            <Typography className="font-semibold" style="h3">
              {filteredArticles.length === 1
                ? `${filteredArticles.length} Article`
                : `${filteredArticles.length} Articles`}
            </Typography>
            <Table
              columnData={filterColumnData(handleDelete, columnList)}
              currentPageNumber={currentTablePage}
              defaultPageSize={10}
              handlePageChange={e => setCurrentTablePage(e)}
              rowData={filteredArticles}
            />
          </>
        )}
        {showDeleteAlert && (
          <DeleteAlert
            id={idToDelete}
            refetch={fetchArticles}
            onClose={() => setShowDeleteAlert(false)}
          />
        )}
      </Container>
    </div>
  );
};

export default Main;
