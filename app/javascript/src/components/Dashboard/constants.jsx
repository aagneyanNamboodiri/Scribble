import React from "react";

import { Delete, Edit } from "neetoicons";
import { Typography, Button } from "neetoui";

import { formatTime } from "./utils";

export const COLUMN_DATA = [
  {
    dataIndex: "title",
    key: "title",
    title: "Title",
    render: title => (
      <Typography className="text-indigo-500" style="body2">
        {title}
      </Typography>
    ),
  },
  {
    dataIndex: "created_at",
    key: "created_at",
    title: "Date",
    render: created_at => (
      <Typography style="body2">{formatTime(created_at)}</Typography>
    ),
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
