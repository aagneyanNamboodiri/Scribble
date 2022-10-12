import axios from "axios";

const list = () => axios.get("/redirections");

const create = payload => {
  axios.post("/redirections", payload);
};

const destroy = id => axios.delete(`/redirections/${id}`);

const redirectionsApi = { list, create, destroy };

export default redirectionsApi;
