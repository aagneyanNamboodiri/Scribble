import axios from "axios";

const list = () => axios.get("public/categories");

const publicCategoriesApi = { list };

export default publicCategoriesApi;
