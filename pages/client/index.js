import React, { Component } from "react";
import { connect } from "react-redux";
import {
  createClientRequest,
  getAllClientsRequest,
  getClientsByIdRequest,
  updateClientRequest,
  deleteClientRequest,
  deactivateClientRequest,
  addPetToClientRequest,
  getPetByIdRequest
} from "../../modules/clientModule";
import SpinerWrap from "../../components/Spinner";
import AdminContainer from "../../components/AdminContainer";
import Button from "../../components/styles/Button";
import CreateClientModal from "./createClientModal";
import UpdateClientModal from "./updateClientModal";
import AddPetToClient from "./addPetToClientModal";
import styled from "styled-components";
import { color, height } from "../../components/styles/constant";
import TableWrapper from "../../components/styles/TableWrap";
import NoData from "../../components/NoData";

const ContentWrap = styled.div`
  .action-wrap {
    margin-bottom: ${height.gutterHeight};
    text-align: right;
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
      pet_type: "",
      submitted: false,
      openCreateClient: false,
      openUpdateClient: false,
      openPetService: false
    };
  }
  componentDidMount() {
    this.props.getAllClientsRequest();
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
    const { name, pet_type } = this.state;
    this.setState({ submitted: true });
    const data = {
      name: name,
      pet_type: pet_type
    };
    if ((name, pet_type)) {
      this.props.addPetToClientRequest(data, this.state.id);
      this.setState({ openPetService: false });
    }
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
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

  addingPetToClient = x => {
    this.setState({
      name: x.name,
      pet_type: x.pet_type,
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

  deleteClient = id => {
    this.props.deleteClientRequest(id);
  };

  render() {
    console.log(this.props.client);
    if (this.props.clients !== undefined) {
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
              loading={this.props.loading}
              title={"Add Pet to Client"}
            />

            <div className="action-wrap">
              <button onClick={this.onOpenCreateModal}>
                <i className="material-icons"> add </i>
              </button>
            </div>
            <TableWrapper>
              <table>
                <thead>
                  <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Phone Number</th>
                    <th>Pet</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {this.props.clients.map(x => (
                    <tr key={x.id}>
                      <td>{x.first_name}</td>
                      <td>{x.last_name}</td>
                      <td>{x.email}</td>
                      <td>{x.phone_number}</td>
                      <td style={{ width: "25%" }}>
                        {x.pets && x.pets.length > 0 ? (
                          x.pets.map(pet => (
                            <span key={pet.id} className="multi">
                              {pet.name}
                            </span>
                          ))
                        ) : (
                          <span className="red">
                            <strong>No pet created for this client</strong>
                          </span>
                        )}
                      </td>

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
                            <a
                              onClick={() => {
                                this.addingPetToClient(x);
                              }}
                              className="dropdown-item"
                            >
                              Add Pet
                            </a>
                            <a
                              onClick={() => {
                                this.updateClient(x);
                              }}
                              className="dropdown-item"
                            >
                              Edit
                            </a>
                            <a
                              onClick={() => this.deleteClient(x.id)}
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
  pet: state.clientReducer.pet
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
    addPetToClientRequest,
    getPetByIdRequest
  }
)(Client);
