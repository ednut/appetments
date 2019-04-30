import React, { Component } from "react";
import { connect } from "react-redux";
import {
  createClientRequest,
  getAllClientsRequest,
  getClientsByIdRequest,
  updateClientRequest,
  deleteClientRequest,
  deactivateClientRequest,
  activateClientRequest,
  addPetToClientRequest,
  getPetByIdRequest,
  updatePetsRequest,
  deletePetRequest
} from "../../modules/clientModule";
import { getAllPetsCategoryRequest } from "../../modules/petCategoryModule";
import SpinerWrap from "../../components/Spinner";
import AdminContainer from "../../components/AdminContainer";
import Button from "../../components/styles/Button";
import CreateClientModal from "./createClientModal";
import UpdateClientModal from "./updateClientModal";
import AddPetToClient from "./addPetToClientModal";
import UpdatePetToClient from "./updatePetToClientModal";
import styled from "styled-components";
import { color, height } from "../../components/styles/constant";
import NoData from "../../components/NoData";
import { Table, Divider, Tag } from "antd";

const ContentWrap = styled.div`
  .action-wrap {
    margin-bottom: ${height.gutterHeight};
    text-align: right;
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
  }
`;

class Client extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      first_name: "",
      last_name: "",
      email: "",
      phone_number: "",
      name: "",
      category: "",
      submitted: false,
      openCreateClient: false,
      openUpdateClient: false,
      openPetService: false,
      openUpdatePet: false
    };
  }
  componentDidMount() {
    this.props.getAllClientsRequest();
    this.props.getAllPetsCategoryRequest();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.client) {
      this.props.getAllClientsRequest();
    }
  }

  handleCreateSubmit = e => {
    e.preventDefault();
    const { first_name, last_name, email, phone_number } = this.state;
    this.setState({ submitted: true });
    const data = {
      first_name: first_name,
      last_name: last_name,
      email: email,
      phone_number: phone_number
    };
    if (first_name && last_name && email && phone_number) {
      this.props.createClientRequest(data);
      this.setState({ openCreateClient: false });
    }
  };

  handleUpdateSubmit = e => {
    e.preventDefault();
    const { first_name, last_name, email, phone_number } = this.state;
    this.setState({ submitted: true });
    const data = {
      first_name: first_name,
      last_name: last_name,
      email: email,
      phone_number: phone_number
    };
    if (first_name && last_name && email && phone_number) {
      this.props.updateClientRequest(data, this.state.id);
      this.setState({ openUpdateClient: false });
    }
  };

  handlePetSubmit = e => {
    e.preventDefault();
    const { name, category } = this.state;
    this.setState({ submitted: true });
    const data = {
      name: name,
      category: category
    };
    if ((name, category)) {
      this.props.addPetToClientRequest(data, this.state.id);
      this.setState({ openPetService: false });
    }
  };

  handlePetUpdateSubmit = e => {
    e.preventDefault();
    const { name, category } = this.state;
    this.setState({ submitted: true });
    const data = {
      name: name,
      category: category
    };
    if ((name, category)) {
      this.props.updatePetsRequest(data, this.state.id);
      this.setState({ openUpdatePet: false });
    }
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  selectedPet = e => {
    this.setState({
      category: e
    });
  };

  onOpenCreateModal = () => {
    this.setState({ openCreateClient: true });
  };

  onCloseCreateModal = () => {
    this.setState({ openCreateClient: false });
  };

  onOpenUpdateModal = () => {
    this.setState({ openUpdateClient: true });
  };

  onCloseUpdateModal = () => {
    this.setState({ openUpdateClient: false });
  };

  onOpenPetModal = () => {
    this.setState({ openPetService: true });
  };

  onClosePetModal = () => {
    this.setState({ openPetService: false });
  };

  onCloseUpdatePetModal = () => {
    this.setState({ openUpdatePet: false });
  };

  addingPetToClient = x => {
    console.log(x);
    this.setState({
      id: x.id
    });
    this.setState({ openPetService: true });
  };

  updateClient = client => {
    this.setState({
      id: client.id,
      first_name: client.first_name,
      last_name: client.last_name,
      email: client.email,
      phone_number: client.phone_number,
      openUpdateClient: true
    });
  };

  updatePet = pet => {
    console.log(pet);
    this.setState({
      id: pet.id,
      name: pet.name,
      category: pet.category,
      openUpdatePet: true
    });
  };

  deleteClient = id => {
    this.props.deleteClientRequest(id);
  };

  deletePet = id => {
    this.props.deletePetRequest(id);
  };

  clientDeactivation = id => {
    this.props.deactivateClientRequest(id);
  };

  clientActivation = id => {
    this.props.activateClientRequest(id);
  };

  render() {
    if (this.props.clients !== undefined) {
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
          title: "Phone Number",
          dataIndex: "phone_number",
          key: "phone_number"
        },
        {
          title: "Pet",
          key: "pet",
          dataIndex: "pet",
          render: pets => (
            <span>
              {pets.map(x => {
                return (
                  <Tag key={x}>
                    {x !== "No Pet Created" ? (
                      <span
                        onClick={() => {
                          this.updatePet(x);
                        }}
                      >
                        {x}
                      </span>
                    ) : (
                      <span>{x}</span>
                    )}

                    {x !== "No Pet Created" ? (
                      <span
                        onClick={() => this.deletePet(x.id)}
                        className="icon"
                        style={{ marginLeft: "8px" }}
                      >
                        <i className="fas fa-times" />
                      </span>
                    ) : null}
                  </Tag>
                );
              })}
            </span>
          )
        },
        {
          title: "Action",
          key: "action",
          dataIndex: "action",
          render: (x, record) => (
            <span>
              <a
                onClick={() => {
                  this.addingPetToClient(x);
                }}
                href="javascript:;"
              >
                Add Pet
              </a>
              <Divider type="vertical" />
              <a
                onClick={() => {
                  this.updateClient(x);
                }}
                href="javascript:;"
              >
                Edit
              </a>
              <Divider type="vertical" />
              {x.is_active ? (
                <a
                  onClick={() => this.clientDeactivation(x.id)}
                  href="javascript:;"
                >
                  Deactivate
                </a>
              ) : (
                <a
                  onClick={() => this.clientActivation(x.id)}
                  href="javascript:;"
                >
                  Activate
                </a>
              )}

              <Divider type="vertical" />
              <a onClick={() => this.deleteClient(x.id)} href="javascript:;">
                Delete
              </a>
            </span>
          )
        }
      ];
      const data = this.props.clients.map(function(x) {
        return {
          key: x.id,
          first_name: x.first_name,
          last_name: x.last_name,
          email: x.email,
          phone_number: x.phone_number,
          pet:
            x.pets.map(function(pet) {
              let arr = [];
              arr.push(pet.name);
              return arr;
            }).length > 0
              ? x.pets.map(function(pet) {
                  let arr = [];
                  arr.push(pet.name);
                  return arr;
                })
              : ["No Pet Created"],
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
          <ContentWrap>
            {this.props.loading === true ? <SpinerWrap /> : null}

            <CreateClientModal
              modalState={this.state}
              onCloseModal={this.onCloseCreateModal}
              handleChange={this.handleChange}
              handleSubmit={this.handleCreateSubmit}
              loading={this.props.loading}
              title={"Create Client"}
            />
            <UpdateClientModal
              modalState={this.state}
              onCloseModal={this.onCloseUpdateModal}
              handleChange={this.handleChange}
              handleSubmit={this.handleUpdateSubmit}
              loading={this.props.loading}
              title={"Update Client"}
            />

            <AddPetToClient
              modalState={this.state}
              onCloseModal={this.onClosePetModal}
              handleChange={this.handleChange}
              handleSubmit={this.handlePetSubmit}
              selectedPet={this.selectedPet}
              categories={this.props.petCategories && this.props.petCategories}
              loading={this.props.loading}
              title={"Add Pet to Client"}
            />

            <UpdatePetToClient
              modalState={this.state}
              onCloseModal={this.onCloseUpdatePetModal}
              handleChange={this.handleChange}
              handleSubmit={this.handlePetUpdateSubmit}
              loading={this.props.loading}
              title={"Edit Pet"}
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
            {this.props.clients && this.props.clients.length === 0 ? (
              <NoData message="No Client Created" />
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
  clients: state.clientReducer.clients,
  client: state.clientReducer.clientCreated,
  loading: state.clientReducer.loadingClient,
  pet: state.clientReducer.pet,
  petCategories: state.petCategoryReducer.petsCategory
});

export default connect(
  mapStateToProps,
  {
    createClientRequest,
    getAllClientsRequest,
    getClientsByIdRequest,
    updateClientRequest,
    deleteClientRequest,
    deactivateClientRequest,
    activateClientRequest,
    addPetToClientRequest,
    getPetByIdRequest,
    deletePetRequest,
    updatePetsRequest,
    getAllPetsCategoryRequest
  }
)(Client);
