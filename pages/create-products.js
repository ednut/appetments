import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getAllProductsRequest,
  createProductRequest,
  updateProductRequest,
  getAllProductCategoriesRequest,
  deleteProductRequest,
  getProductsByIdRequest
} from "../modules/productModule";
import {
  getAllVariantsRequest,
  createVariantRequest,
  updateVariantRequest,
  deleteVariantRequest,
  activateVariantRequest,
  deactivateVariantRequest,
  adjustInventoryRequest
} from "../modules/productVariantModule";
import SpinerWrap from "../components/Spinner";
import Product from "./product";
import AdminContainer from "../components/AdminContainer";
import Button from "../components/styles/Button";
import CreateProductModal from "./product/createProductModal";
import UpdateProductModal from "./product/updateProductModal";

import UpdateProductVariantModal from "./product/updateProductVariantModal";

import ProductDetails from "./product/productDetailsModal";

import styled from "styled-components";
import { color, height } from "../components/styles/constant";
import NoData from "../components/NoData";
import TableWrapper from "../components/styles/TableWrap";

const ContentWrap = styled.div`
  .action-wrap {
    margin-bottom: ${height.gutterHeight};
    text-align: right;
  }
  button {
    width: 6rem;
    height: 6rem;
    border-radius: 50%;
    border: none;
    background-color: #083e8d;
    color: #fff;
    animation: moveInBottom 1s linear;
    transition: all 0.2s;
    padding-top: 5px;
    box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.2);
    position: fixed;
    bottom: 50px;
    right: 40px;
    cursor: pointer;
    outline: none;
    i {
      font-size: 32px;
    }
    &:hover {
      transform: translateY(-0.3rem);
    }
  }
`;

class CreateProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      category: "",
      barcode: "",
      name: "",
      sku: "",
      description: "",
      submitted: false,
      openCreateProduct: false,
      openUpdateProduct: false,
      openCreateProductVariant: false,
      openUpdateProductVariant: false,
      openProductDetails: false,
      isCreateVariant: false,
      isUpdateVariant: false,
      variant: {
        id: "",
        name: "",
        barcode: "",
        sku: "",
        quantity: "",
        retail_price: ""
      }
    };
  }
  componentDidMount() {
    this.props.getAllProductsRequest();
    this.props.getAllProductCategoriesRequest();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.productCreated) {
      this.props.getAllProductsRequest();
    }
    if (nextProps.rerender) {
      this.props.getProductsByIdRequest(this.state.id);
    }
  }

  handleCreateSubmit = e => {
    e.preventDefault();
    const { category, barcode, name, sku, description } = this.state;
    this.setState({ submitted: true });
    const data = {
      category: parseInt(category),
      company: "",
      barcode: barcode,
      name: name,
      sku: sku,
      description: description
    };
    if (category && barcode && name && sku && description) {
      this.props.createProductRequest(data);
      this.setState({ openCreateProduct: false });
    }
  };

  handleVariantCreateSubmit = e => {
    e.preventDefault();
    const { name, barcode, sku, quantity, retail_price } = this.state.variant;
    this.setState({ submitted: true });
    const data = {
      name: name,
      barcode: barcode,
      sku: sku,
      quantity: quantity,
      retail_price: retail_price
    };
    if (name && barcode && sku && quantity && retail_price) {
      this.props.createVariantRequest(data, this.state.id);
    }
  };

  handleUpdateSubmit = e => {
    e.preventDefault();
    const { category, barcode, name, sku, description } = this.state;
    this.setState({ submitted: true });
    const data = {
      company: this.state.company,
      category: category,
      barcode: barcode,
      name: name,
      sku: sku,
      description: description
    };
    if (category && barcode && name && sku && description) {
      this.props.updateProductRequest(data, this.state.id);
      this.setState({ openUpdateProduct: false });
    }
  };

  handleVariantUpdateSubmit = e => {
    e.preventDefault();
    const { variant } = this.state;
    this.setState({ submitted: true });
    const data = {
      name: variant.name,
      barcode: variant.barcode,
      sku: variant.sku,
      quantity: variant.quantity,
      retail_price: variant.retail_price
    };
    if (name && barcode && sku && quantity && retail_price) {
      this.props.updateVariantRequest(data, this.state.id);
      this.setState({ openUpdateProductVariant: false });
    }
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleVariantChange = e => {
    let variant = {
      ...this.state.variant,
      ...{
        [e.target.name]: e.target.value
      }
    };
    this.setState({ variant: variant });
  };

  onOpenCreateModal = () => {
    this.setState({ openCreateProduct: true });
  };

  onCloseCreateModal = () => {
    this.setState({ openCreateProduct: false });
  };

  onOpenDetailsModal = () => {
    this.setState({ openProductDetails: true });
  };

  onCloseDetailsModal = () => {
    this.setState({ openProductDetails: false });
  };

  onOpenUpdateModal = () => {
    this.setState({ openUpdateProduct: true });
  };

  onCloseUpdateModal = () => {
    this.setState({ openUpdateProduct: false });
  };

  onOpenCreateVariantModal = x => {
    this.setState({ id: x.id, openCreateProductVariant: true });
  };

  onCloseCreateVariantModal = () => {
    this.setState({ openCreateProductVariant: false });
  };

  onOpenUpdateVariantModal = () => {
    this.setState({ openUpdateProductVariant: true });
  };

  onCloseUpdateVariantModal = () => {
    this.setState({ openUpdateProductVariant: false });
  };

  updateProduct = product => {
    this.setState({
      id: product.id,
      category: product.category,
      company: product.company,
      barcode: product.barcode,
      name: product.name,
      sku: product.sku,
      description: product.description,
      openUpdateProduct: true
    });
  };

  getProductDetails = x => {
    this.props.getProductsByIdRequest(x.id);
    console.log(this.props.product);
    this.setState({ id: x.id, openProductDetails: true });
  };

  deleteProductVariant = id => {
    this.props.deleteVariantRequest(id);
  };

  deleteProduct = id => {
    this.props.deleteProductRequest(id);
  };

  render() {
    if (this.props.products !== undefined) {
      return (
        <AdminContainer>
          <Product>
            <ContentWrap>
              {this.props.loading === true ? <SpinerWrap /> : null}

              <CreateProductModal
                modalState={this.state}
                onCloseModal={this.onCloseCreateModal}
                handleChange={this.handleChange}
                handleSubmit={this.handleCreateSubmit}
                loading={this.props.loading}
                categories={this.props.productCategories}
                title={"Create Product"}
              />
              <UpdateProductModal
                modalState={this.state}
                onCloseModal={this.onCloseUpdateModal}
                handleChange={this.handleChange}
                handleSubmit={this.handleUpdateSubmit}
                loading={this.props.loading}
                categories={this.props.productCategories}
                title={"Update Product"}
              />

              <ProductDetails
                modalState={this.state}
                onCloseModal={this.onCloseDetailsModal}
                handleSubmit={this.handleVariantCreateSubmit}
                handleChange={this.handleVariantChange}
                product={this.props.product}
                delete={this.deleteProductVariant}
                loading={this.props.loading}
                title={"Product Details"}
              />

              <UpdateProductVariantModal
                modalState={this.state}
                onCloseModal={this.onCloseUpdateVariantModal}
                handleChange={this.handleVariantChange}
                handleSubmit={this.handleVariantUpdateSubmit}
                loading={this.props.loading}
                title={"Update Product Variant"}
              />

              <div className="action-wrap">
                {/* <Button
                  buttonColor={color.brandColor}
                  textColor={color.whiteColor}
                  onClick={this.onOpenCreateModal}
                >
                  Add New Product
                </Button> */}
                <button onClick={this.onOpenCreateModal}>
                  <i className="material-icons"> add </i>
                </button>
              </div>
              <TableWrapper style={{ maxHeight: "25rem" }}>
                <table>
                  <thead>
                    <tr>
                      <th>Category</th>
                      <th>Barcode</th>
                      <th>Name</th>
                      <th>SKU</th>
                      <th>description</th>
                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    {this.props.products.map(x => (
                      <tr key={x.id}>
                        <td>{x.category}</td>
                        <td>{x.barcode}</td>
                        <td>{x.name}</td>
                        <td>{x.sku}</td>
                        <td style={{ width: "35%" }}>{x.description}</td>
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
                              {/* <a
                                className="dropdown-item"
                                onClick={() => this.onOpenCreateVariantModal(x)}
                              >
                                Create Product Variants
                              </a> */}

                              <a
                                className="dropdown-item"
                                onClick={() => this.getProductDetails(x)}
                              >
                                View Details
                              </a>

                              <a
                                onClick={() => {
                                  this.updateProduct(x);
                                }}
                                className="dropdown-item"
                              >
                                Edit
                              </a>
                              <a
                                onClick={() => this.deleteProduct(x.id)}
                                className="dropdown-item delete"
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
              {this.props.products.length === 0 ? (
                <NoData message="No Product Available" />
              ) : null}
            </ContentWrap>
          </Product>
        </AdminContainer>
      );
    } else {
      return (
        <AdminContainer>
          <Product>
            <ContentWrap>
              <SpinerWrap />
            </ContentWrap>
          </Product>
        </AdminContainer>
      );
    }
  }
}

const mapStateToProps = state => ({
  productCategories: state.productReducer.productCategories,
  products: state.productReducer.products,
  product: state.productReducer.product,
  loading: state.productReducer.loadingProduct,
  productCreated: state.productReducer.productCreated,
  rerender: state.productVariantReducer.rerender
});

export default connect(
  mapStateToProps,
  {
    getAllProductsRequest,
    createProductRequest,
    updateProductRequest,
    getAllProductCategoriesRequest,
    getAllVariantsRequest,
    createVariantRequest,
    deleteProductRequest,
    getProductsByIdRequest,
    updateVariantRequest,
    deleteVariantRequest,
    activateVariantRequest,
    deactivateVariantRequest,
    adjustInventoryRequest
  }
)(CreateProduct);
