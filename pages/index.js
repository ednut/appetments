import React, { Component } from "react";
import BodyContent from "../components/styles/BodyContent";
import ContentWrap from "../components/ContentContainer";

import PageInfo from "../components/PageInfo";

class PageContent extends Component {
  render() {
    return (
      <ContentWrap>
        <BodyContent className="body-content">
          <PageInfo />
        </BodyContent>
      </ContentWrap>
    );
  }
}

export default PageContent;
