import * as yup from "yup";

export const signUpSchema = yup.object().shape({
  first_name: yup.string().required("This field is required"),
  last_name: yup.string().required("This field is required"),
  email: yup
    .string()
    .email("Email must be valid")
    .required("This field is required"),
  password: yup
    .string()
    .required("This field is required")
    .min(6, "Password is too short")
    .max(30, "Password is too long"),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords doesn't matched")
    .required("This field is required"),
});

export const signInSchema = yup.object().shape({
  email: yup
    .string()
    .email("Email must be valid")
    .required("This field is required"),
  password: yup.string().required("This field is required"),
});
