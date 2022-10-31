import React, { useEffect, useState } from "react";

import { Modal, Typography, Button, Input, Textarea } from "neetoui";

import articlesApi from "apis/articles";
import versionsApi from "apis/versions";

const VersionModal = ({
  showVersionModal,
  setShowVersionModal,
  versionId,
  articleId,
  setFetchedArticle,
}) => {
  const [loading, setLoading] = useState(true);
  const [article, setArticle] = useState({});

  const fetchArticleWithVersion = async () => {
    try {
      setLoading(true);
      const { data } = await versionsApi.show({ articleId, versionId });
      setArticle(data);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleRestore = async () => {
    try {
      setLoading(true);
      const payload = {
        ...article,
        assigned_category_id: article.assigned_category.id,
        is_restoration: true,
      };
      await articlesApi.update({ id: articleId, payload });
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
      setFetchedArticle(article);
      window.location.reload();
      setShowVersionModal(false);
    }
  };

  useEffect(() => {
    fetchArticleWithVersion();
  }, []);

  if (loading) {
    return <div>loading</div>;
  }

  return (
    <Modal
      isOpen={showVersionModal}
      size="large"
      onClose={() => setShowVersionModal(false)}
    >
      <Modal.Header description="Short description">
        <Typography id="dialog1Title" style="h2">
          Version History
        </Typography>
        <Typography className="text-gray-500" id="dialogue2body" style="body2">
          Version history of article-title in Scribble
        </Typography>
      </Modal.Header>
      <Modal.Body className="h-full space-y-2">
        <div className="flex space-x-2">
          <Input
            disabled
            label="Article Title"
            name="title"
            type="text"
            value={article.title}
          />
          <Input
            disabled
            label="Category"
            type="text"
            value={article.assigned_category.name}
          />
        </div>
        <Textarea
          disabled
          label="Article Body"
          name="body"
          rows={14}
          size="large"
          value={article.body}
        />
      </Modal.Body>
      <Modal.Footer className="space-x-2">
        <Button label="Restore version" onClick={handleRestore} />
        <Button
          label="Cancel"
          style="text"
          onClick={() => setShowVersionModal(false)}
        />
      </Modal.Footer>
    </Modal>
  );
};

export default VersionModal;
