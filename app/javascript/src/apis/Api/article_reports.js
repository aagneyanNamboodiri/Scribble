import axios from "axios";

const create = () => axios.post(`/api/articles/article_reports`);

const download = () =>
  axios.get(`/api/articles/article_reports/download`, {
    responseType: "blob",
  });

const article_reportsApi = { create, download };

export default article_reportsApi;
