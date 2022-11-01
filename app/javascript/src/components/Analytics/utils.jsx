import React from "react";

import dayjs from "dayjs";
import { Typography } from "neetoui";

import TooltipWrapper from "../TooltipWrapper";

var advancedFormat = require("dayjs/plugin/advancedFormat");

dayjs.extend(advancedFormat);

const isArticlePublished = status => status === "published";

export const formatTime = dateTime =>
  dateTime === "-" ? "-" : dayjs(dateTime).format("MMMM Do, YYYY");

export const COLUMN_DATA = [
  {
    dataIndex: "title",
    key: "Title",
    title: "Title",
    width: 250,
    render: (title, { status, slug }) => (
      <TooltipWrapper
        content="Article is not published!"
        disabled={!isArticlePublished(status)}
        followCursor="horizontal"
        position="bottom"
      >
        <Typography
          className={isArticlePublished(status) && "text-indigo-500"}
          style="body2"
          weight="medium"
          onClick={() =>
            isArticlePublished(status) &&
            window.open(`/public/${slug}`, "_blank")
          }
        >
          {title}
        </Typography>
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
    dataIndex: "category_name",
    key: "Category",
    title: "Category",
    width: 100,
  },
  {
    dataIndex: "visits",
    key: "Visits",
    title: "Visits",
    width: 80,
    sorter: (a, b) => a.visits - b.visits,
    render: visits => <Typography style="body2">{visits}</Typography>,
  },
];
