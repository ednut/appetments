import React, { Component } from "react";
import Link from "next/link";
import Nav from "./styles/Nav";
import Button from "../components/styles/Button";
import Cookies from "js-cookie";

const Header = props => (
  <Nav>
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3">
          <ul className="logo">
            <li>
              <Link href="/">
                <a>
                  Appetments
                  <span className="icon">
                    <i className="fas fa-circle" />
                  </span>
                </a>
              </Link>
            </li>
          </ul>
        </div>
        <div className="col-md-9">
          <ul className="navigation text-right">
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
            <li>
              {Cookies.get("token") === undefined ? (
                <Link href="/login">
                  <a>Login</a>
                </Link>
              ) : (
                <Link href="/dashboard">
                  <a>Dashboard</a>
                </Link>
              )}
            </li>
            <li className="signup">
              <Link href="/signup">
                <Button noHover withBorder radius={`3rem`}>
                  Sign up
                </Button>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </Nav>
);

export default Header;
