import axios from "axios";

const list = payload =>
  axios.get("api/article_status_schedules", { params: payload });

const create = payload => axios.post("api/article_status_schedules", payload);

const schedulesApi = {
  list,
  create,
};

export default schedulesApi;
