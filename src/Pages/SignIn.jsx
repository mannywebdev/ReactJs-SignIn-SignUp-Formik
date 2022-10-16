import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import signup from "../Images/onboarding.svg";
import { signInSchema } from "../Schema";
import SignInput from "../Components/SignInput";
import { userService } from "../Service/userService";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { errorToast, withRouter } from "../Helper";
import { signin } from "../store/slices/user";
import { connect } from "react-redux";

class SignIn extends Component {
  render() {
    const formikProps = {
      initialValues: {
        email: "",
        password: "",
      },
      validateOnBlur: false,
      validateOnchange: false,
      validationSchema: signInSchema,
      onSubmit: async (formValues, { setSubmitting }) => {
        console.log("submit", formValues);
        setSubmitting(true);
        userService
          .signIn(formValues)
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
              <div className="col-md-6 px-5 d-flex align-items-center">
                <div className="py-5">
                  <div className="heading-login">Sign In</div>
                  <form className="form-fields-login" onSubmit={handleSubmit}>
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
                    <div className="full-width-field mb-2">
                      <button
                        className="button-style"
                        type="submit"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <div className="spinner-border" role="status"></div>
                        ) : (
                          <div>Sign In</div>
                        )}
                      </button>
                    </div>
                    <div className="text-center">
                      <span>Don't have an Account? </span>
                      <Link
                        className="text-primary cursor-pointer"
                        to="/signup"
                      >
                        Sign Up
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

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (data) => dispatch(signin(data)),
  };
};

export default connect(null, mapDispatchToProps)(withRouter(SignIn));
