import * as yup from "yup";

export const buildDeleteModalSelectValidationSchema = categoryList => {
  const validationSchema = yup.object().shape({
    category: yup
      .object()
      .nullable()
      .shape({
        label: yup.string().oneOf(categoryList.map(category => category.name)),
        value: yup.number().oneOf(categoryList.map(category => category.id)),
      })
      .required("Category is required"),
  });

  return validationSchema;
};
