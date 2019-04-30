import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import isValidEmail from "sane-email-validation";
import FormWrap from "../../components/styles/FormWrap";
import Link from "next/link";
import { connect } from "react-redux";
import { signupRequest } from "../../modules/signup";
import Wrap from "../../components/FormWrap";
import FormInput from "../../components/styles/FormInput";
import Button from "../../components/styles/Button";
import { color } from "../../components/styles/constant";
import GoogleSignIn from "../../components/GoogleSignIn";
import { Row, Col, Select, Icon } from "antd";

const RenderInput = ({ input, meta, label }) => (
  <FormWrap>
    <label>{label}</label>
    <input {...input} type="text" />
    {meta.error && meta.touched && <div className="error">{meta.error}</div>}
  </FormWrap>
);
const RenderPassword = ({ input, meta, label }) => (
  <FormWrap>
    <label>{label}</label>
    <input {...input} type="password" />
    {meta.error && meta.touched && <div className="error">{meta.error}</div>}
  </FormWrap>
);

const validate = values => {
  const errors = {};

  if (!values.first_name) {
    errors.first_name = "First name is required";
  }
  if (!values.last_name) {
    errors.last_name = "Last name is required";
  }
  if (!values.email) {
    errors.email = "Email name is required";
  } else if (!isValidEmail(values.email)) {
    errors.email = "Invalid Email";
  }
  if (!values.password) {
    errors.password = "Password is required";
  }
  if (!values.company) {
    errors.company = "Company is required";
  }

  return errors;
};

// const onSignIn = googleUser => {
//   var profile = googleUser.getBasicProfile();
//   console.log("ID: " + profile.getId()); // Do not send to your backend! Use an ID token instead.
//   console.log("Name: " + profile.getName());
//   console.log("Image URL: " + profile.getImageUrl());
//   console.log("Email: " + profile.getEmail()); // This is null if the 'email' scope is not present.
// };

const Signup = ({ handleSubmit, signupRequest, loading }) => (
  <Wrap>
    <div className="caption">Create an account</div>
    <div className="wrap">
      <div className="login-wrap">
        <FormInput>
          <form method="post" onSubmit={handleSubmit(x => signupRequest(x))}>
            <Row gutter={16}>
              <Col span={12}>
                <Field
                  label="First Name"
                  name="first_name"
                  component={RenderInput}
                  placeholder="Enter Your first name"
                />
              </Col>
              <Col span={12}>
                <Field
                  label="Last Name"
                  name="last_name"
                  component={RenderInput}
                  placeholder="Enter Your last name"
                />
              </Col>
              <Col span={12}>
                <Field
                  label="Email"
                  name="email"
                  component={RenderInput}
                  placeholder="Enter Your email"
                />
              </Col>
              <Col span={12}>
                <Field
                  label="Password"
                  name="password"
                  component={RenderPassword}
                  placeholder="Enter Your password"
                />
              </Col>
              <Col span={24}>
                <Field
                  label="Company Name"
                  name="company"
                  component={RenderInput}
                  placeholder="Enter Your Company Name"
                />
              </Col>

              <div>
                <Button
                  buttonColor={"#17977c"}
                  buttonHover={"rgba(23, 151, 124, 0.9)"}
                  textColor={color.whiteColor}
                  type="submit"
                  className="button full"
                >
                  {loading ? (
                    <Icon
                      style={{ fontSize: 21, color: "white" }}
                      type="loading"
                    />
                  ) : (
                    "Signup"
                  )}
                </Button>
              </div>
              <br />
              {/* <div className="g-signin2" data-onsuccess="onSignIn" /> */}
              {/* <GoogleSignIn /> */}
            </Row>
          </form>
        </FormInput>
      </div>
    </div>
    <div className="footer-info">
      Already have an account?
      <Link href="/login">
        <a> Login</a>
      </Link>
    </div>
  </Wrap>
);

const SignupPage = reduxForm({
  form: "signup",
  validate
})(Signup);

const mapStateToProps = state => ({
  error: state.signup.error,
  loading: state.signup.loading
});

export default connect(
  mapStateToProps,
  { signupRequest }
)(SignupPage);
