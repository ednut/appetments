import React, { Component } from "react";
import { connect } from "react-redux";
import Services from "./services";
import styled from "styled-components";
import { shadowStyle, color, height } from "../components/styles/constant";
import {
  createServiceRequest,
  getAllServiceRequest,
  updateServiceRequest,
  addStaffRequest,
  deleteServiceRequest
} from "../modules/serviceModule";
import { getAllServiceGroupsRequest } from "../modules/serviceGroupModule";
import { getAllStaffsRequest } from "../modules/staffModule";
import SpinerWrap from "../components/Spinner";
import Button from "../components/styles/Button";
import CreateServiceModal from "./services/createServiceModal";
import UpdateServiceModal from "./services/updateServiceModal";
import AddStaffToService from "./services/addStaffToServiceModal";
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
          span.add {
            visibility: visible;
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
        span.add {
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

class CreateService extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      group: "",
      duration: "",
      staff: [],
      description: "",
      service: "",
      selected: false,
      submitted: false,
      openCreateService: false,
      openUpdateService: false,
      openStaffService: false
    };
  }
  componentDidMount() {
    this.props.getAllServiceRequest();
    this.props.getAllServiceGroupsRequest();
    this.props.getAllStaffsRequest();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.service) {
      this.props.getAllServiceRequest();
    }
    if (nextProps.addingStaff) {
      this.props.getAllServiceRequest();
    }
  }

  handleCreateSubmit = e => {
    e.preventDefault();
    const { name, group, duration, staff, description } = this.state;
    this.setState({ submitted: true });
    const data = {
      name: name,
      group: group,
      staff: staff.length !== 0 ? staff.split() : [],
      duration: duration,
      description: description
    };
    if (name && group && duration && description) {
      this.props.createServiceRequest(data);
      this.setState({ openCreateService: false });
    }
  };

  handleUpdateSubmit = e => {
    e.preventDefault();
    const { name, group, duration, staff, description } = this.state;
    this.setState({ submitted: true });
    const data = {
      name: name,
      group: group,
      staff: staff.length !== 0 ? staff.split() : [],
      duration: duration,
      description: description
    };
    if (name && group && duration && description) {
      this.props.updateServiceRequest(data, this.state.id);
      this.setState({ openUpdateService: false });
    }
  };

  handleStaffSubmit = e => {
    e.preventDefault();
    const { name, staff } = this.state;
    this.setState({ submitted: true });
    const data = {
      service: this.state.service,
      staff: staff.split(",")
    };
    if (staff) {
      this.props.addStaffRequest(data);
      this.setState({ openStaffService: false });
    }
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  // checkedItems = [];
  // handleBulkActions = obj => {
  //   this.checkedItems.push(obj.id);
  //   console.log(this.checkedItems);
  //   for (let i = 1; i < this.checkedItems.length; i++) {
  //     if (this.checkedItems[i] === obj.id) {
  //       this.checkedItems.splice(i, 1);
  //     }
  //   }
  //   console.log(this.checkedItems);
  //   debugger;
  // };

  onOpenStaffModal = () => {
    this.setState({ openStaffService: true });
  };
  onCloseStaffModal = () => {
    this.setState({ openStaffService: false });
  };

  onOpenCreateModal = () => {
    this.setState({ openCreateService: true });
  };

  onCloseCreateModal = () => {
    this.setState({ openCreateService: false });
  };

  onOpenUpdateModal = () => {
    this.setState({ openUpdateService: true });
  };

  onCloseUpdateModal = () => {
    this.setState({ openUpdateService: false });
  };

  updateService = service => {
    this.setState({
      id: service.id,
      name: service.name,
      group: service.group,
      duration: service.duration,
      description: service.description,
      openUpdateService: true
    });
    this.setState({ openUpdateService: true });
  };

  addingStaffToService = staff => {
    this.setState({
      staff: staff.staff,
      service: staff.id
    });
    this.setState({ openStaffService: true });
  };

  deleteService = id => {
    this.props.deleteServiceRequest(id);
  };

  ids = [];

  render() {
    if (this.props.services !== undefined) {
      return (
        <Services>
          <ContentWrap>
            {this.props.loading === true ? <SpinerWrap /> : null}
            <CreateServiceModal
              modalState={this.state}
              onCloseModal={this.onCloseCreateModal}
              handleChange={this.handleChange}
              handleSubmit={this.handleCreateSubmit}
              serviceGroup={this.props.serviceGroups}
              staff={this.props.staffs}
              loading={this.props.loading}
              title={"Create Service"}
            />
            <UpdateServiceModal
              modalState={this.state}
              onCloseModal={this.onCloseUpdateModal}
              handleChange={this.handleChange}
              handleSubmit={this.handleUpdateSubmit}
              serviceGroup={this.props.serviceGroups}
              staff={this.props.staffs}
              loading={this.props.loading}
              title={"Update Service"}
            />
            <AddStaffToService
              modalState={this.state}
              onCloseModal={this.onCloseStaffModal}
              handleChange={this.handleChange}
              handleSubmit={this.handleStaffSubmit}
              staff={this.props.staffs}
              loading={this.props.loading}
              title={"Add Staff to Service"}
            />
            <div className="action-wrap">
              <Button
                buttonColor={color.brandColor}
                textColor={color.whiteColor}
                onClick={this.onOpenCreateModal}
              >
                Create Service
              </Button>
            </div>
            <table className="table table-borderless">
              <thead>
                <tr>
                  {/* <th /> */}
                  <th>Service Name</th>
                  <th>Group</th>
                  <th>Duration</th>
                  <th>Staff</th>
                  <th>Description</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {this.props.services.map(x => (
                  <tr key={x.id}>
                    {/* <td>
                      <input
                        type="checkbox"
                        onChange={() => this.handleBulkActions(x)}
                        name="selected"
                        id={x.id}
                      />
                    </td> */}
                    <td
                      onClick={() => {
                        this.updateService(x);
                      }}
                    >
                      {x.name}
                    </td>
                    <td>{x.group}</td>
                    <td>
                      {x.duration} {"minutes"}
                    </td>
                    <td>{x.staff}</td>
                    <td>{x.description}</td>
                    <td className="action">
                      <span
                        onClick={() => this.addingStaffToService(x)}
                        className="add"
                      >
                        + Add Staff
                      </span>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <span
                        onClick={() => this.deleteService(x.id)}
                        className="add"
                      >
                        Delete Service
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {this.props.services.length === 0 ? (
              <NoData message="No Service Created Yet." />
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
  staffs: state.staffReducer.staffs,
  serviceGroups: state.serviceGroupReducer.serviceGroups,
  services: state.serviceReducer.services,
  service: state.serviceReducer.service,
  addingStaff: state.serviceReducer.staffAddedService,
  loading: state.serviceReducer.loading
});

export default connect(
  mapStateToProps,
  {
    createServiceRequest,
    getAllServiceRequest,
    updateServiceRequest,
    getAllServiceGroupsRequest,
    getAllStaffsRequest,
    addStaffRequest,
    deleteServiceRequest
  }
)(CreateService);
