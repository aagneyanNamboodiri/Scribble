import React, { useEffect, useState } from "react";

import { Modal, Typography, Button, Input, Textarea, Select } from "neetoui";

import versionsApi from "apis/Api/article_versions";
import articlesApi from "apis/Api/articles";

import TooltipWrapper from "../../../TooltipWrapper";
import { buildCategoryList } from "../utils";

const VersionModal = ({
  showVersionModal,
  setShowVersionModal,
  versionId,
  articleId,
  fetchData,
  categories,
}) => {
  const [loading, setLoading] = useState(true);
  const [article, setArticle] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("");

  const categoryList = buildCategoryList(categories);

  const fetchArticleWithVersion = async () => {
    try {
      setLoading(true);
      const { data } = await versionsApi.show({
        article_id: articleId,
        version_id: versionId,
      });
      setArticle(data);
      setSelectedCategory(data.assigned_category?.id);
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
        status: "draft",
        assigned_category_id: selectedCategory,
        restored_from: versionId,
      };
      await articlesApi.update({ id: articleId, payload });
    } catch (error) {
      logger.error(error);
    } finally {
      fetchData();
      setLoading(false);
      //window.location.reload();
      setShowVersionModal(false);
    }
  };

  useEffect(() => {
    fetchArticleWithVersion();
  }, []);

  if (loading) {
    return <div />;
  }

  return (
    <Modal
      isOpen={showVersionModal}
      size="large"
      onClose={() => setShowVersionModal(false)}
    >
      <Modal.Header description="Article versions cannot be edited here! Please restore to edit.">
        <Typography id="dialog1Title" style="h2">
          Version History
        </Typography>
        <Typography className="text-gray-500" id="dialogue2body" style="body2">
          {`Version history of ${article.title} in Scribble`}
        </Typography>
      </Modal.Header>
      <Modal.Body className="h-full space-y-2">
        <div className="flex space-x-2">
          <Input
            disabled
            label="Article Title"
            type="text"
            value={article.title}
          />
          {article.assigned_category ? (
            <Input
              disabled
              label="Category"
              type="text"
              value={article.assigned_category.name}
            />
          ) : (
            <Select
              isSearchable
              label="Category"
              options={categoryList}
              placeholder="Select new category"
              onChange={e => setSelectedCategory(e.value)}
            />
          )}
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
      <Modal.Footer className="flex space-x-2">
        <TooltipWrapper
          content="Previous category doesnt exist. Please select new category from the list"
          disabled={!selectedCategory}
          position="bottom"
        >
          <Button
            disabled={!selectedCategory}
            label="Restore version"
            onClick={handleRestore}
          />
        </TooltipWrapper>
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
