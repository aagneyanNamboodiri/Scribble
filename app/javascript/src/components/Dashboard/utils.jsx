import React from "react";

import dayjs from "dayjs";
import { Delete, Edit } from "neetoicons";
import { Typography, Button } from "neetoui";

var advancedFormat = require("dayjs/plugin/advancedFormat");

dayjs.extend(advancedFormat);

export const formatTime = dateTime => dayjs(dateTime).format("MMMM Do, YYYY");

export const buildColumns = handleDelete => {
  const columnData = [
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
            onClick={() => handleDelete(slug)}
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

  return columnData;
};
