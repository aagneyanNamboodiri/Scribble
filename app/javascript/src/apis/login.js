import axios from "axios";

const create = payload => axios.post("api/login", payload);

const loginApi = { create };

export default loginApi;
