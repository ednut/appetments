import React, { Component } from "react";
import Button from "../../components/styles/Button";
import styled from "styled-components";
import moment from "moment";
import PopupWrap from "../../components/styles/PopupWrap";
import { color } from "../../components/styles/constant";
import TableWrapper from "../../components/styles/TableWrap";
import Nodata from "../../components/NoData";

const Overview = styled.table`
  width: 100%;
  margin-bottom: 2rem;
  tr {
    td {
      font-size: 1.6rem;
      vertical-align: text-top;
      padding-bottom: 1rem;
      .caption {
        font-size: 1.4rem;
        color: #67768c;
        display: block;
      }

      &:nth-child(1) {
        width: 15%;
        text-align: left;
      }
      &:nth-child(2) {
        width: 70%;
      }
      &:nth-child(3) {
        width: 15%;
        text-align: right;
      }
    }
    &.total {
      border-top: 1px solid ${color.borderColor};
      td {
        padding-top: 3rem;
        .caption {
          font-size: 1.8rem;
        }
        .total-price {
          font-size: 1.8rem;
        }
      }
    }
  }
`;

class CheckoutPopup extends Component {
  handleSubmit = e => {
    e.preventDefault();
  };

  editAppointment = obj => {
    this.props.edit(obj);
  };

  render() {
    const { checkout, openCheckoutPopup } = this.props.modalState;
    let selectedClient = this.props.clients
      ? this.props.clients.filter(
          x => x.id === this.props.modalState.checkout.customer
        )
      : [];
    // console.log(selectedClient);
    if (openCheckoutPopup) {
      let pickedDate = moment(checkout.start).format("dddd, MMMM Do YYYY");
      return (
        <PopupWrap>
          <div className="header">
            {this.props.title}{" "}
            <span onClick={this.props.close} className="icon">
              <i className="material-icons"> close </i>
            </span>
          </div>

          <div className="container-wrap">
            <div className="pop-content">
              <div className="form-section">
                <div className="date-title">{pickedDate}</div>
                <Overview>
                  <tbody>
                    {checkout &&
                      checkout.services.map(x => (
                        <tr key={x.id}>
                          <td>{moment(x.start_time).format("h:mm")}</td>
                          <td>
                            {x.service_details.name}
                            <span className="caption">{x.duration} min</span>
                          </td>
                          <td> {x.service_details.price}</td>
                        </tr>
                      ))}
                    <tr className="total">
                      <td />
                      <td>
                        <span className="caption">
                          {checkout.total_duration} minute
                        </span>
                      </td>
                      <td>
                        {" "}
                        <span className="total-price">
                          ${checkout.total_price}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </Overview>
                <div className="history">
                  <div className="title">Appointment History</div>
                  <div className="booked">
                    Booked by {this.props.company.groomer.first_name}{" "}
                    {this.props.company.groomer.last_name}, on{" "}
                    {moment(checkout.start).format("LLLL")}
                  </div>
                </div>
              </div>

              <div className="client-section">
                <div>
                  <div className="selected-client">
                    <div className="client-wrap">
                      {selectedClient &&
                        selectedClient.map(x => (
                          <div key={x.id} className="client-content">
                            <span className="name">
                              {x.first_name} {x.last_name}
                            </span>
                            <span className="email">{x.email}</span>
                          </div>
                        ))}
                    </div>
                  </div>
                  <div className="other-details">
                    <div className="title">Products</div>
                    <TableWrapper>
                      <table>
                        <thead>
                          <tr>
                            <th>Product name</th>
                            <th>Variant</th>
                            <th>price</th>
                          </tr>
                        </thead>
                        <tbody>
                          {checkout.products.length > 0
                            ? checkout.products.map(x => (
                                <tr key={x.id}>
                                  <td>{x.variant_details.product_name}</td>
                                  <td>{x.variant_details.name}</td>
                                  <td>${x.variant_details.retail_price}</td>
                                </tr>
                              ))
                            : null}
                        </tbody>
                      </table>
                      {checkout.products.length === 0 ? (
                        <Nodata message="No product available" />
                      ) : null}
                    </TableWrapper>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="footer">
            <Button
              className="float-right"
              buttonColor={color.brandColor}
              textColor={color.whiteColor}
            >
              Checkout
            </Button>{" "}
            <div className="dropdown more-option">
              <a
                href="javascript:void(0)"
                className="more-options"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                More Options <i className="fas fa-caret-up" />
              </a>
              <div className="dropdown-menu">
                <a
                  className="dropdown-item"
                  onClick={() => this.editAppointment(checkout)}
                >
                  Edit Appointment
                </a>
                <a className="dropdown-item delete">Cancel</a>
              </div>
            </div>
          </div>
        </PopupWrap>
      );
    } else {
      return null;
    }
  }
}

export default CheckoutPopup;
