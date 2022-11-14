import axios from "axios";

const list = currentTablePage =>
  axios.get(`api/analytics?page_number=${currentTablePage}`);

const show = id => axios.get(`api/analytics/${id}`);

const analyticsApi = { list, show };

export default analyticsApi;
