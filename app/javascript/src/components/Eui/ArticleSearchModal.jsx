import React, { useEffect, useState } from "react";

import { Search, UpArrow, DownArrow } from "neetoicons";
import { Modal, Input, Tag, Typography } from "neetoui";
import { useHistory } from "react-router";

import publicArticlesApi from "apis/Public/articles";

import { useKeyPress } from "./constants";

const ArticleSearchModal = ({ isSearchModalOpen, setIsSearchModalOpen }) => {
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [articleIndex, setArticleIndex] = useState(0);

  const history = useHistory();

  const arrowUpPressed = useKeyPress("ArrowUp");
  const arrowDownPressed = useKeyPress("ArrowDown");
  const enterKeyPressed = useKeyPress("Enter");

  const handleArrowKeyInteractions = ({ action }) => {
    switch (action) {
      case "arrowUp":
        setArticleIndex(
          articleIndex !== 0 ? articleIndex - 1 : articles.length - 1
        );
        break;

      case "arrowDown":
        setArticleIndex(
          articleIndex !== articles.length - 1 ? articleIndex + 1 : 0
        );
        break;

      default:
        throw new Error();
    }
  };

  const fetchArticles = async () => {
    const payload = { search_term: searchTerm };
    try {
      const {
        data: { articles },
      } = await publicArticlesApi.list(payload);
      setArticles(articles);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleEscapeKeyPress = ({ type, key }) => {
    if (type === "keydown" && key === "Escape") {
      setIsSearchModalOpen(false);
    }
  };

  useEffect(() => {
    arrowUpPressed && handleArrowKeyInteractions({ action: "arrowUp" });
  }, [arrowUpPressed]);

  useEffect(() => {
    arrowDownPressed && handleArrowKeyInteractions({ action: "arrowDown" });
  }, [arrowDownPressed]);

  useEffect(() => {
    if (enterKeyPressed) {
      if (articles[articleIndex]) {
        history.push(articles[articleIndex].slug);
        setIsSearchModalOpen(false);
      }
    }
  }, [enterKeyPressed]);

  useEffect(() => {
    const getData = setTimeout(() => {
      if (searchTerm.length > 0) {
        fetchArticles();
        setArticleIndex(0);
      }
    }, 400);
    if (searchTerm.length === 0) setArticles([]);
    setLoading(true);

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
        <Modal.Header />
        <Modal.Body className="space-y-2">
          <Input
            autocomplete="off"
            className="w-full"
            placeholder="Search article title"
            prefix={<Search />}
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            onKeyDown={e => handleEscapeKeyPress(e)}
          />
          {searchTerm.length > 0 &&
            articles.map((article, idx) => (
              <div
                key={article.id}
                className={`${
                  idx === articleIndex && "bg-gray-200 text-indigo-500"
                } cursor-pointer p-2`}
                onClick={() => {
                  history.push(article.slug);
                  setIsSearchModalOpen(false);
                }}
              >
                {article.title}
              </div>
            ))}
        </Modal.Body>
        <Modal.Footer className="flex-col space-y-2">
          {!loading && searchTerm.length > 0 && articles.length === 0 && (
            <Typography className="text-red-400" style="body2">
              No articles found!
            </Typography>
          )}
          <div className="flex space-x-2">
            <Typography style="body3">Keyboard Navigation: </Typography>
            {articles.length > 0 && (
              <Tag icon={() => <DownArrow />} style="secondary" type="solid" />
            )}
            {articles.length > 0 && (
              <Tag icon={() => <UpArrow />} style="secondary" type="solid" />
            )}
            {articles.length > 0 && (
              <Tag label="Enter" style="success" type="solid" />
            )}
            <Tag label="Esc" style="danger" type="solid" />
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
export default ArticleSearchModal;
