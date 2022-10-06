import * as yup from "yup";

export const INITIAL_VALUE = {
  name: "",
};

export const validationSchema = yup.object().shape({
  name: yup.string().required("Category name is required"),
});
