// This is the Signup page

import React, { Component } from "react";
import Link from "next/link";
import { connect } from "react-redux";
import { signupRequest } from "../../modules/app/signup";
import Wrap from "../../components/FormWrap";
import FormInput from "../../components/styles/FormInput";
import Button from "../../components/styles/Button";
import { color } from "../../components/styles/constant";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      submitted: false
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    const { first_name, last_name, email, password } = this.state;
    this.setState({ submitted: true });
    const data = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
      password: this.state.password
    };
    if (first_name && last_name && email && password) {
      console.log(data);
      this.props.signupRequest(data);
    }
    e.currentTarget.reset();
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  render() {
    const { first_name, last_name, email, password, submitted } = this.state;
    return (
      <Wrap>
        <div className="caption">Create an account</div>
        <div className="login-wrap">
          <FormInput>
            <form onSubmit={this.handleSubmit}>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-wrap">
                    <label htmlFor="">First Name</label>
                    <input
                      type="text"
                      onChange={this.handleChange}
                      placeholder="Enter Your First Name"
                      name="first_name"
                    />
                    {submitted && !first_name && (
                      <div className="error">First Name is required</div>
                    )}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-wrap">
                    <label htmlFor="">Last Name</label>
                    <input
                      type="text"
                      onChange={this.handleChange}
                      name="last_name"
                      placeholder="Enter Your Last Name"
                    />
                    {submitted && !last_name && (
                      <div className="error">Last Name is required</div>
                    )}
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-wrap">
                    <label htmlFor="">Email</label>
                    <input
                      type="email"
                      onChange={this.handleChange}
                      name="email"
                      placeholder="Enter Your Email"
                    />
                    {submitted && !email && (
                      <div className="error">Email is required</div>
                    )}
                  </div>
                </div>
                <div className="col-md-12">
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
                </div>
                <div className="col-md-12">
                  <Button
                    buttonColor={color.brandColor}
                    textColor={color.whiteColor}
                    type="submit"
                    className="button full"
                  >
                    Signup
                  </Button>
                </div>
              </div>
            </form>
          </FormInput>
        </div>
        <div className="footer-info">
          Already have an account?
          <Link href="/login">
            <a> Login</a>
          </Link>
        </div>
      </Wrap>
    );
  }
}

const mapStateToProps = state => ({
  error: state.signup.error
});

export default connect(
  mapStateToProps,
  { signupRequest }
)(Signup);
