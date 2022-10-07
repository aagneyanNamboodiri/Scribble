/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";

import { CloseCircle } from "neetoicons";
import { Modal, Typography, Button, Select } from "neetoui";

import categoriesApi from "apis/categories";

import { buildCategoryValues } from "./constants";

const DeleteModal = ({ refetch, onClose, category, categoryList }) => {
  const [deleting, setDeleting] = useState(false);
  const [toCategory, setToCategory] = useState(-1);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  const handleDelete = async newCategory => {
    try {
      setDeleting(true);
      await categoriesApi.destroy(category.id, newCategory);
      onClose();
      refetch();
    } catch (error) {
      logger.error(error);
      setDeleting(false);
    }
  };
  useEffect(() => {
    if (categoryList.length === 1) {
      setToCategory(-2);
      setIsSubmitDisabled(false);
    }
  }, [categoryList]);

  return (
    <Modal isOpen onClose={onClose}>
      <Modal.Header>
        <Typography id="dialog1Title" style="h2">
          Delete Category
        </Typography>
      </Modal.Header>
      <Modal.Body className="space-y-2">
        <Typography lineHeight="normal" style="body1">
          You are permanently deleting the{" "}
          <span className="font-bold">{category.name}</span> category. This
          action cannot be undone. Are you sure you want to continue?
        </Typography>
        {category.articles_count > 0 && (
          <>
            <div className="flex border-2 border-solid border-red-600 bg-red-100 p-3">
              <CloseCircle color="#e53e3e" size={18} />
              <Typography lineHeight="normal" style="body1">
                This category has{" "}
                {`${category.articles_count} ${
                  category.articles_count > 1 ? "articles" : "article"
                }`}{" "}
                under it. Before this category is deleted, these articles need
                to be moved to another category.
              </Typography>
            </div>
            {categoryList.length > 1 && (
              <Select
                isClearable
                isSearchable
                required
                label="Select a category to move these articles to*"
                name="ValueList"
                options={buildCategoryValues(categoryList, category.id)}
                onChange={e => {
                  setToCategory(e.value);
                  setIsSubmitDisabled(false);
                }}
              />
            )}
          </>
        )}
      </Modal.Body>
      <Modal.Footer className="space-x-2">
        <Button
          disabled={category.articles_count > 0 && isSubmitDisabled}
          label="Continue"
          onClick={() => handleDelete(toCategory)}
        />
        <Button label="Cancel" style="text" onClick={onClose} />
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteModal;
