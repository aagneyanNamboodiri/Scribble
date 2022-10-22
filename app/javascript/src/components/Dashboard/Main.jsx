import React, { useState, useEffect } from "react";

import { Button, Typography, Table, PageLoader } from "neetoui";
import { Header, Container } from "neetoui/layouts";

import articlesApi from "apis/articles";
import categoriesApi from "apis/categories";

import ColumnDropdown from "./ColumnDropdown";
import { initialColumnsList } from "./constants";
import DeleteAlert from "./DeleteAlert";
import NoArticles from "./NoArticles";
import SideMenu from "./SideMenu";
import { filterColumnData } from "./utils";

const Main = () => {
  const [articles, setArticles] = useState([]);
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
      setArticles(articles);
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
  const fetchFilteredArticles = async payload => {
    try {
      setLoading(true);
      const {
        data: { articles },
      } = await articlesApi.list(payload);
      setFilteredArticles(articles);
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

  useEffect(() => {
    fetchFilteredArticles({
      selectedCategoryFilter,
      searchQuery: searchQuery.toLowerCase(),
      articleStatus,
    });
  }, [selectedCategoryFilter, searchQuery, articleStatus]);

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
        articles={articles}
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
        {articles.length === 0 && <NoArticles className="w-full" />}
        {articles.length > 0 && (
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
