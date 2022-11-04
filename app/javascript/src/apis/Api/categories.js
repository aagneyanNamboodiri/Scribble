import axios from "axios";

const list = () => axios.get("api/categories");

const create = payload =>
  axios.post("api/categories", {
    category: payload,
  });

const destroy = (id, new_category) =>
  axios.delete(`api/categories/${id}?new_category=${new_category}`);

const update = (id, payload) =>
  axios.put(`api/categories/${id}`, {
    category: payload,
  });

const reorder = (id, payload) =>
  axios.put(`api/categories/${id}/reorder/`, {
    reorder: payload,
  });

const categoriesApi = { list, create, destroy, update, reorder };

export default categoriesApi;
