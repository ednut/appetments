import App, { Container } from "next/app";
import { Provider } from "react-redux";
import store from "../store";

import Page from "../components/Page";

class MyApp extends App {
  render() {
    const { Component } = this.props;
    return (
      <Container>
        <Provider store={store}>
          <Page>
            <Component />
          </Page>
        </Provider>
      </Container>
    );
  }
}

export default MyApp;
