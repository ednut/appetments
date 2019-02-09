import React, { Component } from "react";
import Modal from "react-responsive-modal";
import FormInput from "../../components/styles/FormInput";
import Button from "../../components/styles/Button";
import { color } from "../../components/styles/constant";
import styled from "styled-components";

const ModalWrap = styled.div`
  width: 55rem;
  padding: 0 2rem;
  height: auto;
  .title {
    height: 5rem;
    font-size: 2.5rem;
    margin-bottom: 2rem;
    font-weight: 200;
    border-bottom: 1px solid ${color.borderColor};
  }
  footer {
    height: 5rem;
    width: 100%;
  }
`;

class CreateLocationModal extends Component {
  render() {
    const {
      location_name,
      contact_number,
      contact_email,
      address,
      city,
      state,
      submitted,
      openCreateLocation
    } = this.props.modalState;
    return (
      <Modal open={openCreateLocation} onClose={this.props.onCloseModal}>
        <ModalWrap>
          <div className="title">{this.props.title}</div>
          <FormInput>
            <form onSubmit={this.props.handleSubmit}>
              <div className="row">
                <div className="col-md-12">
                  <div className="form-wrap">
                    <label htmlFor="">Location Name</label>
                    <input
                      type="text"
                      onChange={this.props.handleChange}
                      name="location_name"
                      placeholder="Enter Your First Name"
                    />
                    {submitted && !location_name && (
                      <div className="error">Location name is required</div>
                    )}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-wrap">
                    <label htmlFor="">Contact number</label>
                    <input
                      type="text"
                      name="contact_number"
                      onChange={this.props.handleChange}
                      placeholder="Enter Your Last Name"
                    />
                    {submitted && !contact_number && (
                      <div className="error">Contact number is required</div>
                    )}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-wrap">
                    <label htmlFor="">Contact Email</label>
                    <input
                      type="email"
                      name="contact_email"
                      onChange={this.props.handleChange}
                      placeholder="Enter Your email"
                    />
                    {submitted && !contact_email && (
                      <div className="error">email is required</div>
                    )}
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-wrap">
                    <label htmlFor="">Address</label>
                    <textarea
                      name="address"
                      onChange={this.props.handleChange}
                      placeholder="Enter Your address"
                    />
                    {submitted && !address && (
                      <div className="error">address is required</div>
                    )}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-wrap">
                    <label htmlFor="">City</label>
                    <input
                      type="text"
                      name="city"
                      onChange={this.props.handleChange}
                      placeholder="Enter Your city"
                    />
                    {submitted && !city && (
                      <div className="error">city is required</div>
                    )}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-wrap">
                    <label htmlFor="">State</label>
                    <input
                      type="text"
                      name="state"
                      onChange={this.props.handleChange}
                      placeholder="Enter Your state"
                    />
                    {submitted && !state && (
                      <div className="error">state is required</div>
                    )}
                  </div>
                </div>
              </div>

              <footer>
                <Button
                  buttonColor={color.brandColor}
                  textColor={color.whiteColor}
                  type="submit"
                  className="float-right"
                >
                  {" "}
                  {this.props.loading ? "Loading...." : "Create Location"}
                </Button>
              </footer>
            </form>
          </FormInput>
        </ModalWrap>
      </Modal>
    );
  }
}

export default CreateLocationModal;
