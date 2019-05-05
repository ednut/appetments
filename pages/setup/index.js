import React, { Component } from "react";
import Link from "next/link";
import AdminContainer from "../../components/AdminContainer";
import styled from "styled-components";
import { shadowStyle, color, height } from "../../components/styles/constant";
import { Row, Col, Card, Menu, Icon } from "antd";

const SetWrap = styled.div`
  .title {
    font-weight: 600;
    font-size: 1.7rem;
    margin-bottom: 0.3rem;
  }
  .caption {
    font-size: 1.3rem;
    color: ${color.textLight};
  }
  .wrapper {
    padding: 2rem 4rem;
    background-color: ${color.whiteColor};
    box-shadow: ${shadowStyle.shadow};
    border-radius: 0.5rem;
    &:hover {
      box-shadow: ${shadowStyle.bigShadow};
    }
  }
  ul {
    margin-top: 1rem;
    li {
      display: block;
      padding: 1rem;
      border-bottom: 1px solid ${color.borderColor};
      &:last-child {
        border-bottom: none;
      }
      a {
        display: black;
      }
    }
  }
  .marginBottom-2 {
    margin-bottom: 4rem;
  }
`;

class Setup extends Component {
  render() {
    return (
      <AdminContainer>
        <SetWrap>
          <div className="container">
            <Row>
              <Col span={10} offset={7}>
                <Card className="marginBottom-2">
                  <div className="title">Account Setup</div>
                  <div className="caption">
                    Manage your business general settings
                  </div>
                  <ul>
                    <li>
                      <Link href="/company-details">
                        <a>Company Details</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/locations">
                        <a>Locations</a>
                      </Link>
                    </li>

                    <li>
                      <Link href="/pet-category">
                        <a>Pet Categories</a>
                      </Link>
                    </li>

                    <li>
                      <Link href="/calender-settings">
                        <a>Calendar Settings</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="#">
                        <a>Client Notifications</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="#">
                        <a>Discount Types</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="#">
                        <a>Account Details</a>
                      </Link>
                    </li>
                  </ul>
                </Card>
              </Col>
            </Row>
          </div>
        </SetWrap>
      </AdminContainer>
    );
  }
}

export default Setup;
