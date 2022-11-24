import axios from "axios";

const list = payload =>
  axios.get("api/article_status_schedules", { params: payload });

const schedulesApi = {
  list,
};

export default schedulesApi;
