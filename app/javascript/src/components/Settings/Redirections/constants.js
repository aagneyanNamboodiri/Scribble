import * as yup from "yup";

export const INITIAL_VALUES = {
  fromPath: "",
  toPath: "",
};

export const validationSchema = yup.object().shape({
  fromPath: yup.string().required("From path is required"),
  toPath: yup.string().required("To path name is required"),
});
