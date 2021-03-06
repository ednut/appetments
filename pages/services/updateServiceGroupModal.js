import React, { Component } from "react";
import Modal from "react-responsive-modal";
import FormInput from "../../components/styles/FormInput";
import Button from "../../components/styles/Button";
import { shadowStyle, color, height } from "../../components/styles/constant";
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

class UpdateServiceGroupModal extends Component {
  render() {
    const {
      name,
      description,
      appointment_color,
      submitted,
      openUpdateServiceGroup
    } = this.props.modalState;
    return (
      <Modal open={openUpdateServiceGroup} onClose={this.props.onCloseModal}>
        <ModalWrap>
          <div className="title">{this.props.title}</div>
          <FormInput>
            <form onSubmit={this.props.handleSubmit}>
              <Row>
                <Col span={12}>
                  <FormWrap>
                    <label htmlFor="">Appointment Color</label>
                    <select
                      name="appointment_color"
                      value={appointment_color}
                      onChange={this.props.handleChange}
                      placeholder="Select your appointment color"
                    >
                      <option value="">--- Select a color ---</option>
                      <option value="silver">Silver</option>
                      <option value="grey">Grey</option>
                      <option value="olive">Olive</option>
                      <option value="maroon">Maroon</option>
                      <option value="lime">Lime</option>
                      <option value="green">Green</option>
                      <option value="aqua">Aqua</option>
                      <option value="teal">Teal</option>
                      <option value="blue">Blue</option>
                      <option value="navy">Navy</option>
                      <option value="fuchsia">Fuchsia</option>
                      <option value="purple">Purple</option>
                    </select>
                    {submitted && !appointment_color && (
                      <div className="error">Appointment color is required</div>
                    )}
                  </FormWrap>
                </Col>
                <Col span={12}>
                  <FormWrap>
                    <label htmlFor="">Service Group Name</label>
                    <input
                      type="text"
                      name="name"
                      value={name}
                      onChange={this.props.handleChange}
                      placeholder="Enter group name"
                    />
                    {submitted && !name && (
                      <div className="error">
                        Service group name is required
                      </div>
                    )}
                  </FormWrap>
                </Col>
                <Col span={24}>
                  <FormWrap>
                    <label htmlFor="">Description</label>
                    <textarea
                      name="description"
                      value={description}
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
                  {this.props.loading ? "Loading...." : "Update Service Group"}
                </Button>
              </footer>
            </form>
          </FormInput>
        </ModalWrap>
      </Modal>
    );
  }
}

export default UpdateServiceGroupModal;
