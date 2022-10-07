import axios from "axios";

const list = () => axios.get("/categories");

const create = payload =>
  axios.post("/categories", {
    category: payload,
  });

const destroy = (id, new_category = -1) =>
  axios.delete(`/categories/${id}?new_category=${new_category}`);

const update = (id, payload) =>
  axios.put(`/categories/${id}`, {
    category: payload,
  });

const categoriesApi = { list, create, destroy, update };

export default categoriesApi;
