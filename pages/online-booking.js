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
    Router.push("/online-signup");
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(values);
        this.props.customerLoginRequest(values);
        Cookies.set("CustomerID", values.customer_code);
      }
    });
  };
  render() {
    const {
      getFieldDecorator,
      getFieldsError,
      getFieldError,
      isFieldTouched
    } = this.props.form;

    const codeError = isFieldTouched("code") && getFieldError("code");
    return (
      <OnlineBookingWrapper>
        <div className="header"> Online Booking</div>
        {this.props.loading === true ? <SpinerWrap /> : null}
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="page-title">
                Enter your code if you're an existing user
              </div>
            </div>
            <div className="col-md-8 offset-md-2">
              <FormInput>
                <Form onSubmit={this.handleSubmit}>
                  <FormWrap>
                    <Form.Item
                      validateStatus={codeError ? "error" : ""}
                      help={codeError || ""}
                      label="Enter your code"
                    >
                      {getFieldDecorator("customer_code", {
                        rules: [
                          {
                            required: false,
                            message: "Please input your code!"
                          }
                        ]
                      })(<Input type="text" placeholder="Enter code" />)}
                    </Form.Item>
                  </FormWrap>
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
        <footer>
          <div className="selected-info-wrap" />
          <button onClick={this.moveToNext}>Continue as a new user</button>
        </footer>
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
