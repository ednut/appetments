import React, { Component } from "react";
import BigCalendar from "react-big-calendar";
import moment from "moment";

import { connect } from "react-redux";
import {
  getAllOrdersRequest,
  createOrderRequest,
  updateOrderRequest,
  deleteOrderRequest
} from "../../modules/orderModule";
import { getAllCompanyModule } from "../../modules/company";
import {
  getAllClientsRequest,
  getClientsByIdRequest
} from "../../modules/clientModule";
import { getAllServiceRequest } from "../../modules/serviceModule";
import { getAllProductsRequest } from "../../modules/productModule";
import styled from "styled-components";
import { shadowStyle, color, height } from "../../components/styles/constant";
import SpinerWrap from "../../components/Spinner";
import CreateOrderModal from "./createOrderModal";
import UpdateOrderModal from "./updateOrderModal";
import LargePopup from "./LargePopup";

const localizer = BigCalendar.momentLocalizer(moment);

const ButtonWrap = styled.div`
  position: relative;
  .action-wrap {
    margin-bottom: ${height.gutterHeight};
    text-align: right;
  }
  button {
    width: 6rem;
    height: 6rem;
    border-radius: 50%;
    border: none;
    background-color: #083e8d;
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
    z-index: 100;
    i {
      font-size: 32px;
    }
    &:hover {
      transform: translateY(-0.3rem);
    }
  }
`;

class ScheduleCalender extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: "",
      picked_date: "",
      customer: "",
      start_time: "",
      note: "",
      services: [
        {
          service: "",
          pet: "",
          price: "",
          start_time: "",
          duration: ""
        }
      ],
      products: [
        {
          product: "",
          variant: "",
          quantity: "",
          unit_price: ""
        }
      ],
      submitted: false,
      openCreateOrder: false,
      openUpdateOrder: false,
      openLargePopup: false
    };
  }

  componentDidMount() {
    this.props.getAllOrdersRequest();
    this.props.getAllCompanyModule();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.order) {
      this.props.getAllOrdersRequest();
    }
  }

  handleCreateSubmit = e => {
    e.preventDefault();
    const { customer, start_time, status, services, products } = this.state;
    this.setState({ submitted: true });
    const data = {
      customer: customer,
      start_time: start_time,
      status: status,
      services: services,
      products: products
    };
    if (customer && start_time && status && services && products) {
      this.props.createOrderRequest(data);
      this.setState({ openCreateOrder: false });
    }
  };

  handleUpdateSubmit = e => {
    e.preventDefault();
    const { customer, start_time, status, services, products } = this.state;
    this.setState({ submitted: true });
    const data = {
      customer: customer,
      start_time: start_time,
      status: status,
      services: services,
      products: products
    };
    if (customer && start_time && status && services && products) {
      this.props.updateOrderRequest(data, this.state.id);
      this.setState({ openUpdateOrder: false });
    }
  };

  handleChange = e => {
    let order = {
      ...this.state,
      [e.target.name]: e.target.value
      // services: {
      //   ...this.state.services,
      //   [e.target.name]: e.target.value
      // },
      // products: {
      //   ...this.state.products,
      //   [e.target.name]: e.target.value
      // }
    };

    this.setState(order);
  };

  handleSelect = () => {
    console.log("handle calender select");
  };

  onOpenLargePopup = obj => {
    if (obj !== undefined) {
      let selectedTime = moment(obj.start).format("dddd, MMMM Do YYYY");
      this.setState({
        ...this.state,
        picked_date: selectedTime
      });
    } else {
      let selectedTime = moment().format("dddd, MMMM Do YYYY");
      this.setState({
        ...this.state,
        picked_date: selectedTime
      });
    }

    this.setState({ openLargePopup: true });
    this.props.getAllClientsRequest();
    this.props.getAllProductsRequest();
  };

  onCloseLargePopup = () => {
    this.setState({ openLargePopup: false });
  };

  onOpenCreateModal = () => {
    this.setState({ openCreateOrder: true });
  };

  onCloseCreateModal = () => {
    this.setState({ openCreateOrder: false });
  };

  onOpenUpdateModal = () => {
    this.setState({ openUpdateOrder: true });
  };

  onCloseUpdateModal = () => {
    this.setState({ openUpdateOrder: false });
  };

  // updateOrder = order => {
  //   this.setState({
  //     id: order.id,
  //     first_name: order.first_name,
  //     last_name: order.last_name,
  //     openUpdateOrder: true
  //   });
  //   this.setState({ openUpdateOrder: true });
  // };

  render() {
    // console.log(moment("2019-03-10T10:00").format("h:mm"));
    if (this.props.orders !== undefined && this.props.companies) {
      let currentYear = () => new Date().getFullYear();
      let currentMonth = () => new Date().getMonth();
      let currentDay = () => new Date().getDay();
      let openingTime = () => {
        let x = this.props.companies.opening_time.split(":");
        return parseInt(x[0], 10);
      };
      let closingTime = () => {
        let x = this.props.companies.closing_time.split(":");
        return parseInt(x[0], 10);
      };
      return (
        <React.Fragment>
          {this.props.loading === true ? <SpinerWrap /> : null}

          <CreateOrderModal
            modalState={this.state}
            onCloseModal={this.onCloseCreateModal}
            handleChange={this.handleChange}
            handleSubmit={this.handleCreateSubmit}
            loading={this.props.loading}
            title={"Create Order"}
          />
          <UpdateOrderModal
            modalState={this.state}
            onCloseModal={this.onCloseUpdateModal}
            handleChange={this.handleChange}
            handleSubmit={this.handleUpdateSubmit}
            loading={this.props.loading}
            title={"Update Order"}
          />
          <LargePopup
            modalState={this.state}
            close={this.onCloseLargePopup}
            clients={this.props.clients && this.props.clients}
            product={this.props.products && this.props.products}
            title="Appointment"
          />

          <ButtonWrap>
            <button onClick={() => this.onOpenLargePopup()}>
              <i className="material-icons"> add </i>
            </button>
          </ButtonWrap>

          <BigCalendar
            style={{ minHeight: "70rem" }}
            localizer={localizer}
            events={this.props.orders}
            selectable
            views={["week", "day"]}
            defaultView="week"
            step={15}
            min={
              new Date(
                currentYear(),
                currentMonth(),
                currentDay(),
                openingTime()
              )
            }
            max={
              new Date(
                currentYear(),
                currentMonth(),
                currentDay(),
                closingTime()
              )
            }
            defaultDate={new Date()}
            onSelectEvent={event => console.log(event)}
            onSelectSlot={x => this.onOpenLargePopup(x)}
          />
        </React.Fragment>
      );
    } else {
      return <SpinerWrap />;
    }
  }
}

const mapStateToProps = state => ({
  companies: state.company.companies,
  orders: state.orderReducer.orders,
  order: state.orderReducer.order,
  services: state.serviceReducer.services,
  products: state.productReducer.products,
  clients: state.clientReducer.clients,
  loading: state.orderReducer.loading
});

export default connect(
  mapStateToProps,
  {
    getAllOrdersRequest,
    createOrderRequest,
    updateOrderRequest,
    deleteOrderRequest,
    getAllCompanyModule,
    getAllClientsRequest,
    getClientsByIdRequest,
    getAllServiceRequest,
    getAllProductsRequest
  }
)(ScheduleCalender);
