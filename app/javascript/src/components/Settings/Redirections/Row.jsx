import React, { useState } from "react";

import { Delete, Edit } from "neetoicons";
import { Typography } from "neetoui";

import redirectionsApi from "apis/Api/redirections";

import Form from "./Form";
import { truncateLongString } from "./utils";

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
      <Typography className="w-1/2" style="body3" weight="medium">
        {`${truncateLongString(window.location.hostname)}/${
          redirection.from_path
        }`}
      </Typography>
      <Typography className="w-1/2" style="body3" weight="medium">
        {`${truncateLongString(window.location.hostname)}/${
          redirection.to_path
        }`}
      </Typography>
      <div className="flex w-1/12 justify-between">
        <Delete size="18" onClick={handleDelete} />
        <Edit size="18" onClick={() => setIsEditing(true)} />
      </div>
    </div>
  );
};

export default Row;
