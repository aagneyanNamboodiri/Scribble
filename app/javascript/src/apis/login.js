import axios from "axios";

const create = payload => axios.post("/login", payload);

const loginApi = { create };

export default loginApi;
