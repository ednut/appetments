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
      price: "",
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
    const { name, group, duration, staff, price, description } = this.state;
    this.setState({ submitted: true });
    const data = {
      name: name,
      group: group,
      staff: staff.length !== 0 ? staff.split() : [],
      duration: duration,
      price: parseInt(price),
      description: description
    };
    if (name && group && duration && price && description) {
      this.props.createServiceRequest(data);
      this.setState({ openCreateService: false });
    }
  };

  handleUpdateSubmit = e => {
    e.preventDefault();
    const { name, group, duration, staff, price, description } = this.state;
    this.setState({ submitted: true });
    const data = {
      name: name,
      group: group,
      staff: staff.length !== 0 ? staff.split() : [],
      duration: duration,
      price: parseInt(price),
      description: description
    };
    if (name && group && duration && price && description) {
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
      price: service.price,
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
              {/* <Button
                buttonColor={color.brandColor}
                textColor={color.whiteColor}
                onClick={this.onOpenCreateModal}
              >
                Create Service
              </Button> */}
              <button onClick={this.onOpenCreateModal}>
                <i className="material-icons"> add </i>
              </button>
            </div>
            <TableWrapper>
              <table>
                <thead>
                  <tr>
                    {/* <th /> */}
                    <th>Service Name</th>
                    <th>Group</th>
                    <th>Duration</th>
                    <th>Retail Price</th>
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
                      <td>{x.name}</td>
                      <td>{x.group}</td>
                      <td>
                        {x.duration} {"minutes"}
                      </td>
                      <td>
                        {"$"}
                        {x.price}
                      </td>
                      <td>
                        {x.staff_details.map(x => (
                          <span className="multi" key={x.id}>
                            {x.full_name}
                          </span>
                        ))}
                      </td>
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
                                this.addingStaffToService(x);
                              }}
                              className="dropdown-item"
                            >
                              Add Staff
                            </a>
                            <a
                              onClick={() => {
                                this.updateService(x);
                              }}
                              className="dropdown-item"
                            >
                              Edit
                            </a>
                            <a
                              onClick={() => this.deleteService(x.id)}
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
