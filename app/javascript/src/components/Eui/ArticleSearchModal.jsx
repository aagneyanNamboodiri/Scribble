import React, { useEffect, useState } from "react";

import { Modal, Input } from "neetoui";

import publicArticlesApi from "apis/Public/articles";

const ArticleSearchModal = ({ isSearchModalOpen, setIsSearchModalOpen }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [articles, setArticles] = useState([]);

  const fetchArticles = async () => {
    try {
      const {
        data: { articles },
      } = await publicArticlesApi.list();
      setArticles(articles);
    } catch (error) {
      logger.error(error);
    }
  };

  useEffect(() => {
    const getData = setTimeout(() => fetchArticles("first"), 400);

    return () => clearTimeout(getData);
  }, [searchTerm]);

  return (
    <div className="w-full">
      <Modal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
      >
        <Modal.Header>
          <Input
            className="w-full"
            placeholder="Search for article title"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          {searchTerm.length > 0 ?? <p>{JSON.stringify(articles)}</p>}
        </Modal.Header>
      </Modal>
    </div>
  );
};
export default ArticleSearchModal;
