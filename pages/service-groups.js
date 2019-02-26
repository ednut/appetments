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
              <Button
                buttonColor={color.brandColor}
                textColor={color.whiteColor}
                onClick={this.onOpenCreateModal}
              >
                Create Service Group
              </Button>
            </div>
            <table className="table table-borderless">
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
                    <td
                      onClick={() => {
                        this.updateServiceGroup(x);
                      }}
                      style={{ width: "14rem" }}
                    >
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
                    <td
                      onClick={() => {
                        this.updateServiceGroup(x);
                      }}
                    >
                      {x.name}
                    </td>
                    <td
                      onClick={() => {
                        this.updateServiceGroup(x);
                      }}
                    >
                      {x.description}
                    </td>
                    <td
                      className="action"
                      onClick={() => this.deleteServiceGroup(x.id)}
                    >
                      <span className="delete">delete</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
