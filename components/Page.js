import React, { Component } from "react";
import { createGlobalStyle } from "styled-components";
import Router from "next/router";
import NProgress from "nprogress";
import Meta from "./Meta";
import Alert from "../components/Alert";
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
        /* font-family: 'Poppins', sans-serif; */
        font-family: 'Fira Sans', sans-serif;
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
    .dropdown-toggle:after { content: none }
    .ant-table-thead > tr > th{background: transparent}
    .styles_modal__gNwvD .title{
      border-bottom: none!important;
    }
    .ant-table-placeholder{
      border-bottom:none;
    }
`;

class Page extends Component {
  render() {
    return (
      <div>
        <Meta />
        <GlobalStyle />
        <Alert />
        {this.props.children}
      </div>
    );
  }
}

export default Page;
