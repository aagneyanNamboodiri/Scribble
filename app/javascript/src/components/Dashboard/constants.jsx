import React from "react";

import { Delete, Edit } from "neetoicons";
import { Typography, Button } from "neetoui";

import articlesApi from "apis/articles";

import { formatTime } from "./utils";

export const COLUMN_DATA = [
  {
    dataIndex: "title",
    key: "Title",
    title: "Title",
    render: title => (
      <Typography className="text-indigo-500" style="body2">
        {title}
      </Typography>
    ),
  },
  {
    dataIndex: "created_at",
    key: "Date",
    title: "Date",
    render: created_at => (
      <Typography style="body2">{formatTime(created_at)}</Typography>
    ),
  },
  {
    dataIndex: "user_name",
    key: "Author",
    title: "Author",
  },
  {
    dataIndex: "category_name",
    key: "Category",
    title: "Category",
  },
  {
    dataIndex: "status",
    key: "Status",
    title: "Status",
  },
  {
    dataIndex: "slug",
    key: "deleteAndEdit",
    render: slug => (
      <div className="flex space-x-2">
        <Button
          icon={() => <Delete size="18" />}
          size="smal"
          style="text"
          onClick={() => articlesApi.destroy(slug)}
        />
        <Button
          icon={() => <Edit size="18" />}
          size="small"
          style="text"
          to={`/articles/edit/${slug}`}
        />
      </div>
    ),
  },
];

export const initialColumnsList = COLUMN_DATA.map(column => column.key).reduce(
  (accumulator, value) => ({ ...accumulator, [value]: true }),
  {}
);
