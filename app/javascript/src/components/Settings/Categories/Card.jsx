import React, { useState } from "react";

import { MenuVertical } from "neetoicons";
import { Typography, Dropdown } from "neetoui";
import TooltipWrapper from "tooltipwrapper";

import DeleteModal from "./DeleteModal";
import Form from "./Form";

const Card = ({ category, refetch, categoryList, provided }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  const { Menu, MenuItem, Divider } = Dropdown;

  const handleDelete = () => {
    setCategoryToDelete(category);
    setShowDeleteModal(true);
  };

  return isEditing ? (
    <div className="flex space-x-2 pt-2">
      <Form
        category={category}
        isEditing={isEditing}
        refetch={refetch}
        setAction={setIsEditing}
      />
    </div>
  ) : (
    <div
      className="rounded mt-2 flex w-full justify-between p-2 hover:bg-indigo-100"
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      <div className="flex-col">
        <Typography style="h4" weight="medium">
          {category.name}
        </Typography>
        <Typography className="text-gray-600" style="body3">
          {`${category.articles_count} article${
            category.articles_count > 1 ? "s" : ""
          }`}
        </Typography>
      </div>
      <div className="flex space-x-1 pt-1">
        <Dropdown customTarget={<MenuVertical />}>
          <Menu>
            <MenuItem.Button onClick={() => setIsEditing(true)}>
              Edit
            </MenuItem.Button>
            <Divider />
            <TooltipWrapper
              content="General category cannot be deleted"
              position="bottom"
              disabled={
                categoryList.length === 1 && category.name === "General"
              }
            >
              <MenuItem.Button
                style="danger"
                disabled={
                  categoryList.length === 1 && category.name === "General"
                }
                onClick={handleDelete}
              >
                Delete
              </MenuItem.Button>
            </TooltipWrapper>
          </Menu>
        </Dropdown>
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
