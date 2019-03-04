import React, { Component } from "react";
import Modal from "react-responsive-modal";
import FormInput from "../../components/styles/FormInput";
import Button from "../../components/styles/Button";
import { shadowStyle, color, height } from "../../components/styles/constant";
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

class UpdateLocationModal extends Component {
  render() {
    const {
      location_name,
      contact_number,
      contact_email,
      address,
      city,
      state,
      zip_code,
      submitted,
      openUpdateLocation
    } = this.props.modalState;
    return (
      <Modal open={openUpdateLocation} onClose={this.props.onCloseModal}>
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
                      value={location_name}
                      name="location_name"
                      placeholder="Enter your location name"
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
                      value={contact_number}
                      onChange={this.props.handleChange}
                      placeholder="Enter your contact number"
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
                      value={contact_email}
                      onChange={this.props.handleChange}
                      placeholder="Enter your contact email"
                    />
                    {submitted && !contact_email && (
                      <div className="error">Email is required</div>
                    )}
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-wrap">
                    <label htmlFor="">Address</label>
                    <textarea
                      name="address"
                      value={address}
                      onChange={this.props.handleChange}
                      placeholder="Enter your address"
                    />
                    {submitted && !address && (
                      <div className="error">Address is required</div>
                    )}
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-wrap">
                    <label htmlFor="">Zip code</label>
                    <input
                      type="text"
                      name="zip_code"
                      value={zip_code}
                      onChange={this.props.handleChange}
                      placeholder="Enter your zip code"
                    />
                    {submitted && !zip_code && (
                      <div className="error">Zip code is required</div>
                    )}
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-wrap">
                    <label htmlFor="">City</label>
                    <input
                      type="text"
                      name="city"
                      value={city}
                      onChange={this.props.handleChange}
                      placeholder="Enter your city"
                    />
                    {submitted && !city && (
                      <div className="error">City is required</div>
                    )}
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-wrap">
                    <label htmlFor="">State</label>
                    <input
                      type="text"
                      name="state"
                      value={state}
                      onChange={this.props.handleChange}
                      placeholder="Enter your state"
                    />
                    {submitted && !state && (
                      <div className="error">State is required</div>
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
                  {this.props.loading ? "Loading...." : "Update Location"}
                </Button>
              </footer>
            </form>
          </FormInput>
        </ModalWrap>
      </Modal>
    );
  }
}

export default UpdateLocationModal;
