import React, { Component } from "react";
import styled from "styled-components";
import { Spin, Icon } from "antd";

const SpinerWrap = styled.div`
  z-index: 100;
  top: 15rem;
  right: 66px;
  bottom: 0;
  left: 8rem;
  background-color: rgba(225, 225, 225, 0);
  position: fixed;
  .spinWrap {
    position: fixed;
    left: 50%;
    top: 50%;
  }
`;

class Spinner extends Component {
  render() {
    const antIcon = <Icon type="loading" style={{ fontSize: 40 }} spin />;
    return (
      <SpinerWrap>
        <div className="spinWrap">
          {/* <Spin indicator={antIcon} /> */}
          <Spin tip="Loading..." size="large" />
        </div>
      </SpinerWrap>
    );
  }
}

export default Spinner;
