import React, { Component } from "react";
import AdminContainer from "../../components/AdminContainer";
import styled from "styled-components";
import { shadowStyle, color, height } from "../../components/styles/constant";

const DashboardCard = styled.div`
  box-shadow: ${shadowStyle.lightShadow};
  background-color: ${color.whiteColor};
  padding: 2rem;
  margin-bottom: ${height.spaceHeight};
  border-radius: 1.3rem;
  .title {
    font-weight: 600;
    text-transform: uppercase;
    border-bottom: 1px solid #e5e5e5;
    padding: 0 1rem 1rem 1rem;
    color: #67768c;
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
          color: #67768c;
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
      color: #67768c;
    }
  }
`;

class Dashboard extends Component {
  render() {
    return (
      <AdminContainer>
        <div className="row">
          <div className="col-md-6">
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
          </div>

          <div className="col-md-6">
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
          </div>

          <div className="col-md-6">
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
          </div>

          <div className="col-md-6">
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
          </div>

          <div className="col-md-6">
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
          </div>

          <div className="col-md-6">
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
          </div>
        </div>
      </AdminContainer>
    );
  }
}

export default Dashboard;
