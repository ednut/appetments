import React, { Component } from "react";
import Modal from "react-responsive-modal";
import FormInput from "../../components/styles/FormInput";
import Button from "../../components/styles/Button";
import { shadowStyle, color, height } from "../../components/styles/constant";
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

class UpdateProductVariantModal extends Component {
  render() {
    const {
      name,
      barcode,
      sku,
      quantity,
      retail_price,
      submitted,
      openUpdateProductVariant
    } = this.props.modalState;
    return (
      <Modal open={openUpdateProductVariant} onClose={this.props.onCloseModal}>
        <ModalWrap>
          <div className="title">{this.props.title}</div>
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
                      value={name}
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
                      value={barcode}
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
                      value={sku}
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
                      value={quantity}
                      placeholder="Enter Quantity"
                    />
                    {submitted && !quantity && (
                      <div className="error">Quantity is required</div>
                    )}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-wrap">
                    <label htmlFor="">Retail Price</label>
                    <input
                      type="number"
                      onChange={this.props.handleChange}
                      name="retail_price"
                      value={retail_price}
                      placeholder="Enter Retail Price"
                    />
                    {submitted && !retail_price && (
                      <div className="error">Retail Price is required</div>
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
                  {this.props.loading ? "Loading...." : "Update Variant"}
                </Button>
              </footer>
            </form>
          </FormInput>
        </ModalWrap>
      </Modal>
    );
  }
}

export default UpdateProductVariantModal;
