import * as yup from "yup";

export const INITIAL_VALUE = {
  title: "",
};

export const validationSchema = yup.object().shape({
  title: yup.string().required("Category name is required"),
});
