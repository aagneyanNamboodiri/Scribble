import axios from "axios";

const list = () => axios.get("api/organizations");

const update = organization =>
  axios.put("api/organizations/1", {
    ...organization,
  });

const organizationsApi = { list, update };

export default organizationsApi;
