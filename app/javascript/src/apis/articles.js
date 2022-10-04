import axios from "axios";

const list = () => axios.get("/articles");

const create = payload =>
  axios.post("/articles", {
    article: payload,
  });

const show = slug => axios.get(`/articles/${slug}`);

const articlesApi = { list, create, show };

export default articlesApi;
