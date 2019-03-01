import React, { Component } from "react";
import { connect } from "react-redux";
import { authUser } from "../services/authentication";
import { logout } from "../services/userService";
import AdminWrapper from "./styles/AdminWrapper";
import Link from "../components/Link";

class AdminContainer extends Component {
  componentDidMount() {
    this.props.authUser();
  }

  render() {
    return (
      <AdminWrapper>
        <header>
          <div className="row">
            <div className="col-md-3">
              <div className="logo">
                <Link href="/">
                  <a>
                    Appetments
                    <span className="icon">
                      <i className="fas fa-circle" />
                    </span>
                  </a>
                </Link>
              </div>
            </div>
            <div className="col-md-9">
              <ul>
                <li>
                  <span>
                    <i title="Notification" className="far fa-bell" />
                  </span>
                </li>
                <li>
                  <div className="dropdown">
                    <span
                      className="dropdown-toggle"
                      id="dropdownMenuButton"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <i title="Profile" className="far fa-user" />
                    </span>
                    <div
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuButton"
                    >
                      <React.Fragment>
                        <Link href="/settings">
                          <span>My Settings</span>
                        </Link>
                        <Link href="/setup">
                          <span>Account Setup</span>
                        </Link>
                        <Link href="/login">
                          <span onClick={logout}>Logout</span>
                        </Link>
                      </React.Fragment>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </header>
        <div className="nav">
          <ul>
            <li className="search">
              <div className="search">
                <input type="text" placeholder="Search...." />
                <span className="icon">
                  <i className="material-icons"> search </i>
                </span>
              </div>
            </li>
            <li>
              <Link activeClassName="active" href="/dashboard">
                <a>
                  <span className="icon">
                    <i className="material-icons"> dashboard </i>
                  </span>
                  <span className="text">Dashboard</span>
                </a>
              </Link>
            </li>
            <li>
              <Link activeClassName="active" href="/calender">
                <a>
                  <span className="icon">
                    <i className="material-icons"> calendar_today </i>
                  </span>
                  <span className="text">Calender</span>
                </a>
              </Link>
            </li>
            <li>
              <Link activeClassName="active" href="/daily-sales">
                <a>
                  <span className="icon">
                    <i className="material-icons"> list </i>
                  </span>
                  <span className="text">Sales</span>
                </a>
              </Link>
            </li>
            <li>
              <Link activeClassName="active" href="/client">
                <a>
                  <span className="icon">
                    <i className="material-icons"> insert_emoticon </i>
                  </span>
                  <span className="text">Client</span>
                </a>
              </Link>
            </li>
            <li>
              <Link activeClassName="active" href="/messages">
                <a>
                  <span className="icon">
                    <i className="material-icons"> question_answer </i>
                  </span>
                  <span className="text">Messages</span>
                </a>
              </Link>
            </li>
            <li>
              <Link activeClassName="active" href="/staff-members">
                <a>
                  <span className="icon">
                    <i className="material-icons"> supervisor_account </i>
                  </span>
                  <span className="text">Staff</span>
                </a>
              </Link>
            </li>
            <li>
              <Link
                activeClassName="active"
                as="/service-groups"
                href="/service-groups"
              >
                <a>
                  <span className="icon">
                    <i className="material-icons"> format_list_bulleted </i>
                  </span>
                  <span className="text">Services</span>
                </a>
              </Link>
            </li>
            <li>
              <Link activeClassName="active" href="/product-categories">
                <a>
                  <span className="icon">
                    <i className="material-icons"> playlist_add_check </i>
                  </span>
                  <span className="text">Product</span>
                </a>
              </Link>
            </li>
            {/* <li>
              <Link activeClassName="active" href="/payment">
                <a>
                  <span className="icon">
                    <i className="material-icons"> bar_chart </i>
                  </span>
                  <span className="text">Payment</span>
                </a>
              </Link>
            </li> */}
            <li>
              <Link activeClassName="active" href="/booking">
                <a>
                  <span className="icon">
                    <i className="material-icons"> cloud_done </i>
                  </span>
                  <span className="text">Online Booking</span>
                </a>
              </Link>
            </li>
            <li>
              <Link activeClassName="active" href="/setup">
                <a>
                  <span className="icon">
                    <i className="material-icons"> settings </i>
                  </span>
                  <span className="text">Setup</span>
                </a>
              </Link>
            </li>
          </ul>
          {/* <footer>
            <ul>
              <li>
                <Link href="/settings">
                  <a
                    data-toggle="tooltip"
                    data-placement="top"
                    title="My Setting"
                  >
                    <i className="fas fa-cogs" />
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/setup">
                  <a
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Account Setup"
                  >
                    <i className="fas fa-tools" />
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/login">
                  <a data-toggle="tooltip" data-placement="top" title="Logout">
                    <i className="fas fa-sign-out-alt" />
                  </a>
                </Link>
              </li>
            </ul>
          </footer> */}
        </div>
        <div className="content">
          <div className="content-wrap">{this.props.children}</div>
        </div>
      </AdminWrapper>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { authUser }
)(AdminContainer);
