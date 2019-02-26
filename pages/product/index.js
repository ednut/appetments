import React, { Component } from "react";
import AdminContainer from "../../components/AdminContainer";
import Link from "../../components/Link";
import styled from "styled-components";
import { shadowStyle, color, height } from "../../components/styles/constant";

const ProductNav = styled.div`
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

class Product extends Component {
  render() {
    return (
      <AdminContainer>
        <ProductNav>
          <ul>
            <li>
              <Link activeClassName="active" href="/product-categories">
                <a>Create Product Categories</a>
              </Link>
            </li>
            <li>
              <Link activeClassName="active" href="/create-products">
                <a>Create Products</a>
              </Link>
            </li>
            <li>
              <Link activeClassName="active" href="/product-variant">
                <a>Create Product Variants</a>
              </Link>
            </li>
          </ul>
        </ProductNav>
        {this.props.children}
      </AdminContainer>
    );
  }
}

export default Product;
