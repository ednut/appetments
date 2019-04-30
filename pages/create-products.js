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
import { Table, Divider, Tag } from "antd";

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
    background-color: #17977c;
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
      retail_price: "",
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
        retail_price: "",
        submitted: false
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
    const {
      category,
      barcode,
      name,
      sku,
      retail_price,
      description
    } = this.state;
    this.setState({ submitted: true });
    const data = {
      category: parseInt(category),
      company: "",
      barcode: barcode,
      name: name,
      sku: sku,
      retail_price: retail_price,
      description: description
    };
    if (category && barcode && name && sku && retail_price && description) {
      this.props.createProductRequest(data);
      this.setState({ openCreateProduct: false });
    }
  };

  handleVariantCreateSubmit = e => {
    e.preventDefault();
    const { name, barcode, sku, quantity, retail_price } = this.state.variant;
    this.setState({
      variant: {
        submitted: true
      }
    });
    const data = {
      name: name,
      barcode: barcode,
      sku: sku,
      quantity: quantity,
      retail_price: retail_price
    };
    if (name && barcode && sku && quantity && retail_price) {
      this.setState({
        variant: {
          creating: true
        }
      });
      this.props.createVariantRequest(data, this.state.id);
    }
  };

  handleUpdateSubmit = e => {
    e.preventDefault();
    const {
      category,
      barcode,
      name,
      sku,
      retail_price,
      description
    } = this.state;
    this.setState({ submitted: true });
    const data = {
      company: this.state.company,
      category: category,
      barcode: barcode,
      name: name,
      sku: sku,
      retail_price: retail_price,
      description: description
    };
    if (category && barcode && name && sku && retail_price && description) {
      this.props.updateProductRequest(data, this.state.id);
      this.setState({ openUpdateProduct: false });
    }
  };

  handleVariantUpdateSubmit = obj => {
    const data = {
      name: obj.name,
      retail_price: obj.retail_price
    };
    const qty = {
      quantity: obj.quantity
    };
    if (true) {
      this.props.updateVariantRequest(data, this.state.id);
      this.props.adjustInventoryRequest(qty, this.state.id);
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
    console.log({ [e.target.name]: e.target.value });
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

  closeEditVariant = () => {
    this.setState({
      isCreateVariant: true,
      isUpdateVariant: false
    });
  };

  updateProduct = product => {
    this.setState({
      id: product.id,
      category: product.category,
      company: product.company,
      barcode: product.barcode,
      name: product.name,
      sku: product.sku,
      retail_price: product.retail_price,
      description: product.description,
      openUpdateProduct: true
    });
  };

  getProductDetails = x => {
    this.props.getProductsByIdRequest(x.id);
    this.setState({
      id: x.id,
      isCreateVariant: true,
      isUpdateVariant: false,
      openProductDetails: true
    });
  };

  updateProductVariant = variant => {
    let x = {
      id: variant.id,
      name: variant.name,
      quantity: variant.quantity,
      retail_price: variant.retail_price,
      isCreateVariant: false,
      isUpdateVariant: true
    };
    this.setState(x);
  };

  deleteProductVariant = id => {
    this.props.deleteVariantRequest(id);
  };

  deleteProduct = id => {
    this.props.deleteProductRequest(id);
  };

  render() {
    if (this.props.products !== undefined) {
      const columns = [
        {
          title: "Category",
          dataIndex: "category",
          key: "category"
        },
        {
          title: "Barcode",
          dataIndex: "barcode",
          key: "barcode"
        },
        {
          title: "Name",
          dataIndex: "name",
          key: "name"
        },
        {
          title: "SKU",
          dataIndex: "sku",
          key: "sku"
        },
        // {
        //   title: "Retail price",
        //   dataIndex: "retail_price",
        //   key: "retail_price",
        //   render: x => (
        //     <span>
        //       {"$"}
        //       {x}
        //     </span>
        //   )
        // },
        {
          title: "Description",
          dataIndex: "description",
          key: "description"
        },
        {
          title: "Action",
          key: "action",
          dataIndex: "action",
          render: (x, record) => (
            <span>
              <a
                onClick={() => {
                  this.getProductDetails(x);
                }}
                href="javascript:;"
              >
                Manage Variants
              </a>
              <Divider type="vertical" />
              <a
                onClick={() => {
                  this.updateProduct(x);
                }}
                href="javascript:;"
              >
                Edit
              </a>
              <Divider type="vertical" />
              <a onClick={() => this.deleteProduct(x.id)} href="javascript:;">
                Delete
              </a>
            </span>
          )
        }
      ];

      const data = this.props.products.map(function(x) {
        return {
          key: x.id,
          category: x.category_name,
          barcode: x.barcode,
          name: x.name,
          sku: x.sku,
          // retail_price: x.retail_price,
          description: x.description,
          action: x
        };
      });
      const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(
            `selectedRowKeys: ${selectedRowKeys}`,
            "selectedRows: ",
            selectedRows
          );
        },
        getCheckboxProps: record => ({
          disabled: record.name === "Disabled User", // Column configuration not to be checked
          name: record.name
        })
      };

      return (
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
              handleUpdateSubmit={this.handleVariantUpdateSubmit}
              handleChange={this.handleVariantChange}
              product={this.props.product}
              update={this.updateProductVariant}
              closeEdit={this.closeEditVariant}
              delete={this.deleteProductVariant}
              loading={this.props.loading}
              title={"Product Details"}
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
            <Table
              rowSelection={rowSelection}
              columns={columns}
              dataSource={data}
            />
            {this.props.products.length === 0 ? (
              <NoData message="No Product Available" />
            ) : null}
          </ContentWrap>
        </Product>
      );
    } else {
      return (
        <Product>
          <ContentWrap>
            <SpinerWrap />
          </ContentWrap>
        </Product>
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
