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
  const [articleIdToDelete, setArticleIdToDelete] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentTablePage, setCurrentTablePage] = useState(1);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [articleStatusCounts, setArticleStatusCounts] = useState({});
  const [articlesCount, setArticlesCount] = useState(0);

  const handleDelete = id => {
    setArticleIdToDelete(id);
    setShowDeleteAlert(true);
  };

  const fetchCounts = async () => {
    try {
      const {
        data: { all, draft, published },
      } = await articlesApi.article_counts();
      setArticleStatusCounts({ all, draft, published });
    } catch (error) {
      logger.error(error);
    }
  };
  const fetchCategories = async () => {
    try {
      const {
        data: { categories },
      } = await categoriesApi.list();
      setCategories(categories);
    } catch (error) {
      logger.error(error);
    }
  };
  const fetchFilteredArticles = async () => {
    const payload = {
      selected_category_fiter: selectedCategoryFilter,
      search_query: searchQuery.toLowerCase(),
      article_status: articleStatus,
      page: currentTablePage,
    };
    try {
      const {
        data: { articles, count },
      } = await articlesApi.list(payload);
      setFilteredArticles(articles);
      setArticlesCount(count);
    } catch (error) {
      logger.error(error);
    }
  };

  const fetchData = async () => {
    setLoading(true);
    await Promise.all([
      fetchFilteredArticles(),
      fetchCategories(),
      fetchCounts(),
    ]);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchFilteredArticles();
  }, [selectedCategoryFilter, articleStatus, currentTablePage]);

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
              {articlesCount === 1
                ? `${articlesCount} Article`
                : `${articlesCount} Articles`}
            </Typography>
            <Table
              columnData={filterColumnData(handleDelete, columnList)}
              currentPageNumber={currentTablePage}
              defaultPageSize={10}
              handlePageChange={e => setCurrentTablePage(e)}
              rowData={filteredArticles}
              totalCount={articlesCount}
            />
          </>
        )}
        {showDeleteAlert && (
          <DeleteAlert
            id={articleIdToDelete}
            refetch={fetchFilteredArticles}
            onClose={() => setShowDeleteAlert(false)}
          />
        )}
      </Container>
    </div>
  );
};

export default Main;
