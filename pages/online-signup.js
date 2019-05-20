import React, { Component } from "react";
import OnlineBookingWrapper from "../components/OnlineBookingWrapper";
import { Row, Col, Form, Input, Icon } from "antd";
import { connect } from "react-redux";
import Cookies from "js-cookie";
import {
  customerLoginRequest,
  customerSignupRequest
} from "../modules/clientModule";
import SpinerWrap from "../components/Spinner";
import FormInput from "../components/styles/FormInput";
import FormWrap from "../components/styles/FormWrap";
import Button from "../components/styles/Button";
import { color } from "../components/styles/constant";
import Router from "next/router";

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class PageContent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.form.validateFields();
  }

  moveToNext = () => {
    // this.props.customerSignupRequest({ company: Cookies.get("companyID") });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let data = {
          ...values,
          company: Cookies.get("companyID")
        };
        console.log(data);
        this.props.customerSignupRequest(data);
        // Cookies.set("CustomerID", values.customer_code);
      }
    });
  };
  render() {
    function goBack() {
      Router.back();
    }
    const {
      getFieldDecorator,
      getFieldsError,
      getFieldError,
      isFieldTouched
    } = this.props.form;

    const first_name =
      isFieldTouched("first_name") && getFieldError("first_name");
    const last_name = isFieldTouched("last_name") && getFieldError("last_name");
    const email = isFieldTouched("email") && getFieldError("email");
    const phone_number =
      isFieldTouched("phone_number") && getFieldError("phone_number");
    return (
      <OnlineBookingWrapper>
        <div className="header">
          {" "}
          <Icon onClick={goBack} type="left" /> Online Booking
        </div>
        {this.props.loading === true ? <SpinerWrap /> : null}
        <div className="container mtop-10">
          <div className="row">
            <div className="col-md-12" />
            <div className="col-md-8 offset-md-2">
              <FormInput>
                <Form onSubmit={this.handleSubmit}>
                  <div className="row">
                    <div className="col-md-6">
                      <FormWrap>
                        <Form.Item
                          validateStatus={first_name ? "error" : ""}
                          help={first_name || ""}
                          label="First name"
                        >
                          {getFieldDecorator("first_name", {
                            rules: [
                              {
                                required: true,
                                message: "First name is required"
                              }
                            ]
                          })(
                            <Input type="text" placeholder="Enter First name" />
                          )}
                        </Form.Item>
                      </FormWrap>
                    </div>
                    <div className="col-md-6">
                      <FormWrap>
                        <Form.Item
                          validateStatus={last_name ? "error" : ""}
                          help={last_name || ""}
                          label="Last name"
                        >
                          {getFieldDecorator("last_name", {
                            rules: [
                              {
                                required: true,
                                message: "Last name is required"
                              }
                            ]
                          })(
                            <Input type="text" placeholder="Enter last name" />
                          )}
                        </Form.Item>
                      </FormWrap>
                    </div>
                    <div className="col-md-6">
                      <FormWrap>
                        <Form.Item
                          validateStatus={email ? "error" : ""}
                          help={email || ""}
                          label="Email"
                        >
                          {getFieldDecorator("email", {
                            rules: [
                              {
                                required: true,
                                message: "Email is required"
                              }
                            ]
                          })(<Input type="text" placeholder="Enter email" />)}
                        </Form.Item>
                      </FormWrap>
                    </div>
                    <div className="col-md-6">
                      <FormWrap>
                        <Form.Item
                          validateStatus={phone_number ? "error" : ""}
                          help={phone_number || ""}
                          label="Phone number"
                        >
                          {getFieldDecorator("phone_number", {
                            rules: [
                              {
                                required: true,
                                message: "Phone number is required"
                              }
                            ]
                          })(
                            <Input
                              type="text"
                              placeholder="Enter phone number"
                            />
                          )}
                        </Form.Item>
                      </FormWrap>
                    </div>
                  </div>
                  <br />

                  <Button
                    buttonColor={color.brandColor}
                    buttonHover={color.brandColor}
                    textColor={color.whiteColor}
                    disabled={hasErrors(getFieldsError())}
                    type="submit"
                    className="button full"
                  >
                    Submit
                  </Button>
                </Form>
              </FormInput>
            </div>
          </div>
        </div>
        {/* <footer>
          <div className="selected-info-wrap" />
          <button onClick={this.moveToNext}>Continue as a new user</button>
        </footer> */}
      </OnlineBookingWrapper>
    );
  }
}

const VerifyUserForm = Form.create({ name: "veryfy_user" })(PageContent);

const mapStateToProps = state => ({
  data: state.clientReducer.clientData,
  loading: state.clientReducer.loadingClient
});

export default connect(
  mapStateToProps,
  {
    customerLoginRequest,
    customerSignupRequest
  }
)(VerifyUserForm);
