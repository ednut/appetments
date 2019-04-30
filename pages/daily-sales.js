import React from "react";
import Sales from "./sales";
import styled from "styled-components";
import { color, height } from "../components/styles/constant";
import { Row, Col } from "antd";

const FilterSection = styled.div`
  width: 100%;
  position: relative;
  margin-bottom: ${height.gutterHeight};
  form {
    display: flex;
    select {
      border: 1px solid ${color.borderColor};
      width: 30%;
      margin-right: 5%;
      background-color: transparent;
      height: 4.5rem;
      border-radius: 0.3rem;
      padding: 0 1rem;
      outline: none;
    }
    .filter {
      border: 1px solid ${color.borderColor};
      width: 65%;
      background-color: transparent;
      border-radius: 0.3rem;
      display: flex;
      span {
        display: inline-block;
        &.arrow {
          width: 20%;
          text-align: center;
          padding-top: 0.8rem;
          color: ${color.textLight};
        }
        &.day {
          width: 40%;
          text-align: center;
          padding-top: 0.8rem;
          border-right: 1px solid ${color.borderColor};
          border-left: 1px solid ${color.borderColor};
          font-size: 1.6rem;
        }
        &.calender {
          width: 20%;
          text-align: center;
          padding-top: 0.8rem;
          border-right: 1px solid ${color.borderColor};
          color: ${color.textLight};
        }
      }
    }
  }
`;

const SalesWrapper = styled.div`
  position: relative;
  .date-section {
    margin-bottom: ${height.spaceHeight};
  }
  .date {
    font-size: 3rem;
    font-weight: 200;
  }
  .date-generated {
    color: ${color.textLight};
  }
  .title {
    font-size: 1.8rem;
    font-weight: 200;
    margin-bottom: ${height.gutterHeight};
  }
  table {
    color: ${color.textColor};
    border: 1px solid #e6e9ed;
    background: #fff;
    thead {
      tr {
        background-color: #efefef;
        color: ${color.textLight};
        th {
          padding: 1rem;
          border: none;
        }
      }
    }
  }
`;

const generateDate = () => {
  let date = new Date();
  let month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  return `${days[date.getDay()]}, ${date.getDate()} ${
    month[date.getMonth()]
  } ${date.getFullYear()}`;
};

const generateTime = () => {
  let date = new Date();

  return `${date.getHours()}: ${date.getMinutes()}`;
};

const dailySales = () => (
  <Sales>
    <FilterSection>
      <Row>
        <Col span={16} offset={8}>
          <form>
            <select name="" id="">
              <option value="">Export</option>
              <option value="">Excel</option>
              <option value="">PDF</option>
              <option value="">CSV</option>
            </select>

            <div className="filter">
              <span className="arrow">
                <i className="material-icons"> arrow_back_ios </i>
              </span>
              <span className="day">Today</span>
              <span className="calender">
                <i className="material-icons"> calendar_today </i>
              </span>
              <span className="arrow">
                <i className="material-icons"> arrow_forward_ios </i>
              </span>
            </div>
          </form>
        </Col>
      </Row>
    </FilterSection>
    <SalesWrapper>
      <div className="date-section">
        <div className="date">Daily Sales: {generateDate()}</div>
        <div className="date-generated">
          Generated {generateDate()} at{" "}
          {(generateTime() < 10 ? "0" : "") + generateTime()}
        </div>
      </div>
      <Row>
        <Col span={12}>
          <div className="title">Transaction Summary</div>
          <table className="table">
            <thead>
              <tr>
                <th>Item Type</th>
                <th className="text-right">Sales Qty</th>
                <th className="text-right">Refund Qty</th>
                <th className="text-right">Gross Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Services</td>
                <td className="text-right">0</td>
                <td className="text-right">0</td>
                <td className="text-right">₦0.00</td>
              </tr>
              <tr>
                <td>Products</td>
                <td className="text-right">0</td>
                <td className="text-right">0</td>
                <td className="text-right">₦0.00</td>
              </tr>
              <tr>
                <td>Vouchers</td>
                <td className="text-right">0</td>
                <td className="text-right">0</td>
                <td className="text-right">₦0.00</td>
              </tr>
              <tr>
                <td>Late cancellation fees</td>
                <td className="text-right">0</td>
                <td className="text-right">0</td>
                <td className="text-right">₦0.00</td>
              </tr>
              <tr>
                <td>No show fees</td>
                <td className="text-right">0</td>
                <td className="text-right">0</td>
                <td className="text-right">₦0.00</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td className="font-weight-bold">Total Sales</td>
                <td className="text-right font-weight-bold">0</td>
                <td className="text-right font-weight-bold">0</td>
                <td className="text-right font-weight-bold">₦0.00</td>
              </tr>
            </tfoot>
          </table>
        </Col>
        <Col span={12}>
          <div className="title">Cash Movement Summary</div>
          <table className="table">
            <thead>
              <tr>
                <th>Payment Type</th>
                <th className="text-right">Payments collected</th>
                <th className="text-right">Refunds paid</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Cash</td>
                <td className="text-right">₦0.00</td>
                <td className="text-right">₦0.00</td>
              </tr>
              <tr>
                <td>Other</td>
                <td className="text-right">₦0.00</td>
                <td className="text-right">₦0.00</td>
              </tr>
              <tr>
                <td>Card</td>
                <td className="text-right">₦0.00</td>
                <td className="text-right">₦0.00</td>
              </tr>
              <tr>
                <td>Voucher Redemptions</td>
                <td className="text-right">₦0.00</td>
                <td className="text-right">₦0.00</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td className="font-weight-bold">Payments collected</td>
                <td className="text-right font-weight-bold">₦0.00</td>
                <td className="text-right font-weight-bold">₦0.00</td>
              </tr>
              <tr className="regular-row">
                <td className="font-weight-bold">Of which tips</td>
                <td className="text-right font-weight-bold">₦0.00</td>
                <td className="text-right font-weight-bold">₦0.00</td>
              </tr>
              <tr className="regular-row">
                <td className="font-weight-bold">Outstanding</td>
                <td className="text-right font-weight-bold">₦0.00</td>
                <td className="text-right font-weight-bold">&nbsp;</td>
              </tr>
            </tfoot>
          </table>
        </Col>
      </Row>
    </SalesWrapper>
  </Sales>
);

export default dailySales;
