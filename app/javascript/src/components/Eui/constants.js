import * as yup from "yup";

export const INITIAL_VALUES = {
  password: "",
};

export const VALIDATION_SCHEMA = yup.object().shape({
  password: yup.string().required("Password is required"),
});
