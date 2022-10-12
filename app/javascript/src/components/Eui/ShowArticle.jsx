import React, { useEffect, useState } from "react";

import { Typography, Tag, PageLoader } from "neetoui";
import { useParams } from "react-router";

import publicArticlesApi from "apis/Public/articles";

import { formatTime } from "../Dashboard/utils";

const ShowArticle = () => {
  const { slug } = useParams(slug);
  const [article, setArticle] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchArticle = async () => {
    try {
      setLoading(true);
      const data = await publicArticlesApi.show(slug);
      setArticle(data.data);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (slug) fetchArticle();
  }, [slug]);

  if (loading) {
    return (
      <div className="h-screen w-full">
        <PageLoader />
      </div>
    );
  }

  return (
    <div className="space-y-2 p-20">
      <Typography style="h1" weight="bold">
        {article.title}
      </Typography>
      <div className="flex space-x-2">
        <Tag label={article?.assigned_category?.name} />
        <Typography className="text-gray-600" style="body2">
          {formatTime(article.udpated_at)}
        </Typography>
      </div>
      <div className="pt-4">
        <Typography>{article.body}</Typography>
      </div>
    </div>
  );
};

export default ShowArticle;
