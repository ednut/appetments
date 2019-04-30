import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { shadowStyle, color, height } from "../components/styles/constant";
import {
  getAllPetsRequest,
  createPetRequest,
  updatePetRequest,
  deletePetRequest
} from "../modules/petModule";
import SpinerWrap from "../components/Spinner";
import Button from "../components/styles/Button";
import CreatePetModal from "./pet/createPetModal";
import UpdatePetModal from "./pet/updatePetModal";
import NoData from "../components/NoData";
import TableWrapper from "../components/styles/TableWrap";
import { Table, Divider } from "antd";

const PetContentWrap = styled.div`
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

class PetMembers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      first_name: "",
      last_name: "",
      password: "",
      email: "",
      submitted: false,
      openCreatePet: false,
      openUpdatePet: false
    };
  }
  componentDidMount() {
    this.props.getAllPetsRequest();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.pet) {
      this.props.getAllPetsRequest();
    }
  }

  handleCreateSubmit = e => {
    e.preventDefault();
    const { first_name, last_name, password, email } = this.state;
    this.setState({ submitted: true });
    const data = {
      first_name: first_name,
      last_name: last_name,
      password: password,
      email: email
    };
    if (first_name && last_name && password && email) {
      this.props.createPetRequest(data);
      this.setState({ openCreatePet: false });
    }
  };

  handleUpdateSubmit = e => {
    e.preventDefault();
    const { first_name, last_name } = this.state;
    this.setState({ submitted: true });
    const data = {
      first_name: first_name,
      last_name: last_name
    };
    if (first_name && last_name) {
      this.props.updatePetRequest(data, this.state.id);
      this.setState({ openUpdatePet: false });
    }
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onOpenCreateModal = () => {
    this.setState({ openCreatePet: true });
  };

  onCloseCreateModal = () => {
    this.setState({ openCreatePet: false });
  };

  onOpenUpdateModal = () => {
    this.setState({ openUpdatePet: true });
  };

  onCloseUpdateModal = () => {
    this.setState({ openUpdatePet: false });
  };

  updatePet = pet => {
    this.setState({
      id: pet.id,
      first_name: pet.first_name,
      last_name: pet.last_name,
      openUpdatePet: true
    });
    this.setState({ openUpdatePet: true });
  };

  deletePet = id => {
    this.props.deletePetRequest(id);
  };

  render() {
    if (this.props.pets !== undefined) {
      const columns = [
        {
          title: "First Name",
          dataIndex: "first_name",
          key: "first_name"
        },
        {
          title: "Last Name",
          dataIndex: "last_name",
          key: "last_name"
        },
        {
          title: "Email",
          dataIndex: "email",
          key: "email"
        },
        {
          title: "Action",
          key: "action",
          dataIndex: "action",
          render: (x, record) => (
            <span>
              <a
                onClick={() => {
                  this.updatePet(x);
                }}
                href="javascript:;"
              >
                Edit
              </a>

              <Divider type="vertical" />
              <a onClick={() => this.deletePet(x.id)} href="javascript:;">
                Delete
              </a>
            </span>
          )
        }
      ];

      const data = this.props.pets.map(function(x) {
        return {
          key: x.id,
          first_name: x.first_name,
          last_name: x.last_name,
          email: x.email,
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
        <PetContentWrap>
          {this.props.loading === true ? <SpinerWrap /> : null}

          <CreatePetModal
            modalState={this.state}
            onCloseModal={this.onCloseCreateModal}
            handleChange={this.handleChange}
            handleSubmit={this.handleCreateSubmit}
            loading={this.props.loading}
            title={"Create Pet"}
          />
          <UpdatePetModal
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
          {this.props.pets.length === 0 ? (
            <NoData message="No Pet Created Yet" />
          ) : null}
        </PetContentWrap>
      );
    } else {
      return (
        <Pet>
          <PetContentWrap>
            <SpinerWrap />
          </PetContentWrap>
        </Pet>
      );
    }
  }
}

const mapStateToProps = state => ({
  pets: state.petReducer.pets,
  pet: state.petReducer.pet,
  loading: state.petReducer.loading
});

export default connect(
  mapStateToProps,
  {
    getAllPetsRequest,
    createPetRequest,
    updatePetRequest,
    deletePetRequest
  }
)(PetMembers);
