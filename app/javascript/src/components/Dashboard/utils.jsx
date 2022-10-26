import React from "react";

import dayjs from "dayjs";
import { Delete, Edit } from "neetoicons";
import { Typography, Button } from "neetoui";

var advancedFormat = require("dayjs/plugin/advancedFormat");

dayjs.extend(advancedFormat);

export const formatTime = dateTime =>
  dateTime === "-" ? "-" : dayjs(dateTime).format("MMMM Do, YYYY");

export const buildColumns = handleDelete => {
  const columnData = [
    {
      dataIndex: "title",
      key: "Title",
      title: "Title",
      render: (title, { id }) => (
        <Button
          className="text-indigo-500"
          label={title}
          style="link"
          to={`/articles/${id}/edit`}
        />
      ),
    },
    {
      dataIndex: "created_at",
      key: "Date",
      title: "Date",
      width: 170,
      render: created_at => (
        <Typography style="body2">{formatTime(created_at)}</Typography>
      ),
    },
    {
      dataIndex: "user_name",
      key: "Author",
      title: "Author",
      width: 150,
    },
    {
      dataIndex: "category_name",
      key: "Category",
      title: "Category",
      width: 100,
    },
    {
      dataIndex: "status",
      key: "Status",
      title: "Status",
      width: 80,
    },
    {
      dataIndex: "id",
      key: "deleteAndEdit",
      render: id => (
        <div className="flex space-x-2">
          <Button
            icon={() => <Delete size="18" />}
            size="smal"
            style="text"
            onClick={() => handleDelete(id)}
          />
          <Button
            icon={() => <Edit size="18" />}
            size="small"
            style="text"
            to={`/articles/${id}/edit`}
          />
        </div>
      ),
    },
  ];

  return columnData;
};

export const filterColumnData = (handleDelete, columnList) =>
  buildColumns(handleDelete).filter(column => columnList[column.key] === true);
