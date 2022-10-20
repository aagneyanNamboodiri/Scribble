import * as yup from "yup";

export const numericalRegex = /[0-9]/;
export const alphabetRegex = /[a-zA-Z]/;

export const validationSchema = yup.object().shape({
  siteName: yup.string().required("Site name is required"),
  password: yup.string(),
});
