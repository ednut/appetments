import React, { Component } from "react";
import Router from "next/router";
import { reduxForm, Field } from "redux-form";
import isValidEmail from "sane-email-validation";
import FormWrap from "../../components/styles/FormWrap";
import Link from "next/link";
import { connect } from "react-redux";
import { signupRequest, googleSignupRequest } from "../../modules/signup";
import Wrap from "../../components/FormWrap";
import FormInput from "../../components/styles/FormInput";
import Button from "../../components/styles/Button";
import { color } from "../../components/styles/constant";
import { GoogleLogin } from "react-google-login";
import { Row, Col, message, Icon } from "antd";

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

class GoogleButton extends Component {
  render() {
    const googleSigninSuccess = response => {
      let user = response.profileObj;
      const obj = {
        google_id: user.googleId,
        first_name: user.givenName,
        last_name: user.familyName,
        email: user.email
      };
      this.props.signUp(obj);
    };

    const googleSigninFailure = response => {
      console.log(response);
      message.error("Google signup not succesful", 5);
    };

    return (
      <GoogleLogin
        clientId="624757778024-t7cf1t4c1uvovhdcl53rsuhpko4e6nle.apps.googleusercontent.com" //CLIENTID NOT CREATED YET
        buttonText="SIGNUP WITH GOOGLE"
        onSuccess={googleSigninSuccess}
        onFailure={googleSigninFailure}
      />
    );
  }
}

const Signup = ({
  handleSubmit,
  signupRequest,
  googleSignupRequest,
  loading
}) => (
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
            </Row>
          </form>
        </FormInput>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            marginTop: "2rem"
          }}
        >
          <h4>OR</h4>
          <GoogleButton signUp={googleSignupRequest} />
        </div>
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
  { signupRequest, googleSignupRequest }
)(SignupPage);
