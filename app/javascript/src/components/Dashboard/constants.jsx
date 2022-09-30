import React from "react";

import { Delete, Edit } from "neetoicons";
import { Typography, Button } from "neetoui";

export const COLUMN_DATA = [
  {
    dataIndex: "title",
    key: "title",
    title: "Title",
    render: title => (
      <Typography className="text-indigo-500" type="body3">
        {title}
      </Typography>
    ),
  },
  {
    dataIndex: "created_at",
    key: "created_at",
    title: "Date",
  },
  {
    dataIndex: "user_name",
    key: "author",
    title: "Author",
  },
  {
    dataIndex: "category_name",
    key: "category",
    title: "Category",
  },
  {
    dataIndex: "status",
    key: "status",
    title: "Status",
  },
  {
    key: "deleteAndEdit",
    render: () => (
      <div className="flex space-x-2">
        <Button icon={() => <Delete size="18" />} size="smal" style="text" />
        <Button icon={() => <Edit size="18" />} size="small" style="text" />
      </div>
    ),
  },
];
