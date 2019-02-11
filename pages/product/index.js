import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getAllProductsRequest,
  createProductRequest,
  updateProductRequest,
  getAllProductCategoriesRequest
} from "../../modules/productModule";
import SpinerWrap from "../../components/Spinner";
import AdminContainer from "../../components/AdminContainer";
import Button from "../../components/styles/Button";
import CreateProductModal from "./createProductModal";
import UpdateProductModal from "./updateProductModal";
import styled from "styled-components";
import { color, height } from "../../components/styles/constant";
import NoData from "../../components/NoData";

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
    }
    th {
      padding: 1.7rem 3rem;
      color: ${color.textLight};
    }
    td {
      padding: 1.7rem 3rem;
      color: ${color.textColor};
    }
    tbody tr:hover {
      background-color: #fbfbfb;
      cursor: pointer;
    }
  }
`;

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
      category: category,
      barcode: barcode,
      name: name,
      sku: sku,
      description: description
    };
    if (category && barcode && name && sku && description) {
      this.props.updateProductRequest(data);
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
      category: product.category,
      barcode: product.barcode,
      name: product.name,
      sku: product.sku,
      description: product.description,
      openUpdateProduct: true
    });
  };

  render() {
    if (this.props.products !== undefined) {
      return (
        <AdminContainer>
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
                  <th>Sku</th>
                  <th>description</th>
                </tr>
              </thead>
              <tbody>
                {this.props.products.map(x => (
                  <tr
                    key={x.id}
                    onClick={() => {
                      this.updateProduct(x);
                    }}
                  >
                    <td>{x.category}</td>
                    <td>{x.barcode}</td>
                    <td>{x.name}</td>
                    <td>{x.sku}</td>
                    <td>{x.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {this.props.products.length === 0 ? (
              <NoData message="No Product Available" />
            ) : null}
          </ContentWrap>
        </AdminContainer>
      );
    } else {
      return (
        <AdminContainer>
          <ContentWrap>
            <SpinerWrap />
          </ContentWrap>
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
    getAllProductCategoriesRequest
  }
)(Product);
