import * as yup from "yup";

import { AT_LEAST_ONE_ALPHANUMERIC_REGEX } from "./constants";

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
