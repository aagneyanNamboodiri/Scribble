import React from "react";

import dayjs from "dayjs";
import { Typography } from "neetoui";

var advancedFormat = require("dayjs/plugin/advancedFormat");

dayjs.extend(advancedFormat);

export const formatTime = dateTime =>
  dateTime === "-" ? "-" : dayjs(dateTime).format("MMMM Do, YYYY");

export const COLUMN_DATA = [
  {
    dataIndex: "title",
    key: "Title",
    title: "Title",
    width: 250,
    render: (title, { slug }) => (
      <Typography
        className="text-indigo-500"
        style="body2"
        weight="medium"
        onClick={() => window.open(`/public/${slug}`, "_blank")}
      >
        {title}
      </Typography>
    ),
  },
  {
    dataIndex: "updated_at",
    key: "Date",
    title: "Last published at",
    width: 170,
    render: udpated_at => (
      <Typography style="body2">{formatTime(udpated_at)}</Typography>
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

export const MINI_VISITS_TABLE_COLUMN_DATA = [
  {
    dataIndex: "visit_date",
    key: "Date",
    title: "Date",
    width: 100,
  },
  {
    dataIndex: "visit_count",
    key: "Visits",
    title: "Visits",
    width: 100,
  },
];
