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

class UpdateProductModal extends Component {
  render() {
    const {
      category,
      barcode,
      name,
      sku,
      description,
      submitted,
      openUpdateProduct
    } = this.props.modalState;
    return (
      <Modal open={openUpdateProduct} onClose={this.props.onCloseModal}>
        <ModalWrap>
          <div className="title">{this.props.title}</div>
          <FormInput>
            <form onSubmit={this.props.handleSubmit}>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-wrap">
                    <label htmlFor="">Product Name</label>
                    <input
                      type="text"
                      onChange={this.props.handleChange}
                      name="name"
                      value="name"
                      placeholder="Enter barcode"
                    />
                    {submitted && !name && (
                      <div className="error">Product name is required</div>
                    )}
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-wrap">
                    <label htmlFor="">Category</label>
                    <select
                      name="category"
                      // value="category"
                      onChange={this.props.handleChange}
                    >
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
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-wrap">
                    <label htmlFor="">barcode</label>
                    <input
                      type="text"
                      onChange={this.props.handleChange}
                      name="barcode"
                      value="barcode"
                      placeholder="Enter barcode"
                    />
                    {submitted && !barcode && (
                      <div className="error">Barcode is required</div>
                    )}
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-wrap">
                    <label htmlFor="">Sku</label>
                    <input
                      type="text"
                      onChange={this.props.handleChange}
                      name="sku"
                      value="sku"
                      placeholder="Enter barcode"
                    />
                    {submitted && !sku && (
                      <div className="error">Sku is required</div>
                    )}
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="form-wrap">
                    <label htmlFor="">Product Description</label>
                    <textarea
                      name="description"
                      value="description"
                      onChange={this.props.handleChange}
                      placeholder="Product Description"
                    />
                    {submitted && !description && (
                      <div className="error">
                        Product Description is required
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
                  className="float-right"
                >
                  {" "}
                  {this.props.loading
                    ? "Loading...."
                    : "Create Product Category"}
                </Button>
              </footer>
            </form>
          </FormInput>
        </ModalWrap>
      </Modal>
    );
  }
}

export default UpdateProductModal;
