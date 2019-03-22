import styled from "styled-components";
import { color, height } from "./constant";

const Nav = styled.header`
  ${'' /* height: ${height.headerHeight}; */}
${'' /* for header styling */}
  height: 10rem;
  background-color: ${color.whiteColor};
  position: relative;
  padding: 0 ${height.headerHeight};
  font-size: 1.3rem;
${'' /*included this for full width  */}
  width: 100%;
  &.fixedNav {
    position: fixed;
  }
  ul {
    margin: 0;
    padding: 0;
    height: 100%;
    li {
      height: 100%;
      line-height: ${height.headerHeight};
    }
    &.logo {
      li {
        display: inline-block;
        a {
          color: ${color.textColor};
          font-size: 3rem;
          text-transform: capitalize;
          font-weight: 400;
          display: inline-block;
          height: 100%;
          span.icon {
            display: inline-block;
            color: ${color.brandColor};
            margin-left: 0.5rem;
            i {
              font-size: 1rem;
            }
          }
          &:hover {
            text-decoration: none;
            color: ${color.textColor};
          }
        }
      }
    }
    &.navigation {
      li {
        display: inline-block;
        margin-left: 4rem;
        height: ${height.headerHeight};
        line-height: ${height.headerHeight};
        vertical-align: top;
        text-transform: uppercase;
        font-weight: 600;
        font-size: 1.4rem;
        a {
          display: inline-block;
          color: ${color.textColor};
          outline: none;
          &:hover {
            text-decoration: none;
            color: ${color.brandColor};
          }
        }
        &.signup {
          a {
            border: 0.1rem solid;
            display: inline;
            padding: 1rem 2rem;
            border-radius: 2rem;
            outline: none;
            &:hover {
              border: 0.1rem solid transparent;
              color: ${color.whiteColor};
              background-color: #000;
            }
          }
        }
      }
      @media (max-width: 1300px) {
        display: none;
      }
    }
  }
`;

export default Nav;
