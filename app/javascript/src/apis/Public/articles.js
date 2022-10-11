import axios from "axios";

const list = () => axios.get("public/articles");

const show = slug => axios.get(`public/articles/${slug}`);

const publicArticlesApi = { list, show };

export default publicArticlesApi;
