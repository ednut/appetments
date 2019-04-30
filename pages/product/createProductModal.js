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

class CreateProductModal extends Component {
  render() {
    const {
      category,
      barcode,
      name,
      sku,
      retail_price,
      description,
      submitted,
      openCreateProduct
    } = this.props.modalState;
    {
    }
    return (
      <Modal open={openCreateProduct} onClose={this.props.onCloseModal}>
        <ModalWrap>
          <div className="title">{this.props.title}</div>
          <FormInput>
            <form onSubmit={this.props.handleSubmit}>
              <Row gutter={16}>
                <Col span={12}>
                  <FormWrap>
                    <label htmlFor="">Product Name</label>
                    <input
                      type="text"
                      onChange={this.props.handleChange}
                      name="name"
                      placeholder="Enter product name"
                    />
                    {submitted && !name && (
                      <div className="error">Product name is required</div>
                    )}
                  </FormWrap>
                </Col>

                <Col span={12}>
                  <FormWrap>
                    <label htmlFor="">Category</label>
                    <select name="category" onChange={this.props.handleChange}>
                      <option>---- Select Category ----</option>
                      {this.props.categories
                        ? this.props.categories.map(x => (
                            <option key={x.id} value={x.id}>
                              {x.category_name}
                            </option>
                          ))
                        : null}
                    </select>
                    {submitted && !category && (
                      <div className="error">Category is required</div>
                    )}
                  </FormWrap>
                </Col>

                <Col span={8}>
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

                <Col span={8}>
                  <FormWrap>
                    <label htmlFor="">SKU</label>
                    <input
                      type="text"
                      onChange={this.props.handleChange}
                      name="sku"
                      placeholder="Enter SKU"
                    />
                    {submitted && !sku && (
                      <div className="error">SKU is required</div>
                    )}
                  </FormWrap>
                </Col>

                <Col span={8}>
                  <FormWrap>
                    <label htmlFor="">Retail price</label>
                    <input
                      type="text"
                      onChange={this.props.handleChange}
                      name="retail_price"
                      placeholder="Enter retail price"
                    />
                    {submitted && !retail_price && (
                      <div className="error">Retail price is required</div>
                    )}
                  </FormWrap>
                </Col>

                <Col span={24}>
                  <FormWrap>
                    <label htmlFor="">Product Description</label>
                    <textarea
                      name="description"
                      onChange={this.props.handleChange}
                      placeholder="Enter product description"
                    />
                    {submitted && !description && (
                      <div className="error">
                        Product description is required
                      </div>
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
                  {this.props.loading ? "Loading...." : "Create Product"}
                </Button>
              </footer>
            </form>
          </FormInput>
        </ModalWrap>
      </Modal>
    );
  }
}

export default CreateProductModal;
