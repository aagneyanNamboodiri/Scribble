import React, { useState } from "react";

import { Alert } from "neetoui";

import articlesApi from "apis/articles";

const DeleteAlert = ({ refetch, onClose, slug }) => {
  const [deleting, setDeleting] = useState(false);

  const deletePrompt = "Delete this Article?";
  const deleteMessage =
    "Are you sure you want to continue? This cannot be undone.";

  const handleDelete = async () => {
    try {
      setDeleting(true);
      await articlesApi.destroy(slug);
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
      message={deleteMessage}
      title={deletePrompt}
      onClose={onClose}
      onSubmit={handleDelete}
    />
  );
};

export default DeleteAlert;
