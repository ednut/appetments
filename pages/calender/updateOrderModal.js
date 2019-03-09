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

class UpdateStaffModal extends Component {
  render() {
    const {
      customer,
      start_time,
      status,
      services,
      products,
      submitted,
      openUpdateOrder
    } = this.props.modalState;
    return (
      <Modal open={openUpdateOrder} onClose={this.props.onCloseModal}>
        <ModalWrap>
          <div className="title">{this.props.title}</div>
          <FormInput>
            <form onSubmit={this.props.handleSubmit}>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-wrap">
                    <label htmlFor="">Select Customer</label>
                    <select
                      name="customer"
                      value={customer}
                      onChange={this.props.handleChange}
                    >
                      <option value="">--- select an option ---</option>
                    </select>
                    {submitted && !customer && (
                      <div className="error">Customer is required</div>
                    )}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-wrap">
                    <label htmlFor="">Start Time</label>
                    <input
                      type="text"
                      name="start_time"
                      value={start_time}
                      onChange={this.props.handleChange}
                      placeholder="Enter your start time"
                    />
                    {submitted && !start_time && (
                      <div className="error">Start time is required</div>
                    )}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-wrap">
                    <label htmlFor="">Update Status</label>
                    <select
                      name="status"
                      value={status}
                      onChange={this.props.handleChange}
                    >
                      <option value="">--- select a status ---</option>
                    </select>
                    {submitted && !status && (
                      <div className="error">Status is required</div>
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
                  {this.props.loading ? "Loading...." : "Create Order"}
                </Button>
              </footer>
            </form>
          </FormInput>
        </ModalWrap>
      </Modal>
    );
  }
}

export default UpdateStaffModal;
