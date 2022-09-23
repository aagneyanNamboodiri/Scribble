import React, { useState, useEffect } from "react";

import articlesApi from "../apis/articles";

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

  return <p>Articles : {articles}</p>;
};

export default Dashboard;
