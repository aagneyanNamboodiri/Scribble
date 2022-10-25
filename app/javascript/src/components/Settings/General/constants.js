import * as yup from "yup";

const AT_LEAST_ONE_ALPHANUMERIC_REGEX = /[a-zA-Z0-9]+/;

export const numericalRegex = /[0-9]/;
export const alphabetRegex = /[a-zA-Z]/;

export const validationSchema = yup.object().shape({
  siteName: yup
    .string()
    .required("Site name is required")
    .matches(
      AT_LEAST_ONE_ALPHANUMERIC_REGEX,
      "Please add one letter or number"
    ),
  password: yup.string(),
});
