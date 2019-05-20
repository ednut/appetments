import React, { Component } from "react";
import { Router } from "../../server/routes";
import { connect } from "react-redux";
import Cookies from "js-cookie";
import { getAllCompanyModule } from "../../modules/company";
import AdminContainer from "../../components/AdminContainer";
import styled from "styled-components";
import { shadowStyle, color, height } from "../../components/styles/constant";
import { Row, Col, message } from "antd";
import SpinerWrap from "../../components/Spinner";
import copy from "copy-to-clipboard";
import { Link } from "../../server/routes";

const BookingWrap = styled.div`
  .title {
    font-size: 2.4rem;
    color: rgba(0, 0, 0, 0.65);
  }
  p {
    padding: 1rem 0 0 0;
    font-size: 1.6rem;
  }
  a {
    display: block;
    padding: 1rem 0;
    font-size: 2rem;
    font-weight: 300;
  }
  button {
    border: 1px solid #ccc;
    background: transparent;
    padding: 1rem 5rem;
    border-radius: 0.3rem;
    margin-top: 1rem;
    cursor: pointer;
    outline: none;
  }
`;

class Booking extends Component {
  // static getInitialProps({ err, res, xhr, req }) {
  //   const url = (req && req.url) || null;
  //   return { url };
  // }
  componentDidMount() {
    this.props.getAllCompanyModule();
  }
  render() {
    // console.log(Router.pathname);
    // console.log(t.his.props.url);
    if (this.props.company !== undefined) {
      return (
        <AdminContainer>
          <BookingWrap>
            <div className="container">
              <Row>
                <Col span={12} offset={6}>
                  <div className="title">Online Booking Page</div>
                  <p>
                    Here's the link to your very own online bookings page.
                    Clicking this link opens your online bookings as a full
                    page, you can link to it from your own website, email
                    signature, basically anywhere!
                  </p>
                  <p>
                    Shedul online bookings are super easy to use and your page
                    works great on desktop, tablets and mobiles.
                  </p>
                  <Link
                    route="online-booking"
                    params={{
                      slug:
                        this.props.company.company_code === null
                          ? this.props.company.company_name.toLowerCase()
                          : this.props.company.company_code
                    }}
                  >
                    <a target="_blank">{` https://appetments.herokuapp.com${
                      Router.pathname
                    }/${
                      this.props.company.company_code === null
                        ? this.props.company.company_name.toLowerCase()
                        : this.props.company.company_code
                    }`}</a>
                  </Link>

                  <button
                    onClick={() => {
                      copy(
                        ` https://appetments.herokuapp.com${Router.pathname}/${
                          this.props.company.company_code
                        }`
                      );
                      message.success("Copied!");
                    }}
                  >
                    Copy
                  </button>
                </Col>
              </Row>
            </div>
          </BookingWrap>
        </AdminContainer>
      );
    } else {
      return (
        <AdminContainer>
          <BookingWrap>
            <SpinerWrap />
          </BookingWrap>
        </AdminContainer>
      );
    }
  }
}

const mapStateToProps = state => ({
  company: state.company.companies
});

export default connect(
  mapStateToProps,
  { getAllCompanyModule }
)(Booking);
