import React from "react";

import { Delete, Edit } from "neetoicons";
import { Typography } from "neetoui";

const Row = () => (
  <div className="flex justify-between bg-white p-3">
    <Typography style="body3" weight="medium">
      https://scribble.com/welcome
    </Typography>
    <Typography className="w-1/4" style="body3" weight="medium">
      https://scribble.com/
    </Typography>
    <div className="flex w-1/12 justify-between">
      <Delete size={18} />
      <Edit size={18} />
    </div>
  </div>
);

export default Row;
