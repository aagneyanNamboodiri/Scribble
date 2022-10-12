import * as yup from "yup";

export const INITIAL_VALUES = {
  from_path: "",
  to_path: "",
};

export const validationSchema = yup.object().shape({
  from_path: yup.string().required("From path is required"),
  to_path: yup.string().required("To path name is required"),
});
