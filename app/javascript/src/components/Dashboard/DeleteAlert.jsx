import React, { useState } from "react";

import { Alert } from "neetoui";

import articlesApi from "apis/Api/articles";

import { ARTICLE_DELETE_MESSAGE, ARTICLE_DELETE_PROMPT } from "./constants";

const DeleteAlert = ({ refetch, onClose, id }) => {
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    try {
      setDeleting(true);
      await articlesApi.destroy(id);
      onClose();
      refetch();
    } catch (error) {
      logger.error(error);
      setDeleting(false);
    }
  };

  return (
    <Alert
      isOpen
      isSubmitting={deleting}
      message={ARTICLE_DELETE_MESSAGE}
      title={ARTICLE_DELETE_PROMPT}
      onClose={onClose}
      onSubmit={handleDelete}
    />
  );
};

export default DeleteAlert;
