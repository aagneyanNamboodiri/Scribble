import React from "react";

import { Reorder, Delete, Edit } from "neetoicons";
import { Button, Typography } from "neetoui";

const Card = ({ category, refetch }) => (
  <div className="border-t flex w-full justify-between pt-3">
    <div className="flex space-x-2">
      <Reorder size="20" />
      <Typography style="body2">{category.name}</Typography>
    </div>
    <div className="flex space-x-1">
      <Button icon={() => <Delete size="18" />} size="smal" style="text" />
      <Button
        icon={() => <Edit size="18" />}
        size="small"
        style="text"
        onClick={() => refetch()}
      />
    </div>
  </div>
);
export default Card;
