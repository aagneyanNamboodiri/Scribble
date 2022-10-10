import React, { useState } from "react";

import { Delete, Edit } from "neetoicons";
import { Typography } from "neetoui";

import Form from "./Form";

const Row = () => {
  const [isEditing, setIsEditing] = useState(false);

  return isEditing ? (
    <Form setAction={setIsEditing} />
  ) : (
    <div className="flex justify-between bg-white p-3">
      <Typography style="body3" weight="medium">
        https://scribble.com/welcome
      </Typography>
      <Typography className="w-1/4" style="body3" weight="medium">
        https://scribble.com/
      </Typography>
      <div className="flex w-1/12 justify-between">
        <Delete size="18" />
        <Edit size="18" onClick={() => setIsEditing(true)} />
      </div>
    </div>
  );
};

export default Row;
