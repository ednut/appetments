import React, { Component } from "react";
import { connect } from "react-redux";
import Staff from "./staff";
import styled from "styled-components";
import { shadowStyle, color, height } from "../components/styles/constant";
import {
  getAllStaffsRequest,
  createStaffRequest,
  updateStaffRequest,
  deleteStaffRequest
} from "../modules/staffModule";
import SpinerWrap from "../components/Spinner";
import Button from "../components/styles/Button";
import CreateStaffModal from "./staff/createStaffModal";
import UpdateStaffModal from "./staff/updateStaffModal";
import NoData from "../components/NoData";

const ContentWrap = styled.div`
  position: relative;
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

class StaffMembers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      first_name: "",
      last_name: "",
      password: "",
      email: "",
      submitted: false,
      openCreateStaff: false,
      openUpdateStaff: false
    };
  }
  componentDidMount() {
    this.props.getAllStaffsRequest();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.staff) {
      this.props.getAllStaffsRequest();
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
      this.props.createStaffRequest(data);
      this.setState({ openCreateStaff: false });
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
      this.props.updateStaffRequest(data, this.state.id);
      this.setState({ openUpdateStaff: false });
    }
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onOpenCreateModal = () => {
    this.setState({ openCreateStaff: true });
  };

  onCloseCreateModal = () => {
    this.setState({ openCreateStaff: false });
  };

  onOpenUpdateModal = () => {
    this.setState({ openUpdateStaff: true });
  };

  onCloseUpdateModal = () => {
    this.setState({ openUpdateStaff: false });
  };

  updateStaff = staff => {
    this.setState({
      id: staff.id,
      first_name: staff.first_name,
      last_name: staff.last_name,
      openUpdateStaff: true
    });
    this.setState({ openUpdateStaff: true });
  };

  deleteStaff = id => {
    this.props.deleteStaffRequest(id);
  };

  render() {
    if (this.props.staffs !== undefined) {
      return (
        <Staff>
          <ContentWrap>
            {this.props.loading === true ? <SpinerWrap /> : null}

            <CreateStaffModal
              modalState={this.state}
              onCloseModal={this.onCloseCreateModal}
              handleChange={this.handleChange}
              handleSubmit={this.handleCreateSubmit}
              loading={this.props.loading}
              title={"Create Staff"}
            />
            <UpdateStaffModal
              modalState={this.state}
              onCloseModal={this.onCloseUpdateModal}
              handleChange={this.handleChange}
              handleSubmit={this.handleUpdateSubmit}
              loading={this.props.loading}
              title={"Update Staff"}
            />

            <div className="action-wrap">
              <Button
                buttonColor={color.brandColor}
                textColor={color.whiteColor}
                onClick={this.onOpenCreateModal}
              >
                Add New Staff
              </Button>
            </div>

            <table className="table table-borderless">
              <thead>
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {this.props.staffs.map(x => (
                  <tr key={x.id}>
                    <td
                      onClick={() => {
                        this.updateStaff(x);
                      }}
                    >
                      {x.first_name}
                    </td>
                    <td
                      onClick={() => {
                        this.updateStaff(x);
                      }}
                    >
                      {x.last_name}
                    </td>
                    <td
                      onClick={() => {
                        this.updateStaff(x);
                      }}
                    >
                      {x.email}
                    </td>
                    <td
                      className="action"
                      onClick={() => this.deleteStaff(x.id)}
                    >
                      <span className="delete">delete</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {this.props.staffs.length === 0 ? (
              <NoData message="No Staff Created Yet" />
            ) : null}
          </ContentWrap>
        </Staff>
      );
    } else {
      return (
        <Staff>
          <ContentWrap>
            <SpinerWrap />
          </ContentWrap>
        </Staff>
      );
    }
  }
}

const mapStateToProps = state => ({
  staffs: state.staffReducer.staffs,
  staff: state.staffReducer.staff,
  loading: state.staffReducer.loading
});

export default connect(
  mapStateToProps,
  {
    getAllStaffsRequest,
    createStaffRequest,
    updateStaffRequest,
    deleteStaffRequest
  }
)(StaffMembers);
