import React, { Component } from "react";
import { connect } from "react-redux";
import Staff from "./staff";
import styled from "styled-components";
import { shadowStyle, color, height } from "../components/styles/constant";
import {
  getAllStaffsRequest,
  createStaffRequest
} from "../modules/staffModule";
import SpinerWrap from "../components/Spinner";
import Button from "../components/styles/Button";
import Modal from "react-responsive-modal";
import FormInput from "../components/styles/FormInput";

const ContentWrap = styled.div`
  table {
    background-color: ${color.whiteColor};
    box-shadow: ${shadowStyle.lightShadow};
    border-bottom: none;
    th {
      padding: 1rem;
      color: ${color.textLight};
    }
    td {
      padding: 2rem 1rem;
      border-top: 1px solid ${color.borderColor};
      color: ${color.textColor};
    }
    tbody tr:hover {
      box-shadow: ${shadowStyle.shadow};
      cursor: pointer;
    }
  }
`;

class StaffMembers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: "",
      last_name: "",
      password: "",
      email: "",
      submitted: false,
      open: false
    };
  }
  componentDidMount() {
    this.props.getAllStaffsRequest();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.staff && this.props.staffs) {
      // this.props.getAllStaffsRequest();
    }
  }

  handleSubmit = e => {
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
    }
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  ready = () => {
    if (this.props.staffs) {
      return true;
    } else {
      return <SpinerWrap />;
    }
  };

  render() {
    const {
      first_name,
      last_name,
      email,
      password,
      submitted,
      open
    } = this.state;
    if (this.props.staffs !== undefined) {
      return (
        <Staff>
          {this.props.loading === true ? <SpinerWrap /> : null}
          <Modal open={open} onClose={this.onCloseModal}>
            <FormInput>
              <form onSubmit={this.handleSubmit}>
                <div className="form-wrap">
                  <label htmlFor="">First Name</label>
                  <input
                    type="text"
                    onChange={this.handleChange}
                    name="first_name"
                    placeholder="Enter Your First Name"
                  />
                  {submitted && !first_name && (
                    <div className="error">First name is required</div>
                  )}
                </div>
                <div className="form-wrap">
                  <label htmlFor="">Last Name</label>
                  <input
                    type="text"
                    name="last_name"
                    onChange={this.handleChange}
                    placeholder="Enter Your Last Name"
                  />
                  {submitted && !last_name && (
                    <div className="error">Last name is required</div>
                  )}
                </div>
                <div className="form-wrap">
                  <label htmlFor="">Email</label>
                  <input
                    type="email"
                    name="email"
                    onChange={this.handleChange}
                    placeholder="Enter Your email"
                  />
                  {submitted && !email && (
                    <div className="error">email is required</div>
                  )}
                </div>
                <div className="form-wrap">
                  <label htmlFor="">Password</label>
                  <input
                    type="password"
                    name="password"
                    onChange={this.handleChange}
                    placeholder="Enter Your password"
                  />
                  {submitted && !password && (
                    <div className="error">password is required</div>
                  )}
                </div>

                <Button
                  buttonColor={color.brandColor}
                  textColor={color.whiteColor}
                  type="submit"
                  className="button full"
                  onClick={this.onCloseModal}
                >
                  {" "}
                  {this.props.loading ? "Loading...." : "Create Staff"}
                </Button>
                <span>{this.props.error}</span>
              </form>
            </FormInput>
          </Modal>
          <div className="col-md-12">
            <Button
              buttonColor={color.brandColor}
              textColor={color.whiteColor}
              className="float-right"
              onClick={this.onOpenModal}
            >
              Add New Staff
            </Button>
            <br />
            <br />
            <br />
          </div>
          <ContentWrap>
            <table className="table table-borderless">
              <thead>
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {this.props.staffs.map(staff => (
                  <tr key={staff.id}>
                    <td>{staff.first_name}</td>
                    <td>{staff.last_name}</td>
                    <td>{staff.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </ContentWrap>
        </Staff>
      );
    } else {
      return <SpinerWrap />;
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
  { getAllStaffsRequest, createStaffRequest }
)(StaffMembers);
