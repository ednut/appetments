import React, { Component } from "react";
import Modal from "react-responsive-modal";
import FormInput from "../../components/styles/FormInput";
import Button from "../../components/styles/Button";
import { shadowStyle, color, height } from "../../components/styles/constant";
import styled from "styled-components";
import FormWrap from "../../components/styles/FormWrap";
import { Row, Col } from "antd";

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

class CreatePetModal extends Component {
  render() {
    const {
      first_name,
      last_name,
      email,
      password,
      submitted,
      openCreatePet
    } = this.props.modalState;
    return (
      <Modal open={openCreatePet} onClose={this.props.onCloseModal}>
        <ModalWrap>
          <div className="title">{this.props.title}</div>
          <FormInput>
            <form onSubmit={this.props.handleSubmit}>
              <Row gutter={16}>
                <Col span={12}>
                  <FormWrap>
                    <label htmlFor="">First Name</label>
                    <input
                      type="text"
                      onChange={this.props.handleChange}
                      name="first_name"
                      placeholder="Enter your first name"
                    />
                    {submitted && !first_name && (
                      <div className="error">First name is required</div>
                    )}
                  </FormWrap>
                </Col>
                <Col span={12}>
                  <FormWrap>
                    <label htmlFor="">Last Name</label>
                    <input
                      type="text"
                      name="last_name"
                      onChange={this.props.handleChange}
                      placeholder="Enter your last name"
                    />
                    {submitted && !last_name && (
                      <div className="error">Last name is required</div>
                    )}
                  </FormWrap>
                </Col>
                <Col span={12}>
                  <FormWrap>
                    <label htmlFor="">Email</label>
                    <input
                      type="email"
                      name="email"
                      onChange={this.props.handleChange}
                      placeholder="Enter your email"
                    />
                    {submitted && !email && (
                      <div className="error">Email is required</div>
                    )}
                  </FormWrap>
                </Col>
                <Col span={12}>
                  <FormWrap>
                    <label htmlFor="">Password</label>
                    <input
                      type="password"
                      name="password"
                      onChange={this.props.handleChange}
                      placeholder="Enter your password"
                    />
                    {submitted && !password && (
                      <div className="error">Password is required</div>
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
                  {this.props.loading ? "Loading...." : "Create Pet"}
                </Button>
              </footer>
            </form>
          </FormInput>
        </ModalWrap>
      </Modal>
    );
  }
}

export default CreatePetModal;
