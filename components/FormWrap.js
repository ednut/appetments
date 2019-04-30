import React, { Component } from "react";
import styled from "styled-components";
import Router from "next/router";
import NProgress from "nprogress";
import Link from "next/link";
import { color } from "./styles/constant";

Router.onRouteChangeStart = () => {
  NProgress.start();
};
Router.onRouteChangeComplete = () => {
  NProgress.done();
};
Router.onRouteChangeError = () => {
  NProgress.done();
};

const Wrap = styled.section`
  height: 100vh;
  background-image: linear-gradient(
    to right,
    #f6f6fa,
    #f5f6fa,
    #f5f5f9,
    #f4f5f9,
    #f3f4f8
  );
  .wrap {
    display: flex;
    justify-content: center;
  }
  .logo {
    text-align: center;
    padding-top: 5rem;
    font-size: 3rem;
    a {
      text-decoration: none;
      color: ${color.textColor};
    }
    span.icon {
      display: inline-block;
      color: ${color.brandColor};
      margin-left: 0.5rem;
      i {
        font-size: 1rem;
      }
    }
  }
  .caption {
    text-align: center;
    font-size: 2.6rem;
    font-weight: 200;
  }
  .login-wrap {
    padding: 3rem;
    background-color: ${color.whiteColor};
    margin-top: 2rem;
    box-shadow: 0 0 0 0.1rem rgba(0, 0, 0, 0.01),
      0 0.2rem 0.3rem rgba(0, 0, 0, 0.04);
    flex-basis: 35%;
  }
  .footer-info {
    padding: 1rem;
    text-align: center;
  }
`;

class FormWrap extends Component {
  render() {
    return (
      <Wrap>
        <div className="container">
          <div className="logo">
            <Link href="/">
              <a>Appetments</a>
            </Link>
            <span className="icon">
              <i className="fas fa-circle" />
            </span>
          </div>
          {this.props.children}
        </div>
      </Wrap>
    );
  }
}

export default FormWrap;
