import dayjs from "dayjs";

var advancedFormat = require("dayjs/plugin/advancedFormat");

dayjs.extend(advancedFormat);

export const formatTime = dateTime =>
  dateTime === "-" ? "-" : dayjs(dateTime).format("MMMM Do, YYYY");

export const buildRowData = (record, visits) =>
  Object.keys(visits[record.id]).map(key => ({
    visit_date: formatTime(key),
    visit_count: visits[record.id][key],
  }));
