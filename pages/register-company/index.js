import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
// import { Loader } from "semantic-ui-react";
import isValidEmail from "sane-email-validation";

import Wrap from "../../components/FormWrap";
import { connect } from "react-redux";
import { createCompanyRequest } from "../../modules/company";
import FormInput from "../../components/styles/FormInput";
import Button from "../../components/styles/Button";
import { color } from "../../components/styles/constant";

const createRenderer = render => ({ input, meta, label, type, ...rest }) => (
  <div className="form-wrap">
    <label>{label}</label>
    {render(input, rest, type)}
    {meta.error && meta.touched && <div className="error">{meta.error}</div>}
  </div>
);

const RenderInput = createRenderer(input => <input {...input} type="text" />);

const validate = values => {
  const errors = {};

  if (!values.company_name) {
    errors.company_name = "Company name is required";
  }

  return errors;
};

const Register = ({ handleSubmit, createCompanyRequest, loading }) => (
  <Wrap>
    <div className="caption">Create your company</div>
    <div className="wrap">
      <div className="login-wrap">
        <FormInput>
          <form onSubmit={handleSubmit(x => createCompanyRequest(x))}>
            <div className="row">
              <Field
                label="Company Name"
                name="company_name"
                component={RenderInput}
                placeholder="Enter company name"
              />
              <div className="col-md-12">
                <Button
                  buttonColor={color.brandColor}
                  textColor={color.whiteColor}
                  type="submit"
                  className="button full"
                >
                  {"Submit"}
                </Button>
              </div>
            </div>
          </form>
        </FormInput>
      </div>
    </div>
  </Wrap>
);

const RegisterCompanyPage = reduxForm({
  form: "signup",
  validate
})(Register);

const mapStateToProps = state => ({
  loading: state.company.loading
});

export default connect(
  mapStateToProps,
  { createCompanyRequest }
)(RegisterCompanyPage);
