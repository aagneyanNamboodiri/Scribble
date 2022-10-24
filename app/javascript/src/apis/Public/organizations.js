import axios from "axios";

const list = () => axios.get("/public/organizations");

const publicOrganizationsApi = { list };

export default publicOrganizationsApi;
