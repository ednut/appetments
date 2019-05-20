import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getAllLocationsRequest,
  createLocationRequest,
  updateLocationRequest,
  deleteLocationRequest,
  addStaffToLocationRequest,
  removeStaffFromLocationRequest,
  activateLocationRequest,
  deactivateLocationRequest
} from "../../modules/locationModule";
import { getAllStaffsRequest } from "../../modules/staffModule";
import SpinerWrap from "../../components/Spinner";
import AdminContainer from "../../components/AdminContainer";
import Button from "../../components/styles/Button";
import CreateLocationModal from "./createLocationModal";
import UpdateLocationModal from "./updateLocationModal";
import AddStaffToLocation from "./addStaffToLocationModal";
import styled from "styled-components";
import { color, height } from "../../components/styles/constant";
import TableWrapper from "../../components/styles/TableWrap";
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
  table {
    td:nth-child(2) {
      width: 30rem;
    }
  }
`;

class Location extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      location_name: "",
      contact_number: "",
      contact_email: "",
      address: "",
      city: "",
      state: "",
      zip_code: "",
      staff: [],
      location_id: "",
      submitted: false,
      openCreateLocation: false,
      openUpdateLocation: false,
      openStaffService: false
    };
  }
  componentDidMount() {
    this.props.getAllLocationsRequest();
    this.props.getAllStaffsRequest();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location) {
      this.props.getAllLocationsRequest();
    }
  }

  handleCreateSubmit = e => {
    e.preventDefault();
    const {
      location_name,
      contact_number,
      contact_email,
      address,
      city,
      state,
      zip_code
    } = this.state;
    this.setState({ submitted: true });
    const data = {
      location_name: location_name,
      contact_number: contact_number,
      contact_email: contact_email,
      address: address,
      city: city,
      state: state,
      zip_code: zip_code
    };
    if (
      location_name &&
      contact_number &&
      contact_email &&
      address &&
      city &&
      state
    ) {
      this.props.createLocationRequest(data);
      this.setState({ openCreateLocation: false });
    }
  };

  handleUpdateSubmit = e => {
    e.preventDefault();
    const {
      location_name,
      contact_number,
      contact_email,
      address,
      city,
      state,
      zip_code
    } = this.state;
    this.setState({ submitted: true });
    const data = {
      location_name: location_name,
      contact_number: contact_number,
      contact_email: contact_email,
      address: address,
      city: city,
      state: state,
      zip_code: zip_code
    };
    if (
      location_name &&
      contact_number &&
      contact_email &&
      address &&
      city &&
      state
    ) {
      this.props.updateLocationRequest(data, this.state.id);
      this.setState({ openUpdateLocation: false });
    }
  };

  handleStaffSubmit = e => {
    e.preventDefault();
    const { name, staff } = this.state;
    this.setState({ submitted: true });
    const data = {
      // location_id: this.state.location_id,
      staff: staff.split(",")
    };
    if (staff) {
      this.props.addStaffToLocationRequest(data, this.state.location_id);
      this.setState({ openStaffService: false });
    }
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onOpenCreateModal = () => {
    this.setState({ openCreateLocation: true });
  };

  onCloseCreateModal = () => {
    this.setState({ openCreateLocation: false });
  };

  onOpenUpdateModal = () => {
    this.setState({ openUpdateLocation: true });
  };

  onCloseUpdateModal = () => {
    this.setState({ openUpdateLocation: false });
  };

  onOpenStaffModal = () => {
    this.setState({ openStaffService: true });
  };

  onCloseStaffModal = () => {
    this.setState({ openStaffService: false });
  };

  addingStaffToLocation = x => {
    this.setState({
      staff: x.staff,
      location_id: x.id
    });
    this.setState({ openStaffService: true });
  };

  updateLocation = location => {
    this.setState({
      id: location.id,
      location_name: location.location_name,
      contact_number: location.contact_number,
      contact_email: location.contact_email,
      address: location.address,
      city: location.city,
      state: location.state,
      zip_code: location.zip_code,
      openUpdateLocation: true
    });
  };

  deleteLocation = id => {
    this.props.deleteLocationRequest(id);
  };

  render() {
    if (this.props.locations !== undefined) {
      const columns = [
        {
          title: "Location",
          dataIndex: "location",
          key: "location",
          textWrap: "word-break"
        },
        {
          title: "Contact Email",
          dataIndex: "contact_email",
          key: "contact_email"
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
                        onClick={() => {
                          this.updatePet(x);
                        }}
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
                          this.props.removeStaffFromLocationRequest(x.id)
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
          title: "Zip Code",
          dataIndex: "zip_code",
          key: "zip_code"
        },
        {
          title: "City",
          dataIndex: "city",
          key: "city"
        },
        {
          title: "State",
          dataIndex: "state",
          key: "state"
        },
        {
          title: "Action",
          key: "action",
          dataIndex: "action",
          render: (x, record) => (
            <span>
              <a
                onClick={() => {
                  this.addingStaffToLocation(x);
                }}
                href="javascript:;"
              >
                Add Staff
              </a>
              <Divider type="vertical" />
              <a
                onClick={() => {
                  this.updateLocation(x);
                }}
                href="javascript:;"
              >
                Edit
              </a>

              <Divider type="vertical" />
              <Popconfirm
                title="Are you sure you want to delete this location?"
                onConfirm={() => this.deleteLocation(x.id)}
                okText="Yes"
                cancelText="No"
              >
                <a href="javascript:;">Delete</a>
              </Popconfirm>
            </span>
          )
        }
      ];
      const data = this.props.locations.map(function(x) {
        return {
          key: x.id,
          location: ` ${x.location_name}
          ${x.address}
          ${x.contact_number}`,
          contact_email: x.contact_email,
          zip_code: x.zip_code,
          city: x.city,
          state: x.state,
          staff:
            x.staff.map(function(x) {
              let arr = [];
              arr.push(`${x.first_name} ${x.last_name}`);
              return arr;
            }).length > 0
              ? x.staff.map(function(x) {
                  let arr = [];
                  arr.push(`${x.first_name} ${x.last_name}`);
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
        <AdminContainer>
          <ContentWrap>
            {this.props.loading === true ? <SpinerWrap /> : null}

            <CreateLocationModal
              modalState={this.state}
              onCloseModal={this.onCloseCreateModal}
              handleChange={this.handleChange}
              handleSubmit={this.handleCreateSubmit}
              loading={this.props.loading}
              title={"Create Location"}
            />
            <UpdateLocationModal
              modalState={this.state}
              onCloseModal={this.onCloseUpdateModal}
              handleChange={this.handleChange}
              handleSubmit={this.handleUpdateSubmit}
              loading={this.props.loading}
              title={"Update Location"}
            />

            <AddStaffToLocation
              modalState={this.state}
              onCloseModal={this.onCloseStaffModal}
              handleChange={this.handleChange}
              handleSubmit={this.handleStaffSubmit}
              staff={this.props.staffs}
              loading={this.props.loading}
              title={"Add Staff to Location"}
            />

            <div className="action-wrap">
              {/* <Button
                buttonColor={color.brandColor}
                textColor={color.whiteColor}
                onClick={this.onOpenCreateModal}
              >
                Add New Location
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
            {this.props.locations && this.props.locations.length < 0
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
  locations: state.locationReducer.locations,
  location: state.locationReducer.location,
  loading: state.locationReducer.loading,
  staffs: state.staffReducer.staffs
});

export default connect(
  mapStateToProps,
  {
    getAllLocationsRequest,
    createLocationRequest,
    updateLocationRequest,
    deleteLocationRequest,
    addStaffToLocationRequest,
    removeStaffFromLocationRequest,
    activateLocationRequest,
    deactivateLocationRequest,
    getAllStaffsRequest
  }
)(Location);
