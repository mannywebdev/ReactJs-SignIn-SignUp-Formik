import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import signup from "../Images/onboarding.svg";
import { signUpSchema } from "../Schema";
import SignInput from "../Components/SignInput";
import { userService } from "../Service/userService";
import { errorToast } from "../Helper";
import { ToastContainer } from "react-toastify";

class SignUp extends Component {
  render() {
    const formikProps = {
      initialValues: {
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        confirm_password: "",
      },
      validateOnBlur: false,
      validateOnchange: false,
      validationSchema: signUpSchema,
      onSubmit: async (formValues, { setSubmitting }) => {
        setSubmitting(true);
        userService
          .signUp(formValues)
          .then((response) => {
            setSubmitting(false);
            if (response.status === 200) {
              localStorage.setItem("rtm_user", JSON.stringify(response.data));
              this.props.signIn(response.data);
              this.props.navigate("/home");
            }
          })
          .catch((err) => {
            setSubmitting(false);
            console.log("err :>> ", err);
            if (err.response) {
              errorToast(err.response?.data?.error);
            } else if (err.request) {
              errorToast(err.request?.response);
            }
          });
      },
    };
    return (
      <Formik {...formikProps}>
        {({
          values,
          handleBlur,
          handleChange,
          touched,
          isSubmitting,
          errors,
          handleSubmit,
        }) => (
          <div className="container-fluid h-100">
            <div className="row min-vh-100">
              <div className="col-md-6 bg-light p-5 d-lg-block d-md-block d-sm-none d-none">
                <div
                  className="bgImg"
                  style={{ backgroundImage: `url(${signup})` }}
                ></div>
              </div>
              <div className="col-md-6  px-5 d-flex align-items-center">
                <div className="py-5">
                  <div className="heading-login">Sign Up</div>
                  <form className="form-fields-login" onSubmit={handleSubmit}>
                    {/* First Name */}
                    <SignInput
                      label="First Name"
                      id="first_name"
                      inputProps={{
                        placeholder: "John",
                        name: "first_name",
                        type: "text",
                        value: values.first_name,
                        onChange: handleChange,
                        onBlur: handleBlur,
                        disabled: isSubmitting,
                      }}
                      error={errors.first_name}
                      touched={touched.first_name}
                    />
                    {/* Last Name */}
                    <SignInput
                      label="Last Name"
                      id="last_name"
                      inputProps={{
                        placeholder: "Doe",
                        name: "last_name",
                        type: "text",
                        value: values.last_name,
                        onChange: handleChange,
                        onBlur: handleBlur,
                        disabled: isSubmitting,
                      }}
                      error={errors.last_name}
                      touched={touched.last_name}
                    />
                    {/* Email */}
                    <SignInput
                      label="Email"
                      id="email"
                      inputProps={{
                        placeholder: "name@example.com",
                        name: "email",
                        type: "email",
                        value: values.email,
                        onChange: handleChange,
                        onBlur: handleBlur,
                        disabled: isSubmitting,
                      }}
                      error={errors.email}
                      touched={touched.email}
                    />
                    {/* Password */}
                    <SignInput
                      label="Password"
                      id="password"
                      inputProps={{
                        placeholder: "********",
                        name: "password",
                        type: "password",
                        value: values.password,
                        onChange: handleChange,
                        onBlur: handleBlur,
                        disabled: isSubmitting,
                      }}
                      error={errors.password}
                      touched={touched.password}
                    />
                    {/*Confirm Password */}
                    <SignInput
                      label="Confirm Password"
                      id="confirm_password"
                      inputProps={{
                        placeholder: "********",
                        name: "confirm_password",
                        type: "password",
                        value: values.confirm_password,
                        onChange: handleChange,
                        onBlur: handleBlur,
                        disabled: isSubmitting,
                      }}
                      error={errors.confirm_password}
                      touched={touched.confirm_password}
                    />

                    <div className="full-width-field mb-2">
                      <button
                        className="button-style"
                        type="submit"
                        disabled={isSubmitting}
                      >
                        Sign Up
                      </button>
                    </div>
                    <div className="text-center">
                      <span>Already have an Account? </span>
                      <Link
                        className="text-primary cursor-pointer"
                        to="/signin"
                      >
                        Sign In
                      </Link>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <ToastContainer />
          </div>
        )}
      </Formik>
    );
  }
}
export default SignUp;
