import React, { Component } from "react";
import Link from "next/link";
import AdminContainer from "../../components/AdminContainer";
import styled from "styled-components";
import { shadowStyle, color, height } from "../../components/styles/constant";

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
            <div className="row">
              <div className="col-md-6">
                <div className="wrapper marginBottom-2">
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
                      <Link href="product-categories">
                        <a>Product Categories</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/calender-settings">
                        <a>Calendar Settings</a>
                      </Link>
                    </li>
                    {/* <li>
                      <Link href="#">
                        <a>Online Booking Settings</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="#">
                        <a>Staff Notifications</a>
                      </Link>
                    </li> */}
                  </ul>
                </div>
              </div>

              <div className="col-md-6">
                <div className="wrapper marginBottom-2">
                  <div className="title">Point of Sale</div>
                  <div className="caption">Manage point of sale settings</div>
                  <ul>
                    <li>
                      <Link href="#">
                        <a>Payment Types</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="#">
                        <a>Taxes</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="#">
                        <a>Discount Types</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="#">
                        <a>Sales Settings</a>
                      </Link>
                    </li>
                    {/* <li>
                      <Link href="#">
                        <a>Invoices & Receipts</a>
                      </Link>
                    </li> */}
                  </ul>
                </div>
              </div>

              <div className="col-md-6">
                <div className="wrapper marginBottom-2">
                  <div className="title">Client Settings</div>
                  <div className="caption">
                    Setup client notifications, referral sources and
                    cancellation reasons
                  </div>
                  <ul>
                    <li>
                      <Link href="#">
                        <a>Client Notifications</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="#">
                        <a>Referral Sources</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="#">
                        <a>Cancellation Reasons</a>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </SetWrap>
      </AdminContainer>
    );
  }
}

export default Setup;
