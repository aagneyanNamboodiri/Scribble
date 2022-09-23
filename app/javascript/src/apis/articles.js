import axios from "axios";

const list = () => axios.get("/articles");

const articlesApi = { list };

export default articlesApi;
