import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import styled from "styled-components";
import { shadowStyle, color, height } from "../components/styles/constant";
import {
  getAllOnlineOrdersRequest,
  confirmOnlineBookingRequest
} from "../modules/orderModule";
import SpinerWrap from "../components/Spinner";
import Button from "../components/styles/Button";
import AdminContainer from "../components/AdminContainer";
import NoData from "../components/NoData";
import { Table, Divider, Tag, Popconfirm } from "antd";

const ContentWrap = styled.div`
  .action-wrap {
    margin-bottom: ${height.gutterHeight};
    text-align: right;
  }
  button {
    width: 6rem;
    height: 6rem;
    border-radius: 50%;
    border: none;
    background-color: ${color.brandColor};
    color: #fff;
    animation: moveInBottom 1s linear;
    transition: all 0.2s;
    padding-top: 5px;
    box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.2);
    position: fixed;
    bottom: 50px;
    right: 40px;
    cursor: pointer;
    outline: none;
    i {
      font-size: 32px;
    }
    &:hover {
      transform: translateY(-0.3rem);
    }
  }
`;

class CreateService extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: ""
    };
  }
  componentDidMount() {
    this.props.getAllOnlineOrdersRequest();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.onlineBooking) {
      this.props.getAllOnlineOrdersRequest();
    }
  }

  render() {
    if (this.props.order !== undefined) {
      const columns = [
        {
          title: "Booking Type",
          dataIndex: "booking_type",
          key: "booking_type"
        },
        {
          title: "Start time",
          dataIndex: "start_time",
          key: "start_time",
          render: x => moment(x).format("MMMM Do YYYY, h:mm a")
        },
        {
          title: "End time",
          dataIndex: "end_time",
          key: "end_time",
          render: x => moment(x).format("MMMM Do YYYY, h:mm a")
        },
        {
          title: "Total duration",
          dataIndex: "service_duration",
          key: "service_duration",
          render: x => (
            <span>
              {x}
              {" minutes"}
            </span>
          )
        },
        {
          title: "Services",
          key: "pet_service",
          dataIndex: "pet_service",
          render: x => x.map(y => <Tag key={y}>{y}</Tag>)
        },
        {
          title: "Pets",
          key: "pets",
          dataIndex: "pets",
          render: x => x.map(y => <Tag key={y}>{y}</Tag>)
        },
        {
          title: "Total Price",
          dataIndex: "price",
          key: "price",
          render: x => <span>${x}</span>
        },
        {
          title: "Action",
          key: "action",
          dataIndex: "action",
          render: (x, record) => (
            <span>
              {/* <a href="javascript:;">Edit</a>
              <Divider type="vertical" /> */}
              <a
                onClick={() => this.props.confirmOnlineBookingRequest(x.id)}
                href="javascript:;"
              >
                Confirm booking
              </a>
            </span>
          )
        }
      ];

      const data = this.props.order.map(function(x) {
        return {
          key: x.id,
          booking_type: x.booking_type,
          start_time: x.start_time,
          end_time: x.end_time,
          service_duration: x.total_duration,
          pet_service:
            x.services.map(function(service) {
              let arr = [];
              arr.push(service.service_details.name);
              return arr;
            }).length > 0
              ? x.services.map(function(service) {
                  let arr = [];
                  arr.push(service.service_details.name);
                  return arr;
                })
              : ["No service selected"],
          pets:
            x.services.map(function(pet) {
              let arr = [];
              arr.push(pet.pet_details.name);
              return arr;
            }).length > 0
              ? x.services.map(function(pet) {
                  let arr = [];
                  arr.push(pet.pet_details.name);
                  return arr;
                })
              : ["No pet yet"],
          price: x.total_duration,
          action: x
        };
      });
      const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(
            `selectedRowKeys: ${selectedRowKeys}`,
            "selectedRows: ",
            selectedRows
          );
        },
        getCheckboxProps: record => ({
          disabled: record.name === "Disabled User", // Column configuration not to be checked
          name: record.name
        })
      };

      return (
        <AdminContainer>
          <ContentWrap>
            {this.props.loading === true ? <SpinerWrap /> : null}

            <div className="action-wrap">
              <button onClick={this.onOpenCreateModal}>
                <i className="material-icons"> add </i>
              </button>
            </div>
            <Table
              rowSelection={rowSelection}
              columns={columns}
              dataSource={data}
            />
            {this.props.order.length === 0 ? (
              <NoData message="No Service Created Yet." />
            ) : null}
          </ContentWrap>
        </AdminContainer>
      );
    } else {
      return (
        <AdminContainer>
          <ContentWrap>
            <SpinerWrap />
          </ContentWrap>
        </AdminContainer>
      );
    }
  }
}

const mapStateToProps = state => ({
  order: state.orderReducer.onlineOrder,
  onlineBooking: state.orderReducer.onlineBooking,
  loading: state.orderReducer.loading
});

export default connect(
  mapStateToProps,
  {
    getAllOnlineOrdersRequest,
    confirmOnlineBookingRequest
  }
)(CreateService);
