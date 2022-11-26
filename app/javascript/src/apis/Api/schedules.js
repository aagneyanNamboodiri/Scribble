import axios from "axios";

const list = payload =>
  axios.get("api/article_status_schedules", { params: payload });

const create = payload => axios.post("api/article_status_schedules", payload);

const destroy = id => axios.delete(`api/article_status_schedules/${id}`);

const schedulesApi = {
  list,
  create,
  destroy,
};

export default schedulesApi;
