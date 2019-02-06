import React, { Component } from "react";
import { injectGlobal } from "styled-components";
import Router from "next/router";
import NProgress from "nprogress";
import Meta from "./Meta";
import Alert from "../components/Alert";

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

injectGlobal`

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
    }
`;

class Page extends Component {
  render() {
    return (
      <div>
        <Meta />
        <Alert />
        {this.props.children}
      </div>
    );
  }
}

export default Page;
