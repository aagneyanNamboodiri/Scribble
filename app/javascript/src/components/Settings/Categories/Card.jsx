import React, { useState } from "react";

import { Reorder, Delete, Edit } from "neetoicons";
import { Button, Typography } from "neetoui";

import DeleteModal from "./DeleteModal";
import Form from "./Form";

import TooltipWrapper from "../../TooltipWrapper";

const Card = ({ category, refetch, categoryList, provided }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  const handleDelete = () => {
    setCategoryToDelete(category);
    setShowDeleteModal(true);
  };

  return isEditing ? (
    <div className="border-t flex space-x-2 pt-2">
      <Reorder size="20" />
      <Form
        category={category}
        refetch={refetch}
        setIsCreatingOrEditing={setIsEditing}
      />
    </div>
  ) : (
    <div
      className="border-t flex w-full justify-between pt-3"
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      <div className="flex space-x-2">
        <Reorder size="20" />
        <Typography style="body2">{category.name}</Typography>
      </div>
      <div className="flex space-x-1">
        <TooltipWrapper
          content="General category cannot be deleted"
          disabled={categoryList.length === 1 && category.name === "General"}
          position="bottom"
        >
          <Button
            disabled={categoryList.length === 1 && category.name === "General"}
            icon={() => <Delete size="18" />}
            size="smal"
            style="text"
            onClick={() => handleDelete(category)}
          />
        </TooltipWrapper>
        <Button
          icon={() => <Edit size="18" />}
          size="small"
          style="text"
          onClick={() => setIsEditing(true)}
        />
      </div>
      {showDeleteModal && (
        <DeleteModal
          category={categoryToDelete}
          categoryList={categoryList}
          refetch={refetch}
          onClose={() => setShowDeleteModal(false)}
        />
      )}
    </div>
  );
};
export default Card;
