import * as yup from "yup";

export const initialColumnsList = {
  Author: true,
  Category: true,
  Date: true,
  Status: true,
  Title: true,
  deleteAndEdit: true,
};

export const NEW_CATEGORY_FORM_VALIDATION_SCHEMA = yup.object().shape({
  category: yup.string().required("Category name is required"),
});

export const NEW_CATEGORY_INITIAL_VALUE = {
  category: "",
};
