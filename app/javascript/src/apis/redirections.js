import axios from "axios";

const list = () => axios.get("/redirections");

const create = payload => {
  axios.post("/redirections", payload);
};

const redirectionsApi = { list, create };

export default redirectionsApi;
