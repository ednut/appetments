import React from "react";
import Sales from "./sales";
import styled from "styled-components";
import { color, height } from "../components/styles/constant";

const FilterSection = styled.div`
  width: 100%;
  position: relative;
  margin-bottom: ${height.gutterHeight};
  form {
    display: flex;
    select {
      border: 1px solid ${color.borderColor};
      width: 100%;
      margin-right: 5%;
      background-color: transparent;
      height: 4.5rem;
      border-radius: 0.3rem;
      padding: 0 1rem;
      outline: none;
    }
  }
  .pr-0 {
    padding-right: 0;
  }
`;

const InvoiceWrapper = styled.div`
  position: relative;
  .date-section {
    margin-bottom: ${height.spaceHeight};
  }
  .date {
    font-size: 1.6rem;
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

const NoData = styled.div`
  position: relative;
  text-align: center;
  color: ${color.textColor};
  margin-top: ${height.spaceHeight};
  .icon {
    i {
      font-size: 7rem;
      color: ${color.textLight};
    }
  }
  .title {
    font-size: 3rem;
    font-weight: 200;
  }
  .caption {
    margin-top: ${height.gutterHeight};
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

const Invoice = () => (
  <Sales>
    <FilterSection>
      <div className="row">
        <div className="col-md-2 pr-0 ">
          <form>
            <select name="" id="">
              <option value="yesterday">Yesterday</option>
              <option value="week">Last 7 days</option>
              <option value="month">This month</option>
              <option value="30_days">Last 30 days</option>
              <option value="tomorrow">Tomorrow</option>
              <option value="next_week">Next 7 days</option>
              <option value="next_month">Next month</option>
              <option value="next_30_days">Next 30 days</option>
              <option value="all">All time</option>
              <option value="custom">Custom range</option>
            </select>
          </form>
        </div>
        <div className=" col-md-8" />
        <div className="col-md-2">
          <form>
            <select name="" id="">
              <option value="">Export</option>
              <option value="">Excel</option>
              <option value="">PDF</option>
              <option value="">CSV</option>
            </select>
          </form>
        </div>
      </div>
    </FilterSection>
    <InvoiceWrapper>
      <div className="date-section">
        <div className="date">
          {generateDate()}, {(generateTime() < 10 ? "0" : "") + generateTime()}
        </div>
      </div>

      <table className="table sales-table">
        <thead>
          <tr>
            <th>Invoice #</th>
            <th>Client</th>
            <th>Status</th>
            <th>Invoice Date</th>
            <th className="text-right">Gross total</th>
          </tr>
        </thead>
        <tbody />
      </table>

      <NoData>
        <div className="row">
          <div className="col-md-5 m-auto">
            <div className="icon">
              <i className="material-icons"> search </i>
            </div>
            <div className="title">No Results Found</div>
            <div className="caption">
              Try using different filter options to find what you're looking for
            </div>
          </div>
        </div>
      </NoData>
    </InvoiceWrapper>
  </Sales>
);

export default Invoice;
