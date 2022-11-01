import React, { useEffect, useState } from "react";

import { Search } from "neetoicons";
import { Modal, Input, Typography, Tag } from "neetoui";
import { Link } from "react-router-dom";

import publicArticlesApi from "apis/Public/articles";

const ArticleSearchModal = ({ isSearchModalOpen, setIsSearchModalOpen }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [articles, setArticles] = useState([]);

  const fetchArticles = async () => {
    const payload = { search_term: searchTerm };
    try {
      const {
        data: { articles },
      } = await publicArticlesApi.list(payload);
      setArticles(articles);
    } catch (error) {
      logger.error(error);
    }
  };

  useEffect(() => {
    const getData = setTimeout(() => {
      if (searchTerm.length > 0) fetchArticles();
    }, 400);

    return () => clearTimeout(getData);
  }, [searchTerm]);

  return (
    <div className="w-full">
      <Modal
        closeOnEsc
        closeButton={false}
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
      >
        <Input
          className="w-full"
          placeholder="Search for article title"
          prefix={<Search />}
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        {searchTerm.length > 0 &&
          articles.map((article, idx) => (
            <Link
              className="w-10/12 p-2"
              id={idx}
              key={article.id}
              to={`/public/${article.slug}`}
              onClick={() => setIsSearchModalOpen(false)}
            >
              <div
                className="mb-3 flex justify-between px-2 hover:text-indigo-500"
                onClick={() => setIsSearchModalOpen(false)}
              >
                <Typography className="" style="h4">
                  {article.title}
                </Typography>
                <Tag label={article.category_name} />
              </div>
            </Link>
          ))}
      </Modal>
    </div>
  );
};
export default ArticleSearchModal;
