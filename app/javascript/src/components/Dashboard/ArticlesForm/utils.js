import * as yup from "yup";

export const buildArticlesFormValidationSchema = categoryList => {
  const validationSchema = yup.object().shape({
    title: yup.string().required("Title is required"),
    body: yup.string().required("Body is required"),
    category: yup
      .object()
      .nullable()
      .shape({
        label: yup.string().oneOf(categoryList.map(category => category.label)),
        value: yup.number().oneOf(categoryList.map(category => category.value)),
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
