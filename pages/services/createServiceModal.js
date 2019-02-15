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

class CreateServiceModal extends Component {
  render() {
    const {
      name,
      description,
      group,
      staff,
      duration,
      submitted,
      openCreateService
    } = this.props.modalState;
    let Color;
    return (
      <Modal open={openCreateService} onClose={this.props.onCloseModal}>
        <ModalWrap>
          <div className="title">{this.props.title}</div>
          <FormInput>
            <form onSubmit={this.props.handleSubmit}>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-wrap">
                    <label htmlFor="">Group</label>
                    <select name="group" onChange={this.props.handleChange}>
                      <option>---- Select Group ----</option>
                      {this.props.serviceGroup
                        ? this.props.serviceGroup.map(x => (
                            <option key={x.id} value={x.id}>
                              {x.name}
                            </option>
                          ))
                        : null}
                    </select>
                    {submitted && !group && (
                      <div className="error">Group is required</div>
                    )}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-wrap">
                    <label htmlFor="">Duration</label>
                    <select name="duration" onChange={this.props.handleChange}>
                      <option>---- Select Duration ----</option>
                      <option value="15">15 minute</option>
                      <option value="30">30 minute</option>
                      <option value="45">45 minute</option>
                      <option value="60">1 day</option>
                      <option value="75">75 minute</option>
                      <option value="90">90 minute</option>
                      <option value="105">105 minute</option>
                      <option value="120">2 days</option>
                    </select>
                    {submitted && !duration && (
                      <div className="error">Duration is required</div>
                    )}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-wrap">
                    <label htmlFor="">Service Name</label>
                    <input
                      type="text"
                      name="name"
                      onChange={this.props.handleChange}
                      placeholder="Enter Name"
                    />
                    {submitted && !name && (
                      <div className="error">Service Name is required</div>
                    )}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-wrap">
                    <label htmlFor="">Staff</label>
                    <select name="staff" onChange={this.props.handleChange}>
                      <option value="">---- Select Staff ----</option>
                      {this.props.staff
                        ? this.props.staff.map(x => (
                            <option key={x.id} value={`${x.id}`}>
                              {`${x.first_name} ${x.last_name}`}
                            </option>
                          ))
                        : null}
                    </select>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-wrap">
                    <label htmlFor="">Description</label>
                    <textarea
                      name="description"
                      onChange={this.props.handleChange}
                      placeholder="Enter Description"
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
                  {this.props.loading ? "Loading...." : "Create Service"}
                </Button>
              </footer>
            </form>
          </FormInput>
        </ModalWrap>
      </Modal>
    );
  }
}

export default CreateServiceModal;
