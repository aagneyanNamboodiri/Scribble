import React, { useState } from "react";

import { Delete, Edit } from "neetoicons";
import { Typography } from "neetoui";

import redirectionsApi from "apis/redirections";

import Form from "./RoutesForm";

const Row = ({ redirection, refetch }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleDelete = async () => {
    try {
      await redirectionsApi.destroy(redirection.id);
    } catch (err) {
      logger.log(err);
    } finally {
      refetch();
    }
  };

  return isEditing ? (
    <Form
      isEditing={isEditing}
      redirection={redirection}
      refetch={refetch}
      setAction={setIsEditing}
    />
  ) : (
    <div className="flex justify-between bg-white p-3">
      <Typography style="body3" weight="medium">
        {`localhost:3000${redirection.from_path}`}
      </Typography>
      <Typography className="w-1/4" style="body3" weight="medium">
        {`localhost:3000${redirection.to_path}`}
      </Typography>
      <div className="flex w-1/12 justify-between">
        <Delete size="18" onClick={handleDelete} />
        <Edit size="18" onClick={() => setIsEditing(true)} />
      </div>
    </div>
  );
};

export default Row;
