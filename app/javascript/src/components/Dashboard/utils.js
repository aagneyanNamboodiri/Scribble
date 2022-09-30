import dayjs from "dayjs";

var advancedFormat = require("dayjs/plugin/advancedFormat");

dayjs.extend(advancedFormat);

export const formatTime = dateTime => dayjs(dateTime).format("MMMM Do, YYYY");
