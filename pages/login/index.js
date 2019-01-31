// This is the Login page

import React, { Component } from "react";
import { connect } from "react-redux";
import { loginRequest } from "../../modules/app/login";
import { PropTypes } from "prop-types";
import Router from "next/router";
import NProgress from "nprogress";
import Link from "next/link";
import Wrap from "../../components/FormWrap";
import FormInput from "../../components/styles/FormInput";
import Button from "../../components/styles/Button";
import { color } from "../../components/styles/constant";

class Login extends Component {
  constructor(props) {
    super(props);
    // Set the initial state to the value expected from the form submission
    this.state = {
      email: "",
      password: "",
      submitted: false
    };
  }

  handleSubmit = e => {
    // prevent the page from refreshing
    e.preventDefault();
    Router.onRouteChangeStart = () => {
      NProgress.start();
    };
    const { email, password } = this.state;
    this.setState({ submitted: true });
    const data = {
      email: email,
      password: password
    };
    if (email) {
      console.log("login called");
      this.props.loginRequest(data);
    }
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    const { email, password, submitted } = this.state;
    return (
      <Wrap>
        <div className="caption">Login to your account</div>
        <div className="login-wrap">
          <FormInput>
            <form onSubmit={this.handleSubmit}>
              <div className="form-wrap">
                <label htmlFor="">Email</label>
                <input
                  type="text"
                  onChange={this.handleChange}
                  name="email"
                  placeholder="Enter Your Email"
                />
                {submitted && !email && (
                  <div className="error">Email is required</div>
                )}
              </div>
              <div className="form-wrap">
                <label htmlFor="">Password</label>
                <input
                  type="password"
                  name="password"
                  onChange={this.handleChange}
                  placeholder="Enter Your Password"
                />
                {submitted && !password && (
                  <div className="error">Password is required</div>
                )}
              </div>
              <Button
                buttonColor={color.brandColor}
                textColor={color.whiteColor}
                type="submit"
                className="button full"
              >
                {" "}
                Login
              </Button>
              {/* <span>{this.props.error.message}</span> */}
            </form>
          </FormInput>
        </div>
        <div className="footer-info">
          Don't have an account?
          <Link href="/signup">
            <a> Sign up</a>
          </Link>
        </div>
      </Wrap>
    );
  }
}

Login.propTypes = {
  loginRequest: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  error: state.login.error
});

export default connect(
  mapStateToProps,
  { loginRequest }
)(Login);
