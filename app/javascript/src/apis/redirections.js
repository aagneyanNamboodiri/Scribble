import axios from "axios";

const list = () => axios.get("/redirections");

const create = payload => {
  axios.post("/redirections", payload);
};

const update = (id, payload) => {
  const data = {
    redirection: {
      from_path: payload.values.from_path,
      to_path: payload.values.to_path,
    },
  };
  axios.put(`/redirections/${id}`, data);
};

const destroy = id => axios.delete(`/redirections/${id}`);

const redirectionsApi = { list, create, destroy, update };

export default redirectionsApi;
