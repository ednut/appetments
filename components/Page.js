import React, { Component } from "react";
import { createGlobalStyle } from "styled-components";
import Router from "next/router";
import NProgress from "nprogress";
import Meta from "./Meta";
import { color } from "./styles/constant";
import "antd/dist/antd.css";

NProgress.configure({ showSpinner: false });

Router.onRouteChangeStart = () => {
  NProgress.start();
};
Router.onRouteChangeComplete = () => {
  NProgress.done();
};
Router.onRouteChangeError = () => {
  NProgress.done();
};

const GlobalStyle = createGlobalStyle`
    *,
    *::after,
    *::before {
        margin: 0;
        padding: 0;
        box-sizing: inherit;
    }

    html{
        font-size: 10px;
        box-sizing: border-box;
    }

    body{
        font-family: 'Fira Sans', sans-serif !important;
        font-weight: 400;
        line-height: 1.7;
        box-sizing: border-box;
        font-size: 1.4rem;
    }
    .logo{
      font-family: "Poppins", sans-serif;
      a{
        outline: none;
      }
      a:focus{
        outline: none;
      }
    }
    .react-datepicker-wrapper{
      input{
        border: none;
        outline: none;
      }
    }
    .ant-table-placeholder{
      border-bottom:none !important;
    }
    .ant-empty-image img {
        height: 10rem !important;
        margin-top: 8rem !important;
    }
    .ant-empty-description {
      margin: 0 !important;
      margin-top: 15rem !important;
    }
    .ant-dropdown-menu-item span{
      display: inline-block !important;
      width: 100% !important;
    }
    .ant-form-item{
      margin-bottom: 0 !important;
    }
    .ant-form-item-required::before{
      position: absolute !important;
      right: 0 !important;
    }
    .ant-form-item-label{
      display: inline-block !important;
      overflow: hidden !important;
      white-space: nowrap !important;
      vertical-align: middle !important;
      width: 100% !important;
      text-align: left !important;
      line-height: 1.6rem !important;
      label{
        color: rgba(0, 0, 0, 0.65) !important;
      }
    }
    .ant-time-picker{
      width: 100%!important;
    }
    .ant-spin-dot-item{
      background-color: ${color.brandColor}!important;
    }
    .ant-spin{
      color: ${color.brandColor}!important;
    }

  .container {
    width: 100%;
    padding-right: 15px;
    padding-left: 15px;
    margin-right: auto;
    margin-left: auto
  }

@media (min-width:576px) {
    .container {
        max-width: 540px
    }
}

@media (min-width:768px) {
    .container {
        max-width: 720px
    }
}

@media (min-width:992px) {
    .container {
        max-width: 960px
    }
}

@media (min-width:1200px) {
    .container {
        max-width: 1140px
    }
}

.container-fluid {
    width: 100%;
    padding-right: 15px;
    padding-left: 15px;
    margin-right: auto;
    margin-left: auto
}
`;

class Page extends Component {
  render() {
    return (
      <div>
        <Meta />
        <GlobalStyle />
        {this.props.children}
      </div>
    );
  }
}

export default Page;
