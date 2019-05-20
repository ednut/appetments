import styled from "styled-components";
import { color, height, shadowStyle } from "./constant";

const BodyContent = styled.div`
  position: relative;
  height: 100vh;
  overflow: auto;
  border-right: 1px solid ${color.borderColor};
  border-left: 1px solid ${color.borderColor};
  .p-2 {
    padding: 2rem;
  }
  .mtop-10 {
    margin-top: 10rem;
  }
  .header {
    height: 8rem;
    line-height: 8rem;
    text-align: center;
    border-bottom: 1px solid ${color.borderColor};
    font-size: 2.7rem;
    font-weight: 300;
    i {
      position: absolute;
      left: 3rem;
      top: 2.4rem;
      cursor: pointer;
    }
  }
  .ant-checkbox-wrapper {
    width: 100%;
  }
  .ant-checkbox-group {
    width: 100%;
    .title {
      color: rgba(84, 79, 79, 0.55);
      text-transform: uppercase;
      margin: 1em;
      margin-top: 1em;
      font-weight: 500;
      font-size: 1.6rem;
    }
    .item-wrap {
      border-top: 1px solid ${color.borderColor};
      border-bottom: 1px solid ${color.borderColor};
      padding: 2rem 2rem;
      width: 100%;
      margin-top: -1px;
      position: relative;
      .image {
        position: absolute;
        left: 8rem;
        top: 11px;
        font-size: 1.6rem;
        font-weight: 600;
        width: 5rem;
        height: 5rem;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
      }
      .label {
        position: absolute;
        left: 15rem;
        top: 28px;
        font-size: 1.6rem;
      }
      .price {
        position: absolute;
        right: 3rem;
        top: 22px;
        font-size: 1.6rem;
        font-weight: 600;
      }
    }
    .ant-checkbox-inner {
      width: 29px;
      height: 29px;
    }
    .ant-checkbox-inner::after {
      width: 9.714286px;
      height: 17.142857px;
      left: 28%;
      top: 45%;
    }
  }
  footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 7rem;
    background: ${color.brandColor};
    display: flex;
    color: #fff;
    width: auto;
    margin: auto;
    .selected-info-wrap {
      padding: 1rem 2rem;
      display: none;
      .item {
        font-size: 16px;
        font-weight: 600;
      }
    }
    button {
      flex-basis: 100%;
      border: none;
      background: #678c43;
      height: 100%;
      font-size: 1.6rem;
      text-transform: uppercase;
      cursor: pointer;
      outline: none;
      font-weight: 600;
    }
  }
  @media (min-width: 768px) {
    footer {
      width: 1107px;
      .selected-info-wrap {
        display: block;
        flex-basis: 80%;
        padding: 1rem 2rem;
        .item {
          font-size: 16px;
          font-weight: 600;
        }
      }
      button {
        flex-basis: 20%;
        border: none;
        background: #678c43;
        height: 100%;
        font-size: 1.6rem;
        text-transform: uppercase;
        cursor: pointer;
        outline: none;
        font-weight: 600;
      }
    }
  }
  .page-title {
    font-size: 2.2rem;
    margin-top: 6rem;
    margin-bottom: 3rem;
    text-align: center;
  }
  .dazsFI {
    margin-bottom: 10px;
  }
`;

export default BodyContent;
