import axios from "axios";

const list = () => axios.get("api/analytics");

const analyticsApi = { list };

export default analyticsApi;
