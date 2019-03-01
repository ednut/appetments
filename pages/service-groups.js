import React, { Component } from "react";
import { connect } from "react-redux";
import Services from "./services";
import styled from "styled-components";
import { shadowStyle, color, height } from "../components/styles/constant";
import {
  createServiceGroupRequest,
  getAllServiceGroupsRequest,
  updateServiceGroupRequest,
  deleteServiceGroupRequest
} from "../modules/serviceGroupModule";
import SpinerWrap from "../components/Spinner";
import Button from "../components/styles/Button";
import CreateServiceGroupModal from "./services/createServiceGroupModal";
import UpdateServiceGroupModal from "./services/updateServiceGroupModal";
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

class ServiceGroups extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      appointment_color: "",
      description: "",
      submitted: false,
      openCreateServiceGroup: false,
      openUpdateServiceGroup: false
    };
  }
  componentDidMount() {
    this.props.getAllServiceGroupsRequest();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.serviceGroup) {
      this.props.getAllServiceGroupsRequest();
    }
  }

  handleCreateSubmit = e => {
    e.preventDefault();
    const { name, appointment_color, description } = this.state;
    this.setState({ submitted: true });
    const data = {
      name: name,
      appointment_color: appointment_color,
      description: description
    };
    if (name && appointment_color && description) {
      this.props.createServiceGroupRequest(data);
      this.setState({ openCreateServiceGroup: false });
    }
  };

  handleUpdateSubmit = e => {
    e.preventDefault();
    const { name, appointment_color, description } = this.state;
    this.setState({ submitted: true });
    const data = {
      name: name,
      appointment_color: appointment_color,
      description: description
    };
    if (name && appointment_color && description) {
      this.props.updateServiceGroupRequest(data, this.state.id);
      this.setState({ openUpdateServiceGroup: false });
    }
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onOpenCreateModal = () => {
    this.setState({ openCreateServiceGroup: true });
  };

  onCloseCreateModal = () => {
    this.setState({ openCreateServiceGroup: false });
  };

  onOpenUpdateModal = () => {
    this.setState({ openUpdateServiceGroup: true });
  };

  onCloseUpdateModal = () => {
    this.setState({ openUpdateServiceGroup: false });
  };

  updateServiceGroup = serviceGroup => {
    console.log("update", serviceGroup);
    this.setState({
      id: serviceGroup.id,
      name: serviceGroup.name,
      appointment_color: serviceGroup.appointment_color,
      description: serviceGroup.description,
      openUpdateServiceGroup: true
    });
  };

  deleteServiceGroup = id => {
    this.props.deleteServiceGroupRequest(id);
  };

  render() {
    if (this.props.serviceGroups !== undefined) {
      return (
        <Services>
          <ContentWrap>
            {this.props.loading === true ? <SpinerWrap /> : null}
            <CreateServiceGroupModal
              modalState={this.state}
              onCloseModal={this.onCloseCreateModal}
              handleChange={this.handleChange}
              handleSubmit={this.handleCreateSubmit}
              loading={this.props.loading}
              title={"Create Service Group"}
            />
            <UpdateServiceGroupModal
              modalState={this.state}
              onCloseModal={this.onCloseUpdateModal}
              handleChange={this.handleChange}
              handleSubmit={this.handleUpdateSubmit}
              loading={this.props.loading}
              title={"Update Service Group"}
            />
            <div className="action-wrap">
              {/* <Button
                buttonColor={color.brandColor}
                textColor={color.whiteColor}
                onClick={this.onOpenCreateModal}
              >
                Create Service Group
              </Button> */}

              <button onClick={this.onOpenCreateModal}>
                <i className="material-icons"> add </i>
              </button>
            </div>
            <TableWrapper>
              <table>
                <thead>
                  <tr>
                    <th>Color</th>
                    <th>Service Group Name</th>
                    <th>Description</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {this.props.serviceGroups.map(x => (
                    <tr key={x.id}>
                      <td style={{ width: "14rem" }}>
                        <span
                          style={{
                            width: "3rem",
                            height: "3rem",
                            borderRadius: "50%",
                            background: x.appointment_color,
                            display: "inline-block"
                          }}
                        />
                      </td>
                      <td>{x.name}</td>
                      <td>{x.description}</td>
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
                                this.updateServiceGroup(x);
                              }}
                              className="dropdown-item"
                            >
                              Edit
                            </a>
                            <a
                              onClick={() => this.deleteServiceGroup(x.id)}
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
            {this.props.serviceGroups.length === 0 ? (
              <NoData message="No Service Group Created Yet." />
            ) : null}
          </ContentWrap>
        </Services>
      );
    } else {
      return (
        <Services>
          <ContentWrap>
            <SpinerWrap />
          </ContentWrap>
        </Services>
      );
    }
  }
}

const mapStateToProps = state => ({
  serviceGroups: state.serviceGroupReducer.serviceGroups,
  serviceGroup: state.serviceGroupReducer.serviceGroup,
  loading: state.serviceGroupReducer.loading
});

export default connect(
  mapStateToProps,
  {
    createServiceGroupRequest,
    getAllServiceGroupsRequest,
    updateServiceGroupRequest,
    deleteServiceGroupRequest
  }
)(ServiceGroups);
