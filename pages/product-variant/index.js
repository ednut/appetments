import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getAllVariantsRequest,
  createVariantRequest,
  updateVariantRequest,
  deleteVariantRequest,
  activateVariantRequest,
  deactivateVariantRequest,
  adjustInventoryRequest
} from "../../modules/productVariantModule";
import { getAllProductsRequest } from "../../modules/productModule";
import SpinerWrap from "../../components/Spinner";
import AdminContainer from "../../components/AdminContainer";
import Button from "../../components/styles/Button";
import Product from "../product";
import CreateProductVariantModal from "./createProductVariantModal";
import UpdateProductVariantModal from "./updateProductVariantModal";
import styled from "styled-components";
import { color, height } from "../../components/styles/constant";

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

class ProductVariant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      barcode: "",
      sku: "",
      quantity: "",
      retail_price: "",
      submitted: false,
      openCreateProductVariant: false,
      openUpdateProductVariant: false
    };
  }
  componentDidMount() {
    this.props.getAllVariantsRequest();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.rerender) {
      this.props.getAllVariantsRequest();
    }
  }

  handleCreateSubmit = e => {
    e.preventDefault();
    const { name, barcode, sku, quantity, retail_price } = this.state;
    this.setState({ submitted: true });
    const data = {
      name: name,
      barcode: barcode,
      sku: sku,
      quantity: quantity,
      retail_price: retail_price
    };
    if (name && barcode && sku && quantity && retail_price) {
      this.props.createVariantRequest(data);
      this.setState({ openCreateProductVariant: false });
    }
  };

  handleUpdateSubmit = e => {
    e.preventDefault();
    const { name, barcode, sku, quantity, retail_price } = this.state;
    this.setState({ submitted: true });
    const data = {
      name: name,
      barcode: barcode,
      sku: sku,
      quantity: quantity,
      retail_price: retail_price
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

  onOpenCreateModal = () => {
    this.setState({ openCreateProductVariant: true });
  };

  onCloseCreateModal = () => {
    this.setState({ openCreateProductVariant: false });
  };

  onOpenUpdateModal = () => {
    this.setState({ openUpdateProductVariant: true });
  };

  onCloseUpdateModal = () => {
    this.setState({ openUpdateProductVariant: false });
  };

  updateProductVariant = variant => {
    this.setState({
      id: variant.id,
      name: variant.name,
      barcode: variant.barcode,
      sku: variant.sku,
      quantity: variant.quantity,
      retail_price: variant.retail_price,
      openUpdateProductVariant: true
    });
  };

  deleteProductVariant = id => {
    this.props.deleteVariantRequest(id);
  };

  render() {
    if (this.props.productVariants !== undefined) {
      return (
        <AdminContainer>
          <Product>
            <ContentWrap>
              {this.props.loading === true ? <SpinerWrap /> : null}

              <CreateProductVariantModal
                modalState={this.state}
                onCloseModal={this.onCloseCreateModal}
                handleChange={this.handleChange}
                handleSubmit={this.handleCreateSubmit}
                loading={this.props.loading}
                title={"Create Product Variant"}
              />
              <UpdateProductVariantModal
                modalState={this.state}
                onCloseModal={this.onCloseUpdateModal}
                handleChange={this.handleChange}
                handleSubmit={this.handleUpdateSubmit}
                loading={this.props.loading}
                title={"Update Product Variant"}
              />

              <div className="action-wrap">
                <Button
                  buttonColor={color.brandColor}
                  textColor={color.whiteColor}
                  onClick={this.onOpenCreateModal}
                >
                  Add New Product Variant
                </Button>
              </div>

              <table className="table table-borderless">
                <thead>
                  <tr>
                    <th>Variant Name</th>
                    <th>Barcode</th>
                    <th>SKU</th>
                    <th>Quantity</th>
                    <th>Retail Price</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {this.props.productVariants.map(x => (
                    <tr key={x.id}>
                      <td
                        onClick={() => {
                          this.updateProductVariant(x);
                        }}
                      >
                        {x.name}
                      </td>
                      <td>{x.barcode}</td>
                      <td>{x.sku}</td>
                      <td>{x.quantity}</td>
                      <td>{x.retail_price}</td>
                      <td
                        className="action"
                        onClick={() => this.deleteProductVariant(x.id)}
                      >
                        <span className="delete">delete</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {this.props.productVariants &&
              this.props.productVariants.length < 0
                ? "No data"
                : null}
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
  products: state.productReducer.products,
  productVariants: state.productVariantReducer.variants,
  rerender: state.productVariantReducer.rerender,
  loading: state.productVariantReducer.loading
});

export default connect(
  mapStateToProps,
  {
    getAllVariantsRequest,
    createVariantRequest,
    updateVariantRequest,
    deleteVariantRequest,
    activateVariantRequest,
    deactivateVariantRequest,
    adjustInventoryRequest,
    getAllProductsRequest
  }
)(ProductVariant);
