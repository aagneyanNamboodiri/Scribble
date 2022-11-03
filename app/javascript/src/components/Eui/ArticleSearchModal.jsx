import React, { useEffect, useState } from "react";

import { Modal, Select } from "neetoui";
import { useHistory } from "react-router-dom";

import publicArticlesApi from "apis/Public/articles";

const ArticleSearchModal = ({ isSearchModalOpen, setIsSearchModalOpen }) => {
  const [articles, setArticles] = useState([]);

  const history = useHistory();

  const fetchArticles = async () => {
    const payload = { search_term: "" };
    try {
      const {
        data: { articles },
      } = await publicArticlesApi.list(payload);
      setArticles(articles);
    } catch (error) {
      logger.error(error);
    }
  };

  const handleEscapeKeyPress = e => {
    if ((e.type = "keydown" && e.key === "Escape")) {
      setIsSearchModalOpen(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <div className="w-full">
      <Modal
        closeOnEsc
        closeButton={false}
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
      >
        <Select
          isSearchable
          className="w-full"
          placeholder="Select placeholder"
          size="small"
          options={articles.map(article => ({
            label: article.title,
            value: article.slug,
          }))}
          onKeyDown={e => handleEscapeKeyPress(e)}
          onChange={e => {
            history.push(`/public/${e.value}`);
            setIsSearchModalOpen(false);
          }}
        />
      </Modal>
    </div>
  );
};
export default ArticleSearchModal;
