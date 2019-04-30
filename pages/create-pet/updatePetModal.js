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

class UpdatePetModal extends Component {
  render() {
    const {
      first_name,
      last_name,
      submitted,
      openUpdatePet
    } = this.props.modalState;
    return (
      <Modal open={openUpdatePet} onClose={this.props.onCloseModal}>
        <ModalWrap>
          <div className="title">{this.props.title}</div>
          <FormInput>
            <form onSubmit={this.props.handleSubmit}>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-wrap">
                    <label htmlFor="">First Name</label>
                    <input
                      type="text"
                      onChange={this.props.handleChange}
                      name="first_name"
                      value={first_name}
                      placeholder="Enter your first name"
                    />
                    {submitted && !first_name && (
                      <div className="error">First name is required</div>
                    )}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-wrap">
                    <label htmlFor="">Last Name</label>
                    <input
                      type="text"
                      name="last_name"
                      value={last_name}
                      onChange={this.props.handleChange}
                      placeholder="Enter your last name"
                    />
                    {submitted && !last_name && (
                      <div className="error">Last name is required</div>
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
                  {this.props.loading ? "Loading...." : "Update Pet"}
                </Button>
              </footer>
            </form>
          </FormInput>
        </ModalWrap>
      </Modal>
    );
  }
}

export default UpdatePetModal;
