import axios from "axios";

const show = () => axios.get("api/organization");

const update = organization =>
  axios.put("api/organization", {
    ...organization,
  });

const organizationApi = { show, update };

export default organizationApi;
