import axios from "axios";

const list = payload => axios.get("api/articles", { params: payload });

const create = payload =>
  axios.post("api/articles", {
    article: payload,
  });

const show = id => axios.get(`api/articles/${id}`);

const update = ({ id, payload }) =>
  axios.put(`api/articles/${id}`, {
    article: payload,
  });

const destroy = id => axios.delete(`api/articles/${id}`);

const reorder = ({ id, position }) =>
  axios.put(`api/articles/${id}/reorder`, { position });

const articlesApi = { list, create, show, update, destroy, reorder };

export default articlesApi;
