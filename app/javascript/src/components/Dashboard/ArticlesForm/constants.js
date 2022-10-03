import * as yup from "yup";

export const INITIAL_ARTICLES_FORM_VALUES = {
  title: "",
  body: "",
  category: "",
};

export const buildArticlesFormValidationSchema = categoryList => {
  const validationSchema = yup.object().shape({
    title: yup.string().required("Title is required"),
    body: yup.string().required("Body is required"),
    category: yup
      .object()
      .nullable()
      .shape({
        label: yup.string().oneOf(categoryList.map(category => category.label)),
        value: yup.string().oneOf(categoryList.map(category => category.value)),
      })
      .required("Please select a category"),
  });

  return validationSchema;
};
