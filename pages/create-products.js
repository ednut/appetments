import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getAllProductsRequest,
  createProductRequest,
  updateProductRequest,
  getAllProductCategoriesRequest,
  deleteProductRequest
} from "../modules/productModule";
import SpinerWrap from "../components/Spinner";
import Product from "./product";
import AdminContainer from "../components/AdminContainer";
import Button from "../components/styles/Button";
import CreateProductModal from "./product/createProductModal";
import UpdateProductModal from "./product/updateProductModal";
import styled from "styled-components";
import { color, height } from "../components/styles/constant";
import NoData from "../components/NoData";

const ContentWrap = styled.div`
  .action-wrap {
    margin-bottom: ${height.gutterHeight};
    text-align: right;
  }
  table {
    background-color: ${color.whiteColor};
    box-shadow: 0 2px 5px 0 rgba(164, 173, 186, 0.25);
    border-bottom: none;
    border-radius: 0.2rem;
    tr {
      border-bottom: 1px solid #eef0f2;
      &:hover {
        .action {
          span.delete {
            visibility: visible;
            color: red;
          }
        }
      }
    }
    th {
      padding: 1.7rem 3rem;
      color: ${color.textLight};
    }
    td {
      padding: 1.7rem 3rem;
      color: ${color.textColor};
      &.action {
        text-align: right;
        span.delete {
          color: #083e8d;
          visibility: hidden;
        }
      }
    }
    tbody tr:hover {
      background-color: #fbfbfb;
      cursor: pointer;
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
      openUpdateProduct: false
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

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onOpenCreateModal = () => {
    this.setState({ openCreateProduct: true });
  };

  onCloseCreateModal = () => {
    this.setState({ openCreateProduct: false });
  };

  onOpenUpdateModal = () => {
    this.setState({ openUpdateProduct: true });
  };

  onCloseUpdateModal = () => {
    this.setState({ openUpdateProduct: false });
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

              <div className="action-wrap">
                <Button
                  buttonColor={color.brandColor}
                  textColor={color.whiteColor}
                  onClick={this.onOpenCreateModal}
                >
                  Add New Product
                </Button>
              </div>

              <table className="table table-borderless">
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
                      <td
                        onClick={() => {
                          this.updateProduct(x);
                        }}
                      >
                        {x.category}
                      </td>
                      <td>{x.barcode}</td>
                      <td>{x.name}</td>
                      <td>{x.sku}</td>
                      <td>{x.description}</td>
                      <td
                        className="action"
                        onClick={() => this.deleteProduct(x.id)}
                      >
                        <span className="delete">delete</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
  productCreated: state.productReducer.productCreated
});

export default connect(
  mapStateToProps,
  {
    getAllProductsRequest,
    createProductRequest,
    updateProductRequest,
    getAllProductCategoriesRequest,
    deleteProductRequest
  }
)(CreateProduct);
