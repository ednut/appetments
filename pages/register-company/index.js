// This is the Signup page

import React, { Component } from "react";
import Wrap from "../../components/FormWrap";
import { connect } from "react-redux";
import { createCompanyRequest } from "../../modules/company";
import FormInput from "../../components/styles/FormInput";
import Button from "../../components/styles/Button";
import { color } from "../../components/styles/constant";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      company_name: "",
      submitted: false
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    const { company_name } = this.state;
    this.setState({ submitted: true });
    const data = {
      company_name: this.state.company_name
    };
    if (company_name) {
      console.log(data);
      this.props.createCompanyRequest(data);
    }
    e.currentTarget.reset();
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  render() {
    const { company_name, submitted } = this.state;
    return (
      <Wrap>
        <div className="caption">Create your company</div>
        <div className="login-wrap">
          <FormInput>
            <form onSubmit={this.handleSubmit}>
              <div className="row">
                <div className="col-md-12">
                  <div className="form-wrap">
                    <label htmlFor="">Company Name</label>
                    <input
                      type="text"
                      onChange={this.handleChange}
                      placeholder="Enter Your Company Name"
                      name="company_name"
                    />
                    {submitted && !company_name && (
                      <div className="error">Company Name is required</div>
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
                    {this.props.loading ? "Loading...." : "Submit"}
                  </Button>
                </div>
              </div>
            </form>
          </FormInput>
        </div>
      </Wrap>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.company.loading
});

export default connect(
  mapStateToProps,
  { createCompanyRequest }
)(Register);
