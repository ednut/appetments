import React, { Component } from "react";
import Modal from "react-responsive-modal";
import FormInput from "../../components/styles/FormInput";
import Button from "../../components/styles/Button";
import { color } from "../../components/styles/constant";
import styled from "styled-components";
import FormWrap from "../../components/styles/FormWrap";
import { Row, Col, Select } from "antd";

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

class UpdatePetToClient extends Component {
  render() {
    const { name, category, submitted, openUpdatePet } = this.props.modalState;
    console.log(category);
    return (
      <Modal open={openUpdatePet} onClose={this.props.onCloseModal}>
        <ModalWrap>
          <div className="title">{this.props.title}</div>
          <FormInput>
            <form onSubmit={this.props.handleSubmit}>
              <Row gutter={16}>
                <Col span={24}>
                  <FormWrap>
                    <label htmlFor="">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={name}
                      placeholder="Enter your name"
                      onChange={this.props.handleChange}
                    />
                    {submitted && !name && (
                      <div className="error">Name is required</div>
                    )}
                  </FormWrap>
                </Col>
                <Col span={24}>
                  <FormWrap>
                    <label htmlFor="">Pet category</label>
                    <Select
                      onChange={this.handleChange}
                      placeholder="Select pet category"
                      name="category"
                      defaultValue={category.category_name}
                    >
                      {this.props.categories &&
                        this.props.categories.map(x => (
                          <Option key={x.id} value={x.id}>
                            {x.name}
                          </Option>
                        ))}
                    </Select>
                    {submitted && !category && (
                      <div className="error">Pet category is required</div>
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
                  {this.props.loading ? "Loading...." : "Save Pet"}
                </Button>
              </footer>
            </form>
          </FormInput>
        </ModalWrap>
      </Modal>
    );
  }
}

export default UpdatePetToClient;
