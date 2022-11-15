import dayjs from "dayjs";
import * as yup from "yup";

var advancedFormat = require("dayjs/plugin/advancedFormat");
var relativeTime = require("dayjs/plugin/relativeTime");

dayjs.extend(advancedFormat);
dayjs.extend(relativeTime);

export const formatTime = dateTime =>
  dateTime === "-" ? "-" : dayjs(dateTime).format("MMMM Do, YYYY");

export const daysFromNowFormat = dateTime => dayjs(dateTime).fromNow();

export const buildDeleteModalSelectValidationSchema = categoryList => {
  const validationSchema = yup.object().shape({
    category: yup
      .object()
      .nullable()
      .shape({
        label: yup.string().oneOf(categoryList.map(category => category.name)),
        value: yup.string().oneOf(categoryList.map(category => category.id)),
      })
      .required("Category is required"),
  });

  return validationSchema;
};

export const buildCategoryList = categories =>
  categories.map(category => ({
    value: category.id,
    label: category.name,
  }));

export const getArticleStatusString = status =>
  status === "published" ? "Published" : "Drafted";
