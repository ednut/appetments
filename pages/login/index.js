import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import isValidEmail from "sane-email-validation";

import FormWrap from "../../components/styles/FormWrap";
import { connect } from "react-redux";
import { loginRequest } from "../../modules/login";
import { PropTypes } from "prop-types";
import Router from "next/router";
import NProgress from "nprogress";
import Link from "next/link";
import Wrap from "../../components/FormWrap";
import FormInput from "../../components/styles/FormInput";
import Button from "../../components/styles/Button";
import { color } from "../../components/styles/constant";
import { Icon } from "antd";

const RenderInput = ({ input, meta, label }) => (
  <FormWrap>
    <label>{label}</label>
    <input {...input} type="email" autoComplete="off" />
    {meta.error && meta.touched && <div className="error">{meta.error}</div>}
  </FormWrap>
);

const RenderPassword = ({ input, meta, label }) => (
  <FormWrap>
    <label>{label}</label>
    <input {...input} type="password" autoComplete="off" />
    {meta.error && meta.touched && <div className="error">{meta.error}</div>}
  </FormWrap>
);

// const RenderSelect = createRenderer((input, { children }) => (
//   <select {...input}>{children}</select>
// ));

const validate = values => {
  const errors = {};
  console.log(values);
  if (!values.username) {
    errors.username = "Email is required";
  } else if (!isValidEmail(values.username)) {
    errors.username = "Invalid Email";
  }
  if (!values.password) {
    errors.password = "Password is required";
  }

  return errors;
};

const Login = ({ handleSubmit, submitting, loginRequest, loading }) => (
  <Wrap>
    {/* {console.log(loginRequest)} */}
    <div className="caption">Login to your account</div>
    <div className="wrap">
      <div className="login-wrap">
        <FormInput>
          <form method="post" onSubmit={handleSubmit(x => loginRequest(x))}>
            <Field
              label="Email"
              name="username"
              component={RenderInput}
              placeholder="Enter Your Email"
              type="text"
              required
              className="reqired"
            />
            <Field
              label="Password"
              name="password"
              component={RenderPassword}
              placeholder="Enter Your Password"
              type="password"
            />
            <Button
              buttonColor={"#17977c"}
              buttonHover={"rgba(23, 151, 124, 0.9)"}
              textColor={color.whiteColor}
              type="submit"
              className="button full"
            >
              {loading ? (
                <Icon style={{ fontSize: 21, color: "white" }} type="loading" />
              ) : (
                "Login"
              )}
            </Button>
          </form>
        </FormInput>
      </div>
    </div>
    <div className="footer-info">
      Don't have an account?
      <Link href="/signup">
        <a> Sign up</a>
      </Link>
    </div>
  </Wrap>
);

const LoginPage = reduxForm({
  form: "login",
  validate
})(Login);

const mapStateToProps = state => ({
  loading: state.login.loading
});

export default connect(
  mapStateToProps,
  { loginRequest }
)(LoginPage);
