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

const destroy = slug => axios.delete(`/articles/${slug}`);

const articlesApi = { list, create, show, update, destroy };

export default articlesApi;
