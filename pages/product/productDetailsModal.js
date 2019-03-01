import React, { Component } from "react";
import Modal from "react-responsive-modal";
import FormInput from "../../components/styles/FormInput";
import Button from "../../components/styles/Button";
import { color } from "../../components/styles/constant";
import styled from "styled-components";
import TableWrapper from "../../components/styles/TableWrap";

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
  footer {
    height: 5rem;
    width: 100%;
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
  render() {
    const { submitted } = this.props.modalState.variant;
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
                <div className="row">
                  <div className="col-md-7 bder-right">
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
                                          <a className="dropdown-item">Edit</a>
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
                  </div>
                  <div className="col-md-5 bder-left">
                    <FormInput>
                      <form onSubmit={this.props.handleSubmit}>
                        <div className="row">
                          <div className="col-md-12">
                            <div className="form-wrap">
                              <label htmlFor="">Name</label>
                              <input
                                type="text"
                                onChange={this.props.handleChange}
                                name="name"
                                // ref="fullName"
                                placeholder="Enter name"
                              />
                              {submitted && !name && (
                                <div className="error">Name is required</div>
                              )}
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-wrap">
                              <label htmlFor="">Barcode</label>
                              <input
                                type="number"
                                onChange={this.props.handleChange}
                                name="barcode"
                                // ref={input => (this.barcode = input)}
                                placeholder="Enter barcode"
                              />
                              {submitted && !barcode && (
                                <div className="error">Barcode is required</div>
                              )}
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-wrap">
                              <label htmlFor="">SKU</label>
                              <input
                                type="name"
                                onChange={this.props.handleChange}
                                name="sku"
                                // ref={input => (this.sku = input)}
                                placeholder="Enter SKU"
                              />
                              {submitted && !sku && (
                                <div className="error">SKU is required</div>
                              )}
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-wrap">
                              <label htmlFor="">Quantity</label>
                              <input
                                type="number"
                                onChange={this.props.handleChange}
                                name="quantity"
                                // ref={input => (this.quality = input)}
                                placeholder="Enter Quantity"
                              />
                              {submitted && !quantity && (
                                <div className="error">
                                  Quantity is required
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-wrap">
                              <label htmlFor="">Retail Price</label>
                              <input
                                type="number"
                                name="retail_price"
                                onChange={this.props.handleChange}
                                // ref={input => (this.retail_price = input)}
                                placeholder="Enter Retail Price"
                              />
                              {submitted && !retail_price && (
                                <div className="error">
                                  Retail Price is required
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        <footer>
                          <Button
                            buttonColor={color.brandColor}
                            textColor={color.whiteColor}
                            type="submit"
                            className="full"
                          >
                            {" "}
                            {this.props.loading
                              ? "Loading...."
                              : "Create Product Variant"}
                          </Button>
                        </footer>
                      </form>
                    </FormInput>
                  </div>
                </div>
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
