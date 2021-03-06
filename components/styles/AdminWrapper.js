import styled from "styled-components";
import { color, shadowStyle } from "../../components/styles/constant";

const AdminWrapper = styled.section`
  .main-nav {
    display: flex;
    justify-content: center;
    ul {
      margin: 0;
      padding: 0;
      min-height: 5rem;
      border-bottom: 1px solid ${color.borderColor};
      li {
        display: inline-block;
        padding: 2rem 0;
        color: rgba(0, 0, 0, 0.65);
        font-size: 1.6rem;
        position: relative;
        &.with-dropdown {
          padding: 2rem 0;
          cursor: pointer;
          span {
            color: rgba(0, 0, 0, 0.65);
            padding: 2rem;
            font-size: 1.6rem;
            position: relative;
            text-decoration: none;
            &.active {
              :after {
                content: "";
                width: 100%;
                position: absolute;
                color: #777;
                border-bottom: 3px solid ${color.brandColor};
                left: 0;
                bottom: -5px;
              }
            }
          }
        }
        a {
          color: rgba(0, 0, 0, 0.65);
          padding: 2rem;
          font-size: 1.6rem;
          position: relative;
          text-decoration: none;
          &.active {
            :after {
              content: "";
              width: 100%;
              position: absolute;
              color: #777;
              border-bottom: 3px solid ${color.brandColor};
              left: 0;
              bottom: -5px;
            }
          }
        }
      }
    }
  }
  .content-wrap {
    margin-top: 3rem;
    width: 1315px;
    margin-left: auto !important;
    margin-right: auto !important;
    position: relative;
  }
`;

export default AdminWrapper;
