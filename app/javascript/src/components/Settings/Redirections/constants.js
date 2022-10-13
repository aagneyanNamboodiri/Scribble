import * as yup from "yup";

export const INITIAL_VALUES = {
  from_path: "",
  to_path: "",
};

export const validationSchema = yup.object().shape({
  from_path: yup
    .string()
    .required("Add path to redirect from")
    .matches(
      /^[/]|[/][a-zA-Z0-9-]+$/,
      "Should start with / and cannot contain special characters like ),(,@ etc."
    ),
  to_path: yup
    .string()
    .notOneOf([yup.ref("fromPath")], "Same as from path!")
    .required("Add path to redirect to")
    .matches(
      /^[/]|[/][a-zA-Z0-9-]+$/,
      "Should start with / and cannot contain special characters like ),(,@ etc."
    ),
});
