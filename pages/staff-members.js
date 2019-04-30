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
import { Table, Divider } from "antd";

const StaffContentWrap = styled.div`
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
      const columns = [
        {
          title: "First Name",
          dataIndex: "first_name",
          key: "first_name"
        },
        {
          title: "Last Name",
          dataIndex: "last_name",
          key: "last_name"
        },
        {
          title: "Email",
          dataIndex: "email",
          key: "email"
        },
        {
          title: "Action",
          key: "action",
          dataIndex: "action",
          render: (x, record) => (
            <span>
              <a
                onClick={() => {
                  this.updateStaff(x);
                }}
                href="javascript:;"
              >
                Edit
              </a>

              <Divider type="vertical" />
              <a onClick={() => this.deleteStaff(x.id)} href="javascript:;">
                Delete
              </a>
            </span>
          )
        }
      ];

      const data = this.props.staffs.map(function(x) {
        return {
          key: x.id,
          first_name: x.first_name,
          last_name: x.last_name,
          email: x.email,
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
        <Staff>
          <StaffContentWrap>
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
            <Table
              rowSelection={rowSelection}
              columns={columns}
              dataSource={data}
            />
            {this.props.staffs.length === 0 ? (
              <NoData message="No Staff Created Yet" />
            ) : null}
          </StaffContentWrap>
        </Staff>
      );
    } else {
      return (
        <Staff>
          <StaffContentWrap>
            <SpinerWrap />
          </StaffContentWrap>
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
