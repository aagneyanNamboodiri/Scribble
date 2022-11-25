import dayjs from "dayjs";
import * as yup from "yup";

import { AT_LEAST_ONE_ALPHANUMERIC_REGEX } from "./constants";

var advancedFormat = require("dayjs/plugin/advancedFormat");

dayjs.extend(advancedFormat);

export const formatTime = dateTime =>
  dayjs(dateTime).format("h:mm A,  MM/DD/YYYY");

export const getHour = dateTime => dayjs(dateTime).format("h A,  MM/DD/YYYY");

export const buildArticlesFormValidationSchema = categoryList => {
  const validationSchema = yup.object().shape({
    title: yup
      .string()
      .required("Title is required")
      .matches(
        AT_LEAST_ONE_ALPHANUMERIC_REGEX,
        "Please add one letter or number"
      ),
    body: yup.string().required("Body is required"),
    category: yup
      .object()
      .nullable()
      .shape({
        label: yup.string().oneOf(categoryList.map(category => category.label)),
        value: yup.string().oneOf(categoryList.map(category => category.value)),
      })
      .required("Category is required"),
  });

  return validationSchema;
};

export const buildInitialValuesForEditArticle = articleData => {
  const initialValues = {
    title: articleData.title,
    body: articleData.body,
    category: {
      value: articleData.assigned_category.id,
      label: articleData.assigned_category.name,
    },
  };

  return initialValues;
};

export const getButtonLabel = article => {
  if (article.is_restoration) return "Article Restored";

  if (article.status === "draft") return "Article Drafted";

  return "Article Published";
};

export const buildCategoryList = categories =>
  categories.map(category => ({
    value: category.id,
    label: category.name,
  }));

export const getArticleSchedulingStatus = ({ schedules, articleData }) => {
  if (schedules.length) {
    return schedules[0]["article_status"] === "published"
      ? "draft"
      : "published";
  }

  return articleData.status === "published" ? "draft" : "published";
};

export const buildDeleteAlertMessage = ({ status }) => `Deleting this ${
  status === "draft" ? "drafting" : "publishing"
}
      schedule will delete the next ${
        status === "draft" ? "publishing" : "drafting"
      } schedule with it to prevent a
      duplicate article ${
        status === "draft" ? "publishing" : "drafting"
      }. Donot worry! Your article will stay in it's current status. Which is, ${
  status === "draft" ? "published" : "draft"
}.`;
