import React, { useEffect, useState } from "react";

import {
  Modal as NeetoUIModal,
  Typography,
  Button,
  Input,
  Textarea,
  Select,
} from "neetoui";
import { mergeRight } from "ramda";
import TooltipWrapper from "tooltipwrapper";

import versionsApi from "apis/Api/article_versions";
import articlesApi from "apis/Api/articles";

import { buildCategoryList } from "../utils";

const Modal = ({
  showVersionModal,
  setShowVersionModal,
  versionId,
  articleId,
  fetchData,
  categories,
  showScheduleDeleteMessage,
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
      const payload = mergeRight(article, {
        status: "draft",
        assigned_category_id: selectedCategory,
        restored_from: versionId,
      });
      await articlesApi.update({ id: articleId, payload });
    } catch (error) {
      logger.error(error);
    } finally {
      fetchData();
      setLoading(false);
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
    <NeetoUIModal
      isOpen={showVersionModal}
      size="large"
      onClose={() => setShowVersionModal(false)}
    >
      <NeetoUIModal.Header description="Article versions cannot be edited here! Please restore to edit.">
        <Typography id="dialog1Title" style="h2">
          Version History
        </Typography>
        <Typography className="text-gray-500" id="dialogue2body" style="body2">
          {`Version history of ${article.title} in Scribble`}
        </Typography>
      </NeetoUIModal.Header>
      <NeetoUIModal.Body className="h-full space-y-2">
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
      </NeetoUIModal.Body>
      <NeetoUIModal.Footer className="flex-col space-y-2">
        <div className="flex space-x-2">
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
        </div>
        {showScheduleDeleteMessage && (
          <Typography className="text-red-400" style="body2">
            Restoring article will delete the upcoming draft schedule!
          </Typography>
        )}
      </NeetoUIModal.Footer>
    </NeetoUIModal>
  );
};

export default Modal;
