import styled from "styled-components";
import { color, shadowStyle } from "../../components/styles/constant";

const AdminWrapper = styled.section`
  position: relative;
  display: flex;
  display: -ms-flexbox;
  header {
    width: 100%;
    height: 6rem;
    background-color: #525ce9;
    box-shadow: 0 0.4rem 1rem 0 rgba(0, 0, 0, 0.1),
      0 0.4rem 2rem 0 rgba(0, 0, 0, 0.04);
    padding: 0 2rem;
    .logo {
      display: inline-block;
      height: 100%;
      line-height: 6rem;
      a {
        color: ${color.whiteColor};
        font-size: 2.8rem;
        text-transform: capitalize;
        font-weight: 400;
        display: inline-block;
        height: 100%;
        span.icon {
          display: inline-block;
          color: ${color.whiteColor};
          margin-left: 0.5rem;
          i {
            font-size: 1rem;
          }
        }
        &:hover {
          text-decoration: none;
          color: ${color.whiteColor};
        }
      }
    }
    ul {
      margin: 0;
      padding: 0;
      text-align: right;
      height: 94%;
      li {
        display: inline-block;
        color: ${color.whiteColor};
        padding-right: 4rem;
        height: 100%;
        line-height: 6rem;
        font-size: 2rem;
        position: relative;
        span {
          display: inline-block;
          cursor: pointer;
        }
        .dropdown-menu {
          /* position: absolute; */
          top: 6.5rem;
          left: -10rem;
          width: 15rem;
          span {
            display: block;
            cursor: pointer;
            line-height: 1;
            font-size: 1.4rem;
            text-align: left;
            padding: 1.3rem 2rem;
            span {
              display: block;
              color: ${color.textColor};
            }
            &:hover {
              background-color: #fbfbfb;
            }
          }
          ul {
            margin: 0;
            padding: 0;
            li {
              display: block;
              cursor: pointer;
              line-height: 1;
              font-size: 1.4rem;
              text-align: left;
              padding: 1.3rem 2rem;
              span {
                display: block;
                color: ${color.textColor};
              }
              &:hover {
                background-color: #fbfbfb;
              }
            }
          }
        }
      }
    }
  }
  .nav {
    width: 15%;
    position: fixed;
    left: 0;
    top: 6rem;
    bottom: 0;
    background-color: ${color.whiteColor};
    box-shadow: ${shadowStyle.shadow};
    overflow: auto;
    ul {
      margin: 0;
      padding: 0;
      width: 100%;
      li {
        display: block;
        position: relative;
        a {
          display: block;
          color: ${color.textColor};
          padding: 1.4rem 1.5rem 1rem 1.5rem;
          border-left: 4px solid transparent;
          font-size: 1.5rem;
          span {
            display: inline-block;
            &.icon {
              i {
                position: relative;
                padding-right: 1rem;
                font-size: 1.7rem;
                vertical-align: top;
                color: ${color.textColor};
                &.big {
                  font-size: 2rem;
                }
              }
            }
            &.text {
              position: relative;
              vertical-align: text-bottom;
            }
          }
          &.active {
            border-left: 4px solid ${color.whiteColor};
            background-color: #f7f7f7;
            a span.icon i {
              color: ${color.whiteColor};
            }
            &::after {
              content: "";
              width: 0;
              position: absolute;
              right: 0;
              top: 1.6rem;
              height: 0;
              border-top: 10px solid transparent;
              border-right: 12px solid #f7f7f7;
              border-bottom: 10px solid transparent;
            }
          }
        }
        .search {
          padding: 1rem;
          position: relative;
          border-bottom: 1px solid ${color.borderColor};
          display: flex;
          width: 90%;
          margin: auto;
          margin-bottom: 2rem;
          margin-top: 2rem;
          input {
            width: 95%;
            background-color: transparent;
            border: none;
            color: ${color.textColor};
            outline: none;
          }
          span.icon {
            width: 5%;
            i {
              color: rgba(239, 239, 239, 0.09);
              display: inline-block;
              vertical-align: top;
            }
          }
        }
        &:hover {
          background-color: #f7f7f7;
        }
        &.search {
          &:hover {
            background-color: transparent;
          }
        }
      }
    }
    footer {
      position: fixed;
      background: #f7f7f7;
      width: 15%;
      height: 5rem;
      bottom: 0;
      left: 0;
      ul {
        margin: 0;
        padding: 0;
        li {
          display: inline-block;
          width: 33%;
          text-align: center;
          a {
            color: #5a738e;
            font-size: 1.8rem;
          }
          &:hover {
            background-color: #4255672e;
          }
        }
      }
    }
  }
  .content {
    width: 85%;
    position: fixed;
    right: 0;
    top: 6rem;
    bottom: 0;
    background-color: #f7f7f7;
    overflow: auto;
    .content-wrap {
      padding: 3rem 2rem;
    }
  }
`;

export default AdminWrapper;
