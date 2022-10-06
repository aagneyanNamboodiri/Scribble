import * as yup from "yup";

export const buildInitialValue = category => {
  const initialValue = {
    name: Object.keys(category).length === 0 ? "" : category.name,
  };

  return initialValue;
};

export const validationSchema = yup.object().shape({
  name: yup.string().required("Category name is required"),
});
