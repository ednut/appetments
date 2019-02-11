import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getAllProductCategoriesRequest,
  createProductCategoryRequest,
  updateProductCategoryRequest
} from "../../modules/productModule";
import SpinerWrap from "../../components/Spinner";
import AdminContainer from "../../components/AdminContainer";
import Button from "../../components/styles/Button";
import CreateProductCategoryModal from "./createProductCategoryModal";
import UpdateProductCategoryModal from "./updateProductCategoryModal";
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

class ProductCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category_name: "",
      submitted: false,
      openCreateProductCategory: false,
      openUpdateProductCategory: false
    };
  }
  componentDidMount() {
    this.props.getAllProductCategoriesRequest();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.categoryCreation) {
      this.props.getAllProductCategoriesRequest();
    }
  }

  handleCreateSubmit = e => {
    e.preventDefault();
    const { category_name } = this.state;
    this.setState({ submitted: true });
    const data = {
      category_name: category_name
    };
    if (category_name) {
      this.props.createProductCategoryRequest(data);
      this.setState({ openCreateProductCategory: false });
    }
  };

  handleUpdateSubmit = e => {
    e.preventDefault();
    const { category_name } = this.state;
    this.setState({ submitted: true });
    const data = {
      category_name: category_name
    };
    if (category_name) {
      this.props.updateProductCategoryRequest(data);
      this.setState({ openUpdateProductCategory: false });
    }
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onOpenCreateModal = () => {
    this.setState({ openCreateProductCategory: true });
  };

  onCloseCreateModal = () => {
    this.setState({ openCreateProductCategory: false });
  };

  onOpenUpdateModal = () => {
    this.setState({ openUpdateProductCategory: true });
  };

  onCloseUpdateModal = () => {
    this.setState({ openUpdateProductCategory: false });
  };

  updateProductCategory = product => {
    this.setState({
      category_name: product.category_name,
      openUpdateProductCategory: true
    });
  };

  render() {
    if (this.props.productCategories !== undefined) {
      return (
        <AdminContainer>
          <ContentWrap>
            {this.props.loading === true ? <SpinerWrap /> : null}

            <CreateProductCategoryModal
              modalState={this.state}
              onCloseModal={this.onCloseCreateModal}
              handleChange={this.handleChange}
              handleSubmit={this.handleCreateSubmit}
              loading={this.props.loading}
              title={"Create Product Category"}
            />
            <UpdateProductCategoryModal
              modalState={this.state}
              onCloseModal={this.onCloseUpdateModal}
              handleChange={this.handleChange}
              handleSubmit={this.handleUpdateSubmit}
              loading={this.props.loading}
              title={"Update Product Category"}
            />

            <div className="action-wrap">
              <Button
                buttonColor={color.brandColor}
                textColor={color.whiteColor}
                onClick={this.onOpenCreateModal}
              >
                Add New Product Category
              </Button>
            </div>

            <table className="table table-borderless">
              <thead>
                <tr>
                  <th>Category Name</th>
                </tr>
              </thead>
              <tbody>
                {this.props.productCategories.map(x => (
                  <tr
                    key={x.id}
                    onClick={() => {
                      this.updateProductCategory(x);
                    }}
                  >
                    <td>{x.category_name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {this.props.productCategories &&
            this.props.productCategories.length < 0
              ? "No data"
              : null}
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
  productCategory: state.productReducer.productCategory,
  loading: state.productReducer.loadingProductCategory,
  categoryCreation: state.productReducer.productCategoryCreated
});

export default connect(
  mapStateToProps,
  {
    getAllProductCategoriesRequest,
    createProductCategoryRequest,
    updateProductCategoryRequest
  }
)(ProductCategory);
