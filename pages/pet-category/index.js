import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { shadowStyle, color, height } from "../../components/styles/constant";
import AdminContainer from "../../components/AdminContainer";
import {
  getAllPetsCategoryRequest,
  createPetCategoryRequest,
  updatePetCategoryRequest,
  deletePetCategoryRequest
} from "../../modules/petCategoryModule";
import SpinerWrap from "../../components/Spinner";
import Button from "../../components/styles/Button";
import CreatePetCategoryModal from "./createPetCategoryModal";
import UpdatePetCategoryModal from "./updatePetCategoryModal";
import TableWrapper from "../../components/styles/TableWrap";
import { Table, Divider, Popconfirm } from "antd";

const PetCategoryContentWrap = styled.div`
  position: relative;
  .action-wrap {
    margin-bottom: ${height.gutterHeight};
    text-align: right;
  }
  button {
    width: 6rem;
    height: 6rem;
    border-radius: 50%;
    border: none;
    background-color: ${color.brandColor};
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

class PetCategoryMembers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      company: "",
      name: "",
      submitted: false,
      openCreatePetCategory: false,
      openUpdatePetCategory: false
    };
  }
  componentDidMount() {
    this.props.getAllPetsCategoryRequest();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.pet) {
      this.props.getAllPetsCategoryRequest();
    }
  }

  handleCreateSubmit = e => {
    e.preventDefault();
    const { name, company } = this.state;
    this.setState({ submitted: true });
    const data = {
      name: name,
      company: this.state.company
    };
    if (name) {
      this.props.createPetCategoryRequest(data);
      this.setState({ openCreatePetCategory: false });
    }
  };

  handleUpdateSubmit = e => {
    e.preventDefault();
    const { name, id } = this.state;
    this.setState({ submitted: true });
    const data = {
      id: id,
      name: name
    };
    if (name) {
      this.props.updatePetCategoryRequest(data, this.state.company);
      this.setState({ openUpdatePetCategory: false });
    }
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onOpenCreateModal = () => {
    this.setState({
      openCreatePetCategory: true,
      company: localStorage.getItem("companyID")
    });
  };

  onCloseCreateModal = () => {
    this.setState({ openCreatePetCategory: false });
  };

  onOpenUpdateModal = () => {
    this.setState({ openUpdatePetCategory: true });
  };

  onCloseUpdateModal = () => {
    this.setState({ openUpdatePetCategory: false });
  };

  updatePetCategory = pet => {
    console.log(pet);
    this.setState({
      id: pet.id,
      company: pet.company,
      name: pet.name,
      openUpdatePet: true
    });
    this.setState({ openUpdatePetCategory: true });
  };

  deletePetCategory = id => {
    this.props.deletePetCategoryRequest(id);
  };

  render() {
    if (this.props.pets !== undefined) {
      const columns = [
        {
          title: "Name",
          dataIndex: "name",
          key: "name"
        },

        {
          title: "Action",
          key: "action",
          dataIndex: "action",
          render: (x, record) => (
            <span>
              <a
                onClick={() => {
                  this.updatePetCategory(x);
                }}
                href="javascript:;"
              >
                Edit
              </a>

              <Divider type="vertical" />
              <Popconfirm
                title="Are you sure you want to delete this category?"
                onConfirm={() => this.deletePetCategory(x.id)}
                okText="Yes"
                cancelText="No"
              >
                <a href="javascript:;">Delete</a>
              </Popconfirm>
            </span>
          )
        }
      ];

      const data = this.props.pets.map(function(x) {
        return {
          key: x.id,
          name: x.name,
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
        <AdminContainer>
          <PetCategoryContentWrap>
            {this.props.loading === true ? <SpinerWrap /> : null}

            <CreatePetCategoryModal
              modalState={this.state}
              onCloseModal={this.onCloseCreateModal}
              handleChange={this.handleChange}
              handleSubmit={this.handleCreateSubmit}
              loading={this.props.loading}
              title={"Create Pet"}
            />
            <UpdatePetCategoryModal
              modalState={this.state}
              onCloseModal={this.onCloseUpdateModal}
              handleChange={this.handleChange}
              handleSubmit={this.handleUpdateSubmit}
              loading={this.props.loading}
              title={"Update Pet"}
            />

            <div className="action-wrap">
              <button onClick={this.onOpenCreateModal}>
                <i className="material-icons"> add </i>
              </button>
            </div>
            <Table
              rowSelection={rowSelection}
              columns={columns}
              dataSource={data}
            />
          </PetCategoryContentWrap>
        </AdminContainer>
      );
    } else {
      return (
        <AdminContainer>
          <PetCategoryContentWrap>
            <SpinerWrap />
          </PetCategoryContentWrap>
        </AdminContainer>
      );
    }
  }
}

const mapStateToProps = state => ({
  pets: state.petCategoryReducer.petsCategory,
  pet: state.petCategoryReducer.petCategoryCreated,
  loading: state.petCategoryReducer.loadingPetCategory
});

export default connect(
  mapStateToProps,
  {
    getAllPetsCategoryRequest,
    createPetCategoryRequest,
    updatePetCategoryRequest,
    deletePetCategoryRequest
  }
)(PetCategoryMembers);
