import React, { Component } from "react";
import Modal from "react-responsive-modal";
import FormInput from "../../components/styles/FormInput";
import Button from "../../components/styles/Button";
import { color } from "../../components/styles/constant";
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

class CreateProductCategoryModal extends Component {
  render() {
    const {
      category_name,
      submitted,
      openCreateProductCategory
    } = this.props.modalState;
    return (
      <Modal open={openCreateProductCategory} onClose={this.props.onCloseModal}>
        <ModalWrap>
          <div className="title">{this.props.title}</div>
          <FormInput>
            <form onSubmit={this.props.handleSubmit}>
              <div className="row">
                <div className="col-md-12">
                  <div className="form-wrap">
                    <label htmlFor="">Product Category</label>
                    <input
                      type="text"
                      onChange={this.props.handleChange}
                      name="category_name"
                      placeholder="Enter category name"
                    />
                    {submitted && !category_name && (
                      <div className="error">Category name is required</div>
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

export default CreateProductCategoryModal;
