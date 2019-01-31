// This is the Signup page

import React, { Component } from "react";
import Link from "next/link";
import Wrap from "../../components/FormWrap";
import FormInput from "../../components/styles/FormInput";
import Button from "../../components/styles/Button";
import { color } from "../../components/styles/constant";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companyName: "",
      businessType: "",
      submitted: false
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    const { companyName, businessType } = this.state;
    this.setState({ submitted: true });
    const data = {
      companyName: this.state.companyName,
      businessType: this.state.businessType
    };
    if (companyName && businessType) {
      console.log(data);
    }
    e.currentTarget.reset();
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  render() {
    const { companyName, businessType, submitted } = this.state;
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
                      name="companyName"
                    />
                    {submitted && !companyName && (
                      <div className="error">Company Name is required</div>
                    )}
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-wrap">
                    <label htmlFor="">Business type</label>
                    <select name="businessType" onChange={this.handleChange}>
                      <option disabled="" value="">
                        Select business type
                      </option>
                      <option value="1">Other</option>
                      <option value="2">Hair Salon</option>
                      <option value="3">Nail Salon</option>
                      <option value="4">Beauty Salon</option>
                      <option value="5">Skin Clinic</option>
                      <option value="6">Tanning Salon</option>
                      <option value="7">Waxing Salon</option>
                      <option value="8">Spa</option>
                      <option value="9">Massage Therapy</option>
                      <option value="10">Barbershop</option>
                      <option value="11">Brow Bar</option>
                      <option value="12">Chiropractic Clinic</option>
                      <option value="13">Dental Clinic</option>
                      <option value="14">Gym &amp; Fitness</option>
                      <option value="15">Health Club</option>
                      <option value="16">Makeup Studio</option>
                      <option value="17">Mobile Therapy</option>
                      <option value="18">Nutrition &amp; Weight Loss</option>
                      <option value="19">Pilates Studio</option>
                      <option value="20">Yoga Studio</option>
                    </select>
                    {submitted && !businessType && (
                      <div className="error">Business Type is required</div>
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
                    Submit
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

export default Register;
