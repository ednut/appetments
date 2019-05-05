import React, { Component } from "react";
import { connect } from "react-redux";
import { authUser } from "../services/authentication";
import { getUserRequest } from "../modules/user";
import SubNav from "./Menu";
import AdminWrapper from "./styles/AdminWrapper";
import Link from "../components/Link";
import { Icon, Menu, Dropdown } from "antd";

class AdminContainer extends Component {
  componentDidMount() {
    this.props.authUser();
    this.props.getUserRequest();
  }

  render() {
    const staff = (
      <Menu>
        <Menu.Item key="0">
          <Link href="/staff-members">
            <a>Staff Members</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="1">
          <Link href="#">
            <a>Permision Levels</a>
          </Link>
        </Menu.Item>
      </Menu>
    );
    const services = (
      <Menu>
        <Menu.Item key="0">
          <Link href="/service-groups">
            <a>Service Groups</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="1">
          <Link href="/create-services">
            <a>Services</a>
          </Link>
        </Menu.Item>
      </Menu>
    );

    const inventory = (
      <Menu>
        <Menu.Item key="0">
          <Link href="/product-categories">
            <a>Product Categories</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="1">
          <Link href="/create-products">
            <a>Product</a>
          </Link>
        </Menu.Item>
      </Menu>
    );

    const setup = (
      <Menu>
        <Menu.Item key="0">
          <Link href="/company-details">
            <a>Company Details</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="1">
          <Link href="/locations">
            <a>Locations</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link href="/pet-category">
            <a>Pet Categories</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Link href="/calender-settings">
            <a>Calendar Settings</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="4">
          <Link href="#">
            <a>Client Notifications</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="5">
          <Link href="#">
            <a>Discount Types</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="6">
          <Link href="#">
            <a>Account Details</a>
          </Link>
        </Menu.Item>
      </Menu>
    );
    return (
      <AdminWrapper>
        <SubNav user={this.props.user} />
        <div className="main-nav">
          <ul>
            <li>
              <Link activeClassName="active" href="/dashboard">
                <a>
                  <span className="text">Dashboard</span>
                </a>
              </Link>
            </li>
            <li>
              <Link activeClassName="active" href="/calender">
                <a>
                  <span className="text">Calender</span>
                </a>
              </Link>
            </li>
            <li>
              <Link activeClassName="active" href="/daily-sales">
                <a>
                  <span className="text">Sales</span>
                </a>
              </Link>
            </li>
            <li>
              <Link activeClassName="active" href="/client">
                <a>
                  <span className="text">Client</span>
                </a>
              </Link>
            </li>
            <li>
              <Link activeClassName="active" href="/messages">
                <a>
                  <span className="text">Messages</span>
                </a>
              </Link>
            </li>
            <li className="with-dropdown">
              <Dropdown overlay={staff} trigger={["click"]}>
                <span className="text">
                  Staff&nbsp;&nbsp; <Icon type="down" />
                </span>
              </Dropdown>
            </li>
            <li className="with-dropdown">
              <Dropdown overlay={services} trigger={["click"]}>
                <span className="text">
                  Services&nbsp;&nbsp; <Icon type="down" />
                </span>
              </Dropdown>
            </li>
            <li className="with-dropdown">
              <Dropdown overlay={inventory} trigger={["click"]}>
                <span className="text">
                  Inventory&nbsp;&nbsp; <Icon type="down" />
                </span>
              </Dropdown>
            </li>
            <li>
              <Link activeClassName="active" href="/booking">
                <a>
                  <span className="text">Online Booking</span>
                </a>
              </Link>
            </li>
            <li className="with-dropdown">
              <Dropdown overlay={setup} trigger={["click"]}>
                <span className="text">
                  Setup&nbsp;&nbsp; <Icon type="down" />
                </span>
              </Dropdown>
            </li>
          </ul>
        </div>
        <div className="content-wrap">{this.props.children}</div>
      </AdminWrapper>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.user.user
});

export default connect(
  mapStateToProps,
  { authUser, getUserRequest }
)(AdminContainer);
