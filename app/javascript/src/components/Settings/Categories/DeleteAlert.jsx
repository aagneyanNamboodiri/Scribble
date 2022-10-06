import React, { useState } from "react";

import { Alert } from "neetoui";

import categoriesApi from "apis/categories";

const DeleteAlert = ({ refetch, onClose, category }) => {
  const [deleting, setDeleting] = useState(false);

  const deletePrompt = "Delete this Category?";
  const deleteMessage =
    "Are you sure you want to continue? This cannot be undone.";

  const handleDelete = async () => {
    try {
      setDeleting(true);
      await categoriesApi.destroy(category.id);
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
