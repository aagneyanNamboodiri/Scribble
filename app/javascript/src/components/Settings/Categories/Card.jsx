import React, { useState } from "react";

import { Reorder, Delete, Edit } from "neetoicons";
import { Button, Typography } from "neetoui";

import DeleteAlert from "./DeleteAlert";

const Card = ({ category, refetch }) => {
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState({});
  const handleDelete = () => {
    setCategoryToDelete(category);
    setShowDeleteAlert(true);
  };

  return (
    <div className="border-t flex w-full justify-between pt-3">
      <div className="flex space-x-2">
        <Reorder size="20" />
        <Typography style="body2">{category.name}</Typography>
      </div>
      <div className="flex space-x-1">
        <Button
          disabled={category.name === "General"}
          icon={() => <Delete size="18" />}
          size="smal"
          style="text"
          onClick={() => handleDelete(category)}
        />
        <Button
          icon={() => <Edit size="18" />}
          size="small"
          style="text"
          onClick={() => refetch()}
        />
      </div>
      {showDeleteAlert && (
        <DeleteAlert
          category={categoryToDelete}
          refetch={refetch}
          onClose={() => setShowDeleteAlert(false)}
        />
      )}
    </div>
  );
};
export default Card;
