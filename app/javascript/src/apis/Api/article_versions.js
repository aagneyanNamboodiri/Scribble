import axios from "axios";

const list = article_id =>
  axios.get(`api/articles/${article_id}/article_versions`);

const show = ({ article_id, version_id }) =>
  axios.get(`api/articles/${article_id}/article_versions/${version_id}`);

const article_versionsApi = { list, show };

export default article_versionsApi;
