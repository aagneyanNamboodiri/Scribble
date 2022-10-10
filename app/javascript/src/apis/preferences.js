import axios from "axios";

const list = () => axios.get("/preferences");

const update = preference => {
  axios.put("/preferences/1", {
    ...preference,
  });
};

const preferencesApi = { list, update };

export default preferencesApi;
