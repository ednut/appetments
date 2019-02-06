import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { authUser } from "../services/authentication";
import { logout } from "../services/userService";

import Link from "../components/Link";
import { color, shadowStyle } from "../components/styles/constant";

const AdminWrapper = styled.section`
  position: relative;
  display: flex;
  display: -ms-flexbox;
  header {
    width: 100%;
    height: 6rem;
    background-color: #525ce9;
    box-shadow: 0 0.4rem 1rem 0 rgba(0, 0, 0, 0.1),
      0 0.4rem 2rem 0 rgba(0, 0, 0, 0.04);
    padding: 0 2rem;
    .logo {
      display: inline-block;
      height: 100%;
      line-height: 6rem;
      a {
        color: ${color.whiteColor};
        font-size: 2.8rem;
        text-transform: capitalize;
        font-weight: 400;
        display: inline-block;
        height: 100%;
        span.icon {
          display: inline-block;
          color: ${color.whiteColor};
          margin-left: 0.5rem;
          i {
            font-size: 1rem;
          }
        }
        &:hover {
          text-decoration: none;
          color: ${color.whiteColor};
        }
      }
    }
    ul {
      margin: 0;
      padding: 0;
      text-align: right;
      height: 94%;
      li {
        display: inline-block;
        color: ${color.whiteColor};
        padding-right: 4rem;
        height: 100%;
        line-height: 6rem;
        font-size: 2rem;
        position: relative;
        span {
          display: inline-block;
          cursor: pointer;
        }
        .popover {
          position: absolute;
          top: 6.5rem;
          left: -10rem;
          width: 15rem;
          ul {
            margin: 0;
            padding: 0;
            li {
              display: block;
              cursor: pointer;
              line-height: 1;
              font-size: 1.4rem;
              text-align: left;
              padding: 1.3rem 2rem;
              span {
                display: block;
                color: ${color.textColor};
              }
              &:hover {
                background-color: #fbfbfb;
              }
            }
          }
        }
      }
    }
  }
  .nav {
    width: 15%;
    position: fixed;
    left: 0;
    top: 6rem;
    bottom: 0;
    background-color: ${color.whiteColor};
    box-shadow: ${shadowStyle.shadow};
    overflow: auto;
    ul {
      margin: 0;
      padding: 0;
      width: 100%;
      li {
        display: block;
        position: relative;
        a {
          display: block;
          color: ${color.textColor};
          padding: 1.4rem 1.5rem 1rem 1.5rem;
          border-left: 4px solid transparent;
          font-size: 1.5rem;
          span {
            display: inline-block;
            &.icon {
              i {
                position: relative;
                padding-right: 1rem;
                font-size: 1.7rem;
                vertical-align: top;
                color: ${color.textColor};
                &.big {
                  font-size: 2rem;
                }
              }
            }
            &.text {
              position: relative;
              vertical-align: text-bottom;
            }
          }
          &.active {
            border-left: 4px solid ${color.whiteColor};
            background-color: #ededed;
            a span.icon i {
              color: ${color.whiteColor};
            }
            &::after {
              content: "";
              width: 0;
              position: absolute;
              right: 0;
              top: 1.6rem;
              height: 0;
              border-top: 10px solid transparent;
              border-right: 12px solid ${color.bodyBackground};
              border-bottom: 10px solid transparent;
            }
          }
        }
        .search {
          padding: 1rem;
          position: relative;
          border-bottom: 1px solid ${color.borderColor};
          display: flex;
          width: 90%;
          margin: auto;
          margin-bottom: 2rem;
          margin-top: 2rem;
          input {
            width: 95%;
            background-color: transparent;
            border: none;
            color: ${color.textColor};
            outline: none;
          }
          span.icon {
            width: 5%;
            i {
              color: rgba(239, 239, 239, 0.09);
              display: inline-block;
              vertical-align: top;
            }
          }
        }
        &:hover {
          background-color: #ededed;
        }
        &.search {
          &:hover {
            background-color: transparent;
          }
        }
      }
    }
  }
  .content {
    width: 85%;
    position: fixed;
    right: 0;
    top: 6rem;
    bottom: 0;
    background-color: ${color.bodyBackground};
    padding: 4rem;
    overflow: auto;
  }
`;

class AdminContainer extends Component {
  constructor() {
    super();
    this.state = {
      popupVisible: false
    };
  }

  componentDidMount() {
    this.props.authUser();
  }

  handleClick = () => {
    if (!this.state.popupVisible) {
      document.addEventListener("click", this.handleOutsideClick, false);
    } else {
      document.removeEventListener("click", this.handleOutsideClick, false);
    }

    this.setState(prevState => ({
      popupVisible: !prevState.popupVisible
    }));
  };

  handleOutsideClick = e => {
    this.handleClick();
  };

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
                <li
                  ref={node => {
                    this.node = node;
                  }}
                  onClick={this.handleClick}
                >
                  <span>
                    <i title="Profile" className="far fa-user" />
                  </span>
                  {this.state.popupVisible && (
                    <div className="popover">
                      <ul>
                        <li>
                          <Link href="/settings">
                            <span>My Settings</span>
                          </Link>
                        </li>
                        <li>
                          <Link href="/setup">
                            <span>Account Setup</span>
                          </Link>
                        </li>
                        {/* <li>
                            <Link href="/">
                              <span>Contact Support</span>
                            </Link>
                          </li> */}
                        <li>
                          <Link href="/login">
                            <span onClick={logout()}>Logout</span>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  )}
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
              <Link activeClassName="active" href="/services">
                <a>
                  <span className="icon">
                    <i className="material-icons"> format_list_bulleted </i>
                  </span>
                  <span className="text">Services</span>
                </a>
              </Link>
            </li>
            <li>
              <Link activeClassName="active" href="/inventory">
                <a>
                  <span className="icon">
                    <i className="material-icons"> playlist_add_check </i>
                  </span>
                  <span className="text">Inventory</span>
                </a>
              </Link>
            </li>
            <li>
              <Link activeClassName="active" href="/payment">
                <a>
                  <span className="icon">
                    <i className="material-icons"> bar_chart </i>
                  </span>
                  <span className="text">Payment</span>
                </a>
              </Link>
            </li>
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
        </div>
        <div className="content">{this.props.children}</div>
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
