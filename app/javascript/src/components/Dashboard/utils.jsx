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
      render: (title, slug) => (
        <Button
          className="text-indigo-500"
          label={title}
          style="link"
          to={`/articles/${slug.slug}/edit`}
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
            to={`/articles/${slug}/edit`}
          />
        </div>
      ),
    },
  ];

  return columnData;
};

export const filterRowData = (
  articles,
  selectedCategoryFilter,
  articleStatus
) => {
  articles.map(article =>
    article.status === "draft" ? (article.created_at = "-") : article.created_at
  );

  return articles
    .filter(
      article =>
        selectedCategoryFilter.includes(article.category_name) ||
        !selectedCategoryFilter.length
    )
    .filter(
      article => article.status === articleStatus || articleStatus === "all"
    );
};

export const filterColumnData = (handleDelete, columnList) =>
  buildColumns(handleDelete).filter(column => columnList[column.key] === true);
