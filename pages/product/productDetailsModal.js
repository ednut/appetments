import React, { Component } from "react";
import Modal from "react-responsive-modal";
import FormInput from "../../components/styles/FormInput";
import Button from "../../components/styles/Button";
import { color } from "../../components/styles/constant";
import styled from "styled-components";
import TableWrapper from "../../components/styles/TableWrap";

import FormWrap from "../../components/styles/FormWrap";
import { Row, Col } from "antd";

const ModalWrap = styled.div`
  width: 78rem;
  padding: 0 2rem;
  height: auto;
  position: relative;
  .title {
    height: 5rem;
    font-size: 2.5rem;
    margin-bottom: 2rem;
    font-weight: 200;
    border-bottom: 1px solid ${color.borderColor};
  }
  .cancel {
    display: block;
    float: right;
    cursor: pointer;
  }
  footer {
    height: 5rem;
    width: 100%;
    button {
      float: right;
    }
  }
  .loading-content {
    min-height: 10rem;
    line-height: 10rem;
    display: block;
    text-align: center;
    color: ${color.brandColor};
  }
  .page-content {
    position: relative;
    min-height: 10rem;
    .product-title {
      font-size: 3rem;
      line-height: 4rem;
    }
    .product-decription {
      font-size: 15px;
      color: #666;
    }
    .bder-right {
      border-right: 1px solid #efefef;
      margin-right: -1px;
    }
    .bder-left {
      border-left: 1px solid #efefef;
    }
    .form-title {
      font-weight: 600;
      font-size: 1.7rem;
      margin-bottom: 2rem;
    }
  }
  .variants {
    margin-top: 2rem;
    .variant-title {
      font-weight: 600;
      margin-bottom: 1rem;
    }
    .empty {
      text-align: center;
    }
  }
`;

class CreateProductVariantModal extends Component {
  variant_name = React.createRef();
  variant_quantity = React.createRef();
  variant_retail_price = React.createRef();

  handleEdit = e => {
    e.preventDefault();
    const editObj = {
      name: this.variant_name.current.value,
      quantity: this.variant_quantity.current.value,
      retail_price: this.variant_retail_price.current.value
    };
    // console.log(editObj);
    this.props.handleUpdateSubmit(editObj);
  };

  render() {
    const {
      name,
      barcode,
      sku,
      quantity,
      retail_price,
      submitted
    } = this.props.modalState.variant;

    if (this.props.product) {
      return (
        <Modal
          open={this.props.modalState.openProductDetails}
          onClose={this.props.onCloseModal}
        >
          <ModalWrap>
            <div className="title">{this.props.title}</div>
            {this.props.loading === true ? (
              <span className="loading-content">loading Content....</span>
            ) : (
              <div className="page-content">
                <Row gutter={8}>
                  <Col span={14} className="bder-right">
                    <div className="product-title">
                      {this.props.product && this.props.product.name}
                    </div>
                    <div className="product-decription">
                      {this.props.product && this.props.product.description}
                    </div>
                    <div className="variants">
                      <div className="variant-title">Variants</div>
                      <div className="variant-wrap">
                        <TableWrapper
                          style={{
                            overflow: "auto",
                            maxHeight: "25rem",
                            marginBottom: "2rem"
                          }}
                        >
                          <table>
                            <thead>
                              <tr>
                                <th>Name</th>
                                <th>Quantity</th>
                                <th>
                                  Retail Price(
                                  {this.props.product &&
                                    this.props.product.retail_price_currency}
                                  )
                                </th>
                                <th />
                              </tr>
                            </thead>
                            <tbody>
                              {this.props.product &&
                                this.props.product.variants.map(x => (
                                  <tr key={x.id}>
                                    <td style={{ width: "35%" }}>{x.name}</td>
                                    <td>{x.quantity}</td>
                                    <td>{x.retail_price}</td>
                                    <td className="more-options dropdown-toggle">
                                      <div className="dropdown">
                                        <span
                                          className="icon-more"
                                          data-toggle="dropdown"
                                          aria-haspopup="true"
                                          aria-expanded="false"
                                        >
                                          <i className="fas fa-ellipsis-h" />
                                        </span>
                                        <div className="dropdown-menu">
                                          <a
                                            className="dropdown-item"
                                            onClick={() => this.props.update(x)}
                                          >
                                            Edit
                                          </a>
                                          <a
                                            className="dropdown-item delete"
                                            onClick={() =>
                                              this.props.delete(x.id)
                                            }
                                          >
                                            Delete
                                          </a>
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                ))}
                            </tbody>
                          </table>
                        </TableWrapper>
                        {this.props.product.variants.length === 0 ? (
                          <div className="empty">No variant created</div>
                        ) : null}
                      </div>
                    </div>
                  </Col>
                  <Col span={10} className="bder-left">
                    {this.props.modalState.isCreateVariant ? (
                      <React.Fragment>
                        <div className="form-title">Add Product Variant</div>
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
                                  {/* {submitted && !name && (
                                <div className="error">Name is required</div>
                              )} */}
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
                                  {/* {submitted && !barcode && (
                                <div className="error">Barcode is required</div>
                              )} */}
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
                                  {/* {submitted && !sku && (
                                <div className="error">SKU is required</div>
                              )} */}
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
                                  {/* {submitted && !quantity && (
                                <div className="error">
                                  Quantity is required
                                </div>
                              )} */}
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
                                  {/* {submitted && !retail_price && (
                                <div className="error">
                                  Retail Price is required
                                </div>
                              )} */}
                                </FormWrap>
                              </Col>
                            </Row>
                            <footer>
                              <Button
                                buttonColor={color.brandColor}
                                textColor={color.whiteColor}
                                type="submit"
                                className="full"
                              >
                                {" "}
                                {this.props.loading ? "Loading...." : "Add"}
                              </Button>
                            </footer>
                          </form>
                        </FormInput>
                      </React.Fragment>
                    ) : null}
                    {this.props.modalState.isUpdateVariant ? (
                      <React.Fragment>
                        <div className="form-title">
                          Edit Product Variant{" "}
                          <span
                            onClick={this.props.closeEdit}
                            className="cancel"
                          >
                            <i className="fas fa-times" />
                          </span>
                        </div>
                        <FormInput>
                          <form onSubmit={this.handleEdit}>
                            <Row gutter={16}>
                              <Col span={24}>
                                <FormWrap>
                                  <label htmlFor="">Name</label>
                                  <input
                                    type="text"
                                    name="variant_name"
                                    ref={this.variant_name}
                                    defaultValue={this.props.modalState.name}
                                    placeholder="Enter name"
                                  />
                                  {/* {submitted && !name && (
                                <div className="error">Name is required</div>
                              )} */}
                                </FormWrap>
                              </Col>
                              <Col span={12}>
                                <FormWrap>
                                  <label htmlFor="">Quantity</label>
                                  <input
                                    type="number"
                                    name="variant_quantity"
                                    ref={this.variant_quantity}
                                    defaultValue={
                                      this.props.modalState.quantity
                                    }
                                    placeholder="Enter quantity"
                                  />
                                  {/* {submitted && !quantity && (
                                <div className="error">
                                  Quantity is required
                                </div>
                              )} */}
                                </FormWrap>
                              </Col>
                              <Col span={12}>
                                <FormWrap>
                                  <label htmlFor="">Retail Price</label>
                                  <input
                                    type="number"
                                    name="variant_retail_price"
                                    ref={this.variant_retail_price}
                                    defaultValue={
                                      this.props.modalState.retail_price
                                    }
                                    placeholder="Enter retail price"
                                  />
                                  {/* {submitted && !retail_price && (
                                <div className="error">
                                  Retail Price is required
                                </div>
                              )} */}
                                </FormWrap>
                              </Col>
                            </Row>
                            <footer>
                              <Button
                                buttonColor={color.brandColor}
                                textColor={color.whiteColor}
                                type="submit"
                                className="full"
                              >
                                {" "}
                                {this.props.loading ? "Loading...." : "Edit"}
                              </Button>
                            </footer>
                          </form>
                        </FormInput>
                      </React.Fragment>
                    ) : null}
                  </Col>
                </Row>
              </div>
            )}
          </ModalWrap>
        </Modal>
      );
    } else {
      return null;
    }
  }
}

export default CreateProductVariantModal;
