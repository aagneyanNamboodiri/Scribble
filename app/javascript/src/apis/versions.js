import axios from "axios";

const list = article_id => axios.get(`api/articles/${article_id}/versions`);

const show = ({ articleId, versionId }) =>
  axios.get(`api/articles/${articleId}/versions/${versionId}`);

const versionsApi = { list, show };

export default versionsApi;
