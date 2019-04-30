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
  }
`;

class UpdatePetCateoryModal extends Component {
  render() {
    const { name, submitted, openUpdatePetCategory } = this.props.modalState;
    return (
      <Modal open={openUpdatePetCategory} onClose={this.props.onCloseModal}>
        <ModalWrap>
          <div className="title">{this.props.title}</div>
          <FormInput>
            <form onSubmit={this.props.handleSubmit}>
              <Row>
                <Col span={24}>
                  <FormWrap>
                    <label htmlFor="">Category Name</label>
                    <input
                      type="text"
                      name="name"
                      value={name}
                      onChange={this.props.handleChange}
                      placeholder="Enter your last name"
                    />
                    {submitted && !name && (
                      <div className="error">Category name is required</div>
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
                  {this.props.loading ? "Loading...." : "Update Pet Cateory"}
                </Button>
              </footer>
            </form>
          </FormInput>
        </ModalWrap>
      </Modal>
    );
  }
}

export default UpdatePetCateoryModal;
