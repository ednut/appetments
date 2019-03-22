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

class UpdateCompanyModal extends Component {
  render() {
    const {
      company_name,
      description,
      website,
      contact_number,
      submitted,
      openUpdateCompany
    } = this.props.modalState;
    return (
      <Modal open={openUpdateCompany} onClose={this.props.onCloseModal}>
        <ModalWrap>
          <div className="title">{this.props.title}</div>
          <FormInput>
            <form onSubmit={this.props.handleSubmit}>
              <div className="row">
                <div className="col-md-12">
                  <div className="form-wrap">
                    <label htmlFor="">Company Name</label>
                    <input
                      type="text"
                      name="company_name"
                      value={company_name || ""}
                      onChange={this.props.handleChange}
                      placeholder="Enter your company name"
                    />
                    {submitted && !company_name && (
                      <div className="error">Company name is required</div>
                    )}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-wrap">
                    <label htmlFor="">Company Website</label>
                    <input
                      type="text"
                      name="website"
                      value={website || ""}
                      onChange={this.props.handleChange}
                      placeholder="Enter your website"
                    />
                    {submitted && !website && (
                      <div className="error">Website is required</div>
                    )}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-wrap">
                    <label htmlFor="">Contact Number</label>
                    <input
                      type="text"
                      name="contact_number"
                      value={contact_number || ""}
                      onChange={this.props.handleChange}
                      placeholder="Enter your contact number"
                    />
                    {submitted && !contact_number && (
                      <div className="error">Contact number is required</div>
                    )}
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-wrap">
                    <label htmlFor="">Description</label>
                    <textarea
                      name="description"
                      value={description || ""}
                      onChange={this.props.handleChange}
                      placeholder="Enter description"
                    />
                    {submitted && !description && (
                      <div className="error">Description is required</div>
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
                  {this.props.loading ? "Loading...." : "Update Company"}
                </Button>
              </footer>
            </form>
          </FormInput>
        </ModalWrap>
      </Modal>
    );
  }
}

export default UpdateCompanyModal;
