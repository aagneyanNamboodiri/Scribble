import axios from "axios";

const list = () => axios.get("/preferences");

const update = payload =>
  axios.put("/preferences/1", {
    preference: payload,
  });

const preferencesApi = { list, update };

export default preferencesApi;
