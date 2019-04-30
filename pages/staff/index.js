import React, { Component } from "react";
import AdminContainer from "../../components/AdminContainer";
import Link from "../../components/Link";
import styled from "styled-components";
import { shadowStyle, color, height } from "../../components/styles/constant";
import { relative } from "path";

const StaffNav = styled.div`
  margin-bottom: 3rem;
  ul {
    margin: 0;
    padding: 0;
    border-bottom: 1px solid ${color.borderColor};
    li {
      display: inline-block;
      margin-right: 4rem;
      a {
        display: inline-block;
        color: ${color.textLight};
        padding: 1rem 0;
        font-size: 1.6rem;
        text-decoration: none;
        &:hover {
          color: ${color.brandColor};
        }
        &.active {
          border-bottom: 3px solid ${color.textColor};
          color: ${color.textColor};
        }
      }
    }
  }
`;

class Staff extends Component {
  render() {
    return (
      <AdminContainer>
        <div style={{ position: "relative" }}>{this.props.children}</div>
      </AdminContainer>
    );
  }
}

export default Staff;
