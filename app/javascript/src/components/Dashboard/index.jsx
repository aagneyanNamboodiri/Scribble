import React, { useState, useEffect } from "react";

import { Button, Typography, Table } from "neetoui";
import { Header, Container } from "neetoui/layouts";

import articlesApi from "apis/articles";

import { COLUMN_DATA } from "./constants";
import Navbar from "./Navbar";
import SideMenu from "./SideMenu";

const Dashboard = () => {
  const [articles, setArticles] = useState([]);

  const fetchTasks = async () => {
    try {
      const {
        data: { articles },
      } = await articlesApi.list();
      setArticles(articles);
    } catch (error) {
      logger.error(error);
    }
  };
  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <>
      <Navbar />
      <div className="flex">
        <SideMenu />
        <Container>
          <Header
            actionBlock={<Button label="Primary Action" />}
            searchProps={{
              onChange: function noRefCheck() {},
              value: "",
            }}
          />
          <Typography className="font-semibold" style="h3">
            {articles.length} Articles
          </Typography>
          <p>Articles : {JSON.stringify(articles)}</p>;
          <Table columnData={COLUMN_DATA} rowData={articles} />
        </Container>
      </div>
    </>
  );
};

export default Dashboard;
