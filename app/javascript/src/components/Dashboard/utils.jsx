import React from "react";

import dayjs from "dayjs";
import { Delete, Edit } from "neetoicons";
import { Typography, Button } from "neetoui";

import TooltipWrapper from "../TooltipWrapper";

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
      render: (title, { status, slug }) =>
        status === "published" ? (
          <Typography
            className="text-indigo-500"
            style="body2"
            weight="medium"
            onClick={() => window.open(`/public/${slug}`, "_blank")}
          >
            {title}
          </Typography>
        ) : (
          <TooltipWrapper
            disabled
            content="Article is not published!"
            followCursor="horizontal"
            position="bottom"
          >
            <Typography style="body2">{title}</Typography>
          </TooltipWrapper>
        ),
    },
    {
      dataIndex: "updated_at",
      key: "Date",
      title: "Last published at",
      width: 170,
      render: (udpated_at, { slug }) => (
        <Typography style="body2">
          {slug ? formatTime(udpated_at) : "-"}
        </Typography>
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
