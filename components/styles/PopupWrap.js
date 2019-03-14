import styled from "styled-components";
import { shadowStyle, color, height } from "../../components/styles/constant";

const PopupWrap = styled.section`
  position: fixed;
  background: #fbfbfb;
  z-index: 1000;
  width: 100%;
  height: 100%;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  .header {
    background: #fff;
    text-align: center;
    border-bottom: 1px solid ${color.borderColor};
    font-size: 3.3rem;
    height: 10vh;
    line-height: 10vh;
    font-weight: 200;
    z-index: 10;
    .icon {
      display: inline-block;
      position: absolute;
      right: 5rem;
      cursor: pointer;
      i {
        font-size: 3.5rem;
        vertical-align: middle;
      }
    }
  }
  .container-wrap {
    height: 80vh;
  }
  .pop-content {
    overflow: auto;
    display: flex;
    height: 100%;
    margin: auto;
    width: 100%;
    .form-section {
      width: 60%;
      height: 100%;
      padding: 4rem 11rem 0 20rem;
      overflow: auto;
      .date-title {
        font-size: 25px;
        font-weight: 300;
        margin-bottom: 2rem;
      }
    }
    .client-section {
      width: 40%;
      height: 100%;
      overflow: auto;
      border-left: 1px solid ${color.borderColor};
      .client-title {
        font-size: 25px;
        font-weight: 300;
        margin-bottom: 2rem;
      }
    }
  }
  .selected-client {
    background: rgba(251, 251, 251, 0);
    padding: 2rem 5rem;
    margin-bottom: 5rem;
    border-bottom: 1px solid ${color.borderColor};
    .client-wrap {
      width: 100%;
      border: 1px solid #f7f7f8;
      padding: 1.5rem 4rem 1.5rem 1.5rem;
      border-radius: 3px;
      background: #fff;
      box-shadow: 0 2px 5px 0 rgba(164, 173, 186, 0.25);
      margin-bottom: 1rem;
      position: relative;
      i {
        display: inline-block;
        position: absolute;
        right: 1rem;
        top: 2.8rem;
        cursor: pointer;
      }
      .client-content {
      }
      .name {
        display: block;
        font-weight: 600;
        font-size: 17px;
      }
      .email {
        display: block;
        color: #777;
      }
    }
  }
  .selected-variant-wrap {
    padding: 2rem 6rem;
    .title {
      font-weight: 400;
      display: block;
      padding-bottom: 0.1rem;
      margin-bottom: 0.5rem;
    }
    .selected-variant {
      position: relative;
      display: inline-block;
      margin-right: 1rem;
      margin-bottom: 1rem;
      span {
        display: inline-block;
        background: #efefef;
        border-radius: 4px;
        &.name {
          font-size: 1.4rem;
          font-size: 1.4rem;
          padding: 0 1rem;
        }
        &.remove {
          cursor: pointer;
          padding-right: 5px;
          i {
            font-size: 1.4rem;
            vertical-align: sub;
          }
        }
      }
    }
  }
  .search-wrap {
    background: rgba(251, 251, 251, 0);
    padding: 2rem 5rem;
    margin-bottom: 5rem;
    border-bottom: 1px solid ${color.borderColor};
    .input-wrap {
      background: #fff;
      display: flex;
      border: 1px solid ${color.borderColor};
      height: 4.5rem;
      span.icon {
        display: inline-block;
        width: 10%;
        text-align: center;
        padding-top: 1.1rem;
        cursor: pointer;
        i {
          color: #999;
        }
      }
      input {
        display: inline-block;
        width: 90%;
        border: none;
        background: transparent;
        padding: 0 2rem;
        outline: none;
      }
    }
  }
  .result-wrap {
    padding: 0 5rem;
    .client-wrap {
      width: 100%;
      border: 1px solid #f7f7f8;
      padding: 15px;
      border-radius: 3px;
      background: #fff;
      box-shadow: 0 2px 5px 0 rgba(164, 173, 186, 0.25);
      display: flex;
      margin-bottom: 1rem;
      cursor: pointer;
      &:hover {
        background-color: #fbfbfb;
      }
      .avata {
        width: 5rem;
        height: 5rem;
        border-radius: 50%;
        text-align: center;
        font-size: 30px;
        background-color: #eef0f2;
        border: none;
        margin-right: 3rem;
        text-transform: uppercase;
      }
      .client-content {
      }
      .name {
        display: block;
        font-weight: 600;
        font-size: 17px;
      }
      .email {
        display: block;
        color: #777;
      }
    }
  }
  .no-result-wrap {
    padding: 0 5rem;
    text-align: center;
    .icon {
      i {
        font-size: 10rem;
        padding-bottom: 1rem;
        color: #67768c;
      }
    }
    .msg {
      color: #67768c;
      font-size: 1.6rem;
    }
  }
  .product-accordion {
    position: relative;
    .card-header {
      padding: 1rem;
      cursor: pointer;
      h2 {
        font-size: 15px;
        font-weight: 500;
      }
    }
  }
  .table-select-btn {
    text-decoration: none;
    padding: 0 1rem;
    display: inline-block;
    border-radius: 0.3rem;
    -webkit-transition: all 0.2s;
    transition: all 0.2s;
    position: relative;
    -webkit-animation: moveInBottom 1s linear;
    animation: moveInBottom 1s linear;
    font-size: 1.4rem;
    font-weight: 600;
    border: none;
    outline: none;
    height: 3rem;
    background-color: #083e8d;
    color: #ffffff;
    position: relative;
    cursor: pointer;
    i {
      vertical-align: bottom;
    }
  }
  .product-title {
    font-weight: 400;
    display: block;
    padding-bottom: 0.1rem;
    margin-bottom: 0.5rem;
  }
  .footer {
    position: absolute;
    border-top: 1px solid ${color.borderColor};
    font-size: 3.3rem;
    height: 10vh;
    padding: 2rem 5rem;
    font-weight: 200;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 10;
    background: #fff;
  }
`;

export default PopupWrap;
