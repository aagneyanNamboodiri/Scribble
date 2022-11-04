import React, { useState, useEffect } from "react";

import { PageLoader, Table, Typography } from "neetoui";

import articlesApi from "apis/Api/articles";

import { COLUMN_DATA } from "./utils";

import Navbar from "../Navbar";

const Analytics = () => {
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState([]);
  const [currentTablePage, setCurrentTablePage] = useState(1);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const {
        data: { articles },
      } = await articlesApi.list({ article_status: "published" });
      setArticles(articles);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
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
      <div className="grid justify-center pt-20">
        {articles.length > 0 ? (
          <div className="m-auto h-full w-4/5">
            <Table
              columnData={COLUMN_DATA}
              currentPageNumber={currentTablePage}
              defaultPageSize={10}
              handlePageChange={e => setCurrentTablePage(e)}
              rowData={articles}
            />
          </div>
        ) : (
          <div className="space-y-4">
            <Typography style="h1" weight="medium">
              :/
            </Typography>
            <Typography style="h2" weight="medium">
              No published articles found!
            </Typography>
          </div>
        )}
      </div>
    </>
  );
};

export default Analytics;
