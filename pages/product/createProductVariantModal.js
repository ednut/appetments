import React, { Component } from "react";
import Modal from "react-responsive-modal";
import FormInput from "../../components/styles/FormInput";
import Button from "../../components/styles/Button";
import { color } from "../../components/styles/constant";
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

class CreateProductVariantModal extends Component {
  render() {
    const {
      // name,
      // barcode,
      // sku,
      // quantity,
      // retail_price,
      submitted
    } = this.props.modalState.variant;
    return (
      <Modal
        open={this.props.modalState.openCreateProductVariant}
        onClose={this.props.onCloseModal}
      >
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
                      onChange={this.props.handleChange}
                      name="name"
                      placeholder="Enter name"
                    />
                    {submitted && !name && (
                      <div className="error">Name is required</div>
                    )}
                  </FormWrap>
                </Col>
                <Col span={12}>
                  <FormWrap>
                    <label htmlFor="">Barcode</label>
                    <input
                      type="text"
                      onChange={this.props.handleChange}
                      name="barcode"
                      placeholder="Enter barcode"
                    />
                    {submitted && !barcode && (
                      <div className="error">Barcode is required</div>
                    )}
                  </FormWrap>
                </Col>
                <Col span={12}>
                  <FormWrap>
                    <label htmlFor="">SKU</label>
                    <input
                      type="name"
                      onChange={this.props.handleChange}
                      name="sku"
                      placeholder="Enter SKU"
                    />
                    {submitted && !sku && (
                      <div className="error">SKU is required</div>
                    )}
                  </FormWrap>
                </Col>
                <Col span={12}>
                  <FormWrap>
                    <label htmlFor="">Quantity</label>
                    <input
                      type="number"
                      onChange={this.props.handleChange}
                      name="quantity"
                      placeholder="Enter quantity"
                    />
                    {submitted && !quantity && (
                      <div className="error">Quantity is required</div>
                    )}
                  </FormWrap>
                </Col>
                <Col span={12}>
                  <FormWrap>
                    <label htmlFor="">Retail Price</label>
                    <input
                      type="number"
                      name="retail_price"
                      onChange={this.props.handleChange}
                      placeholder="Enter retail price"
                    />
                    {submitted && !retail_price && (
                      <div className="error">Retail price is required</div>
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
                  {this.props.loading
                    ? "Loading...."
                    : "Create Product Variant"}
                </Button>
              </footer>
            </form>
          </FormInput>
        </ModalWrap>
      </Modal>
    );
  }
}

export default CreateProductVariantModal;
