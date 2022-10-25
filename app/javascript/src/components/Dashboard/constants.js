import * as yup from "yup";

export const initialColumnsList = {
  Author: true,
  Category: true,
  Date: true,
  Status: true,
  Title: true,
  deleteAndEdit: true,
};

export const AT_LEAST_ONE_ALPHANUMERIC_REGEX = /[a-zA-Z0-9]+/;

export const NEW_CATEGORY_FORM_VALIDATION_SCHEMA = yup.object().shape({
  category: yup
    .string()
    .required("Category name is required")
    .matches(
      AT_LEAST_ONE_ALPHANUMERIC_REGEX,
      "Please add one letter or number"
    ),
});

export const NEW_CATEGORY_INITIAL_VALUE = {
  category: "",
};
