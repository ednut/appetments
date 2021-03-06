import React, { Component } from "react";
import AdminContainer from "../../components/AdminContainer";
import styled from "styled-components";
import { shadowStyle, color, height } from "../../components/styles/constant";
import { Row, Col } from "antd";

const DashboardCard = styled.div`
  /* box-shadow: ${shadowStyle.lightShadow}; */
  background-color: ${color.whiteColor};
  padding: 2rem;
  margin-bottom: 3rem;
  border-radius: 1.3rem;
  border: 1px solid #e6e9ed;
  .title {
    font-weight: 600;
    text-transform: uppercase;
    border-bottom: 1px solid #e5e5e5;
    padding: 0 1rem 1rem 1rem;
    color: rgba(0,0,0,0.65);;
    font-size: 1.5rem;
    font-weight: 500;
  }
  .no-data {
    text-align: center;
    padding: 4rem 0;
    span {
      display: block;
      &.icon {
        i {
          font-size: 5rem;
          color: ${color.brandColor};
        }
      }
      &.data-title {
        font-weight: 200;
        font-size: 3.5rem;
        /* line-height: 3rem; */
        padding-bottom: ${height.gutterHeight};
      }
    }
    .caption {
      color: rgba(0,0,0,0.65);
    }
  }
`;

class Dashboard extends Component {
  render() {
    return (
      <AdminContainer>
        <Row gutter={32}>
          <Col span={12}>
            <DashboardCard>
              <div className="title">Recent Sales</div>
              <div className="no-data">
                <span className="icon">
                  <i className="material-icons"> timeline </i>
                </span>
                <span className="data-title">No Sales Data</span>
                <div className="caption">
                  Make some appointments for sales data to appear
                </div>
              </div>
            </DashboardCard>
          </Col>
          <Col span={12}>
            <DashboardCard>
              <div className="title">Upcoming Appointment</div>
              <div className="no-data">
                <span className="icon">
                  <i className="material-icons"> alarm_on </i>
                </span>
                <span className="data-title">Your Schedule is Empty</span>
                <div className="caption">
                  Make some appointments for schedule data to appear
                </div>
              </div>
            </DashboardCard>
          </Col>
          <Col span={12}>
            <DashboardCard>
              <div className="title"> Appointment Activities</div>
              <div className="no-data">
                <span className="icon">
                  <i className="material-icons"> history </i>
                </span>
                <span className="data-title">No Recent Activity</span>
                <div className="caption">
                  Visit the calendar section to add some appointments
                </div>
              </div>
            </DashboardCard>
          </Col>
          <Col span={12}>
            <DashboardCard>
              <div className="title"> Today's Next Appointment</div>
              <div className="no-data">
                <span className="icon">
                  <i className="material-icons"> calendar_today </i>
                </span>
                <span className="data-title">No Appointments Today</span>
                <div className="caption">
                  Visit the calendar section to add some appointments
                </div>
              </div>
            </DashboardCard>
          </Col>
          <Col span={12}>
            <DashboardCard>
              <div className="title"> Top Service</div>
              <div className="no-data">
                <span className="icon">
                  <i className="material-icons"> bar_chart </i>
                </span>
                <span className="data-title">No Sales This Month</span>
                <div className="caption">
                  Create some invoices for sales data to appear
                </div>
              </div>
            </DashboardCard>
          </Col>
          <Col span={12}>
            <DashboardCard>
              <div className="title"> Top Staff</div>
              <div className="no-data">
                <span className="icon">
                  <i className="material-icons"> bar_chart </i>
                </span>
                <span className="data-title">No Sales This Month</span>
                <div className="caption">
                  Create some invoices for sales data to appear
                </div>
              </div>
            </DashboardCard>
          </Col>
        </Row>
      </AdminContainer>
    );
  }
}

export default Dashboard;
