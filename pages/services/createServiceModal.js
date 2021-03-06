import React, { Component } from "react";
import Modal from "react-responsive-modal";
import FormInput from "../../components/styles/FormInput";
import Button from "../../components/styles/Button";
import { color } from "../../components/styles/constant";
import styled from "styled-components";
import { Row, Col } from "antd";
import FormWrap from "../../components/styles/FormWrap";

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
    button {
      float: right;
    }
  }
`;

class CreateServiceModal extends Component {
  render() {
    const {
      name,
      description,
      group,
      staff,
      price,
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
              <Row gutter={16}>
                <Col span={24}>
                  <FormWrap>
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
                  </FormWrap>
                </Col>
                <Col span={12}>
                  <FormWrap>
                    <label htmlFor="">Duration</label>
                    <select name="duration" onChange={this.props.handleChange}>
                      <option>---- Select Duration ----</option>
                      <option value="15">15 minutes</option>
                      <option value="30">30 minutes</option>
                      <option value="45">45 minutes</option>
                      <option value="60">60 minutes</option>
                      <option value="75">75 minutes</option>
                      <option value="90">90 minutes</option>
                      <option value="105">105 minutes</option>
                      <option value="120">120 minutes</option>
                    </select>
                    {submitted && !duration && (
                      <div className="error">Duration is required</div>
                    )}
                  </FormWrap>
                </Col>
                <Col span={12}>
                  <FormWrap>
                    <label htmlFor="">Service Name</label>
                    <input
                      type="text"
                      name="name"
                      onChange={this.props.handleChange}
                      placeholder="Enter service name"
                    />
                    {submitted && !name && (
                      <div className="error">Service name is required</div>
                    )}
                  </FormWrap>
                </Col>
                <Col span={12}>
                  <FormWrap>
                    <label htmlFor="">Retail Price</label>
                    <input
                      type="number"
                      name="price"
                      onChange={this.props.handleChange}
                      placeholder="Enter retail price"
                    />
                    {submitted && !price && (
                      <div className="error">Price is required</div>
                    )}
                  </FormWrap>
                </Col>
                <Col span={12}>
                  <FormWrap>
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
                  </FormWrap>
                </Col>
                <Col span={24}>
                  <FormWrap>
                    <label htmlFor="">Description</label>
                    <textarea
                      name="description"
                      onChange={this.props.handleChange}
                      placeholder="Enter description"
                    />
                    {submitted && !description && (
                      <div className="error">Description is required</div>
                    )}
                  </FormWrap>
                </Col>
              </Row>

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
