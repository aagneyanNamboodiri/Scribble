import axios from "axios";

const list = () => axios.get("/articles");

const create = payload =>
  axios.post("/articles", {
    article: payload,
  });

const show = slug => axios.get(`/articles/${slug}`);

const update = ({ slug, payload }) =>
  axios.put(`/articles/${slug}`, {
    article: payload,
  });

const articlesApi = { list, create, show, update };

export default articlesApi;
