import React from "react";
import PropTypes from "prop-types";

const inputBottomMargin = { marginBottom: "19px" };
const SignInput = ({ label, inputProps, error, id, touched }) => (
  <div
    className="full-width-field"
    style={error && touched ? null : inputBottomMargin}
  >
    <label htmlFor="last_name">{label}</label>
    <input {...inputProps} id={id} />
    {error && touched ? (
      <p className="mt-1 mb-0 fs-10 text-danger text-align-end">{error}</p>
    ) : null}
  </div>
);

SignInput.propTypes = {
  label: PropTypes.string.isRequired,
  inputProps: PropTypes.instanceOf(Object).isRequired,
  error: PropTypes.string,
  id: PropTypes.string.isRequired,
};

SignInput.defaultProps = {
  error: "",
};

export default SignInput;
