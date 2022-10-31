import axios from "axios";

const list = id => axios.get(`api/articles/${id}/versions`);

const versionsApi = { list };

export default versionsApi;
