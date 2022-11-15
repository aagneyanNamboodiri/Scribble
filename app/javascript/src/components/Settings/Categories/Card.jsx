import React, { useState } from "react";

import { MenuVertical } from "neetoicons";
import { Typography, Dropdown } from "neetoui";

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
    <div className="border-t flex space-x-2 pt-2">
      <Form
        category={category}
        isEditing={isEditing}
        refetch={refetch}
        setAction={setIsEditing}
      />
    </div>
  ) : (
    <div
      className="border-t mt-2 flex w-2/3 justify-between pt-2"
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      <div className="flex-col">
        <Typography style="h4" weight="medium">
          {category.name}
        </Typography>
        <Typography className="text-gray-500" style="body3">
          2 articles
        </Typography>
      </div>
      <div className="flex space-x-1 pt-1">
        <Dropdown customTarget={<MenuVertical />}>
          <Menu>
            <MenuItem.Button onClick={() => setIsEditing(true)}>
              Edit
            </MenuItem.Button>
            <Divider />
            <MenuItem.Button style="danger" onClick={handleDelete}>
              Delete
            </MenuItem.Button>
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
