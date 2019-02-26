import React, { Component } from "react";
import styled from "styled-components";
import { shadowStyle, color } from "../components/styles/constant";

const SpinerWrap = styled.div`
  z-index: 100;
  top: 6rem;
  right: 0;
  bottom: 0;
  left: 23rem;
  background-color: rgba(225, 225, 225, 0.5);
  position: fixed;
  .full {
    width: 100%;
    height: 100%;
  }
  .lds-css {
    position: absolute;
    top: 30rem;
    left: 50%;
    margin-left: -13rem;
  }
  @keyframes lds-eclipse {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    50% {
      -webkit-transform: rotate(180deg);
      transform: rotate(180deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes lds-eclipse {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    50% {
      -webkit-transform: rotate(180deg);
      transform: rotate(180deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  .lds-eclipse {
    position: relative;
  }
  .lds-eclipse div {
    position: absolute;
    -webkit-animation: lds-eclipse 1s linear infinite;
    animation: lds-eclipse 1s linear infinite;
    width: 160px;
    height: 160px;
    top: 20px;
    left: 20px;
    border-radius: 50%;
    box-shadow: 0 8px 0 0 ${color.brandColor};
    -webkit-transform-origin: 80px 84px;
    transform-origin: 80px 84px;
  }
  .lds-eclipse {
    width: 111px !important;
    height: 111px !important;
    -webkit-transform: translate(-55.5px, -55.5px) scale(0.555)
      translate(55.5px, 55.5px);
    transform: translate(-55.5px, -55.5px) scale(0.555)
      translate(55.5px, 55.5px);
  }
`;

class Spinner extends Component {
  render() {
    return (
      <SpinerWrap>
        <div className="lds-css ng-scope">
          <div className="full lds-eclipse">
            <div />
          </div>
        </div>
      </SpinerWrap>
    );
  }
}

export default Spinner;
