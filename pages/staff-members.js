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
import TableWrapper from "../components/styles/TableWrap";

const ContentWrap = styled.div`
  position: relative;
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
              {/* <Button
                buttonColor={color.brandColor}
                textColor={color.whiteColor}
                onClick={this.onOpenCreateModal}
              >
                Add New Staff
              </Button> */}

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
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {this.props.staffs.map(x => (
                    <tr key={x.id}>
                      <td>{x.first_name}</td>
                      <td>{x.last_name}</td>
                      <td>{x.email}</td>
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
                                this.updateStaff(x);
                              }}
                              className="dropdown-item"
                            >
                              Edit
                            </a>
                            <a
                              onClick={() => this.deleteStaff(x.id)}
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
