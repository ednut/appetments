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
import { Table, Divider, Tag, Popconfirm } from "antd";

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
      const columns = [
        {
          title: "Service Name",
          dataIndex: "service_name",
          key: "service_name"
        },
        {
          title: "Group",
          dataIndex: "group",
          key: "group"
        },
        {
          title: "Duration",
          dataIndex: "duration",
          key: "duration",
          render: x => (
            <span>
              {x}
              {" minutes"}
            </span>
          )
        },
        {
          title: "Retail Price",
          dataIndex: "retail_price",
          key: "retail_price",
          render: x => (
            <span>
              {"$"}
              {x}
            </span>
          )
        },
        {
          title: "Staff",
          key: "staff",
          dataIndex: "staff",
          render: staffs => (
            <span>
              {staffs.map(x => {
                return (
                  <Tag key={x}>
                    {x !== "No Staff Created" ? (
                      <span
                      // onClick={() => {
                      //   this.updateStaff(x);
                      // }}
                      >
                        {x}
                      </span>
                    ) : (
                      <span>{x}</span>
                    )}

                    {x !== "No Staff Created" ? (
                      <Popconfirm
                        title="Are you sure you want to delete this staff?"
                        onConfirm={() =>
                          console.log("functionality not present yet")
                        }
                        okText="Yes"
                        cancelText="No"
                      >
                        <span className="icon" style={{ marginLeft: "8px" }}>
                          <i className="fas fa-times" />
                        </span>
                      </Popconfirm>
                    ) : null}
                  </Tag>
                );
              })}
            </span>
          )
        },
        {
          title: "Description",
          dataIndex: "description",
          key: "description"
        },
        {
          title: "Action",
          key: "action",
          dataIndex: "action",
          render: (x, record) => (
            <span>
              <a
                onClick={() => {
                  this.addingStaffToService(x);
                }}
                href="javascript:;"
              >
                Add Staff
              </a>
              <Divider type="vertical" />
              <a
                onClick={() => {
                  this.updateService(x);
                }}
                href="javascript:;"
              >
                Edit
              </a>

              <Divider type="vertical" />
              <Popconfirm
                title="Are you sure you want to delete this service?"
                onConfirm={() => this.deleteService(x.id)}
                okText="Yes"
                cancelText="No"
              >
                <a href="javascript:;">Delete</a>
              </Popconfirm>
            </span>
          )
        }
      ];

      const data = this.props.services.map(function(x) {
        return {
          key: x.id,
          service_name: x.name,
          group: x.group,
          duration: x.duration,
          retail_price: x.price,
          description: x.description,
          staff:
            x.staff_details.map(function(staff) {
              let arr = [];
              arr.push(staff.full_name);
              return arr;
            }).length > 0
              ? x.staff_details.map(function(staff) {
                  let arr = [];
                  arr.push(staff.full_name);
                  return arr;
                })
              : ["No Staff Created"],
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
            <Table
              rowSelection={rowSelection}
              columns={columns}
              dataSource={data}
            />
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
