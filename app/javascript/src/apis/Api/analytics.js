import axios from "axios";

const list = () => axios.get("api/analytics");

const show = id => axios.get(`api/analytics/${id}`);

const analyticsApi = { list, show };

export default analyticsApi;
