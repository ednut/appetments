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
      staff,
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
      staff: staff.length !== 0 ? staff.split() : [],
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
      staff,
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
      staff: staff.length !== 0 ? staff.split() : [],
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
              <Button
                buttonColor={color.brandColor}
                textColor={color.whiteColor}
                onClick={this.onOpenCreateModal}
              >
                Add New Location
              </Button>
            </div>

            <table className="table table-borderless">
              <thead>
                <tr>
                  <th>Location</th>
                  {/* <th>Contact Number</th> */}
                  <th>Contact Email</th>
                  {/* <th>Address</th> */}
                  <th>Zip Code</th>
                  <th>City</th>
                  <th>State</th>
                  <th>Staff</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {this.props.locations.map(x => (
                  <tr key={x.id}>
                    <td
                      onClick={() => {
                        this.updateLocation(x);
                      }}
                    >
                      <strong>{x.location_name}</strong>
                      <br />
                      {x.address}
                      <br />
                      {x.contact_number}
                    </td>
                    {/* <td>{x.contact_number}</td> */}
                    <td>{x.contact_email}</td>
                    {/* <td>{x.address}</td> */}
                    <td>{x.zip_code}</td>
                    <td>{x.city}</td>
                    <td>{x.state}</td>
                    <td>
                      {x.staff.length > 1
                        ? x.staff.map(
                            staff => `${staff.first_name} ${staff.last_name}, `
                          )
                        : x.staff.map(
                            staff => `${staff.first_name} ${staff.last_name}`
                          )}
                    </td>
                    <td style={{ width: "20%" }} className="action">
                      <span
                        onClick={() => this.addingStaffToLocation(x)}
                        className="add"
                      >
                        + Add Staff
                      </span>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <span
                        onClick={() => this.deleteLocation(x.id)}
                        className="add"
                      >
                        Delete Location
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
