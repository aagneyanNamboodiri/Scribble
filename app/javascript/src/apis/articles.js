import axios from "axios";

const list = () => axios.get("/articles");

const create = payload =>
  axios.post("/articles", {
    article: payload,
  });

const show = id => axios.get(`/articles/${id}`);

const update = ({ id, payload }) =>
  axios.put(`/articles/${id}`, {
    article: payload,
  });

const destroy = id => axios.delete(`/articles/${id}`);

const articlesApi = { list, create, show, update, destroy };

export default articlesApi;
