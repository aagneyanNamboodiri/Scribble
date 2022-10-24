import axios from "axios";

const list = () => axios.get("/organizations");

const update = organization =>
  axios.put("/organizations/1", {
    ...organization,
  });

const organizationsApi = { list, update };

export default organizationsApi;
