import React, { Component } from "react";
import AdminContainer from "../../components/AdminContainer";
import Link from "../../components/Link";
import styled from "styled-components";
import { shadowStyle, color, height } from "../../components/styles/constant";

const SalesNav = styled.div`
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

class Sales extends Component {
  render() {
    return (
      <AdminContainer>
        <SalesNav>
          <ul>
            <li>
              <Link activeClassName="active" href="/daily-sales">
                <a>Daily Sales</a>
              </Link>
            </li>
            <li>
              <Link activeClassName="active" href="/appointments">
                <a>Appointments</a>
              </Link>
            </li>
            <li>
              <Link activeClassName="active" href="/invoices">
                <a>Invoices</a>
              </Link>
            </li>
            <li>
              <Link activeClassName="active" href="/vouchers">
                <a>Vouchers</a>
              </Link>
            </li>
          </ul>
        </SalesNav>
        {this.props.children}
      </AdminContainer>
    );
  }
}

export default Sales;
