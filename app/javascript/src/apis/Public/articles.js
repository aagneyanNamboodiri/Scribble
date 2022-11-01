import axios from "axios";

const list = payload => axios.get("public/articles", { params: payload });

const show = slug => axios.get(`public/articles/${slug}`);

const publicArticlesApi = { list, show };

export default publicArticlesApi;
