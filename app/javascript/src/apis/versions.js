import axios from "axios";

const list = article_id => axios.get(`api/articles/${article_id}/versions`);

const show = ({ article_id, version_id }) =>
  axios.get(`api/articles/${article_id}/versions/${version_id}`);

const versionsApi = { list, show };

export default versionsApi;
