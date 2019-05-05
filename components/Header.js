import React, { Component } from "react";
import Link from "next/link";
import Nav from "./styles/Nav";
import Button from "../components/styles/Button";
import Cookies from "js-cookie";
import styled, { css } from "styled-components";
import { Row, Col } from "antd";
import { logout } from "../services/userService";

const IconHolder = styled.div`
  display: flex;
  flex-direction: column;
  width: ${props => (props.width ? props.width : "50px")};
  height: ${props => (props.height ? props.height : "50px")};
  background-size: cover;
  flex-grow: 0;
  flex-shrink: 0;
  margin: ${props => (props.margin ? props.margin : "0px 0px")};
  border-radius: ${props => (props.borderRadius ? props.borderRadius : "0px")};
  background-repeat: no-repeat;
  background-color: ${props =>
    props.backgroundColor ? props.backgroundColor : "transparent"};
  background-position: center;
  background-image: ${props => (props.src ? `url(${props.src})` : "none")};
  background-size: contain;
`;

const Header = props => (
  <Nav>
    <div className="container-fluid">
      <Row>
        <Col span={6}>
          <ul className="logo">
            <li>
              <Link href="/">
                <a>
                  <IconHolder
                    src={"/static/images/company_logo.png"}
                    width={"150px"}
                  />
                </a>
              </Link>
            </li>
          </ul>
        </Col>
        <Col span={18}>
          <ul className="navigation" style={{ textAlign: "right" }}>
            <li>
              <Link href="/">
                <a>About</a>
              </Link>
            </li>
            <li>
              <Link href="/">
                <a>Contact us</a>
              </Link>
            </li>
            {Cookies.get("token") === undefined ? (
              <React.Fragment>
                <li>
                  <Link href="/login">
                    <a>Login</a>
                  </Link>
                </li>
                <li className="signup">
                  <Link href="/signup">
                    <Button noHover withBorder radius={`3rem`}>
                      Sign up
                    </Button>
                  </Link>
                </li>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <li>
                  <Link href="/">
                    <a onClick={logout}>Logout</a>
                  </Link>
                </li>
                <li className="signup">
                  <Link href="/dashboard">
                    <Button noHover withBorder radius={`3rem`}>
                      Dashboard
                    </Button>
                  </Link>
                </li>
              </React.Fragment>
            )}
          </ul>
        </Col>
      </Row>
    </div>
  </Nav>
);

export default Header;
