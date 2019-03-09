import React, { Component } from "react";
import styled from "styled-components";
import Button from "../../components/styles/Button";
import SpinerWrap from "../../components/Spinner";
import FormInput from "../../components/styles/FormInput";
import { shadowStyle, color, height } from "../../components/styles/constant";
import Spinner from "../../components/Spinner";
import TableWrapper from "../../components/styles/TableWrap";

const PopupWrap = styled.section`
  position: fixed;
  background: #fbfbfb;
  z-index: 1000;
  width: 100%;
  height: 100%;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  .header {
    background: #fff;
    text-align: center;
    border-bottom: 1px solid ${color.borderColor};
    font-size: 3.3rem;
    height: 10vh;
    line-height: 10vh;
    font-weight: 200;
    z-index: 10;
    .icon {
      display: inline-block;
      position: absolute;
      right: 5rem;
      cursor: pointer;
      i {
        font-size: 3.5rem;
        vertical-align: middle;
      }
    }
  }
  .container-wrap {
    height: 80vh;
  }
  .pop-content {
    overflow: auto;
    display: flex;
    height: 100%;
    margin: auto;
    width: 80%;
    .form-section {
      width: 55%;
      height: 100%;
      padding: 2rem;
      overflow: auto;
      .date-title {
        font-size: 25px;
        font-weight: 300;
        margin-bottom: 2rem;
      }
    }
    .client-section {
      width: 45%;
      padding: 2rem 2rem 2rem 4rem;
      height: 100%;
      overflow: auto;
      border-left: 1px solid ${color.borderColor};
      .client-title {
        font-size: 25px;
        font-weight: 300;
        margin-bottom: 2rem;
      }
      .client-wrap {
        width: 80%;
        border: 1px solid #f7f7f8;
        padding: 15px;
        border-radius: 3px;
        background: #fff;
        box-shadow: 0 2px 5px 0 rgba(164, 173, 186, 0.25);
        display: flex;
        margin-bottom: 1rem;
        cursor: pointer;
        &:hover {
          background-color: #fbfbfb;
        }
        .avata {
          width: 5rem;
          height: 5rem;
          border-radius: 50%;
          text-align: center;
          font-size: 30px;
          background-color: #eef0f2;
          border: none;
          margin-right: 3rem;
          text-transform: uppercase;
        }
        .client-content {
        }
        .name {
          display: block;
          font-weight: 600;
          font-size: 17px;
        }
        .email {
          display: block;
          color: #777;
        }
      }
    }
  }
  .product-accordion {
    position: relative;
    .card-header {
      padding: 1rem;
      cursor: pointer;
      h2 {
        font-size: 15px;
        font-weight: 500;
      }
    }
  }
  .table-select-btn {
    text-decoration: none;
    padding: 0 1rem;
    display: inline-block;
    border-radius: 0.3rem;
    -webkit-transition: all 0.2s;
    transition: all 0.2s;
    position: relative;
    -webkit-animation: moveInBottom 1s linear;
    animation: moveInBottom 1s linear;
    font-size: 1.4rem;
    font-weight: 600;
    border: none;
    outline: none;
    height: 3rem;
    background-color: #083e8d;
    color: #ffffff;
    position: relative;
    cursor: pointer;
    i {
      vertical-align: bottom;
    }
  }
  .product-title {
    font-weight: 400;
    display: block;
    padding-bottom: 0.1rem;
    margin-bottom: 0.5rem;
  }
  .footer {
    position: absolute;
    border-top: 1px solid ${color.borderColor};
    font-size: 3.3rem;
    height: 10vh;
    padding: 2rem 5rem;
    font-weight: 200;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 10;
    background: #fff;
  }
`;

class LargePopup extends Component {
  render() {
    const {
      picked_date,
      customer,
      start_time,
      note,
      services,
      products,
      submitted,
      openLargePopup
    } = this.props.modalState;
    if (openLargePopup) {
      if (this.props.clients !== undefined) {
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
                  <div className="date-title">{picked_date}</div>
                  <FormInput>
                    <form onSubmit={this.props.handleSubmit}>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="form-wrap">
                            <label htmlFor="">Start Time</label>
                            <select
                              name="start_time"
                              onChange={this.props.handleChange}
                            >
                              <option>--- Select Option ---</option>
                              <option value="00:00:00">00:00</option>
                              <option value="01:00:00">01:00</option>
                              <option value="02:00:00">02:00</option>
                              <option value="03:00:00">03:00</option>
                              <option value="04:00:00">04:00</option>
                              <option value="05:00:00">05:00</option>
                              <option value="06:00:00">06:00</option>
                              <option value="07:00:00">07:00</option>
                              <option value="08:00:00">08:00</option>
                              <option value="09:00:00">09:00</option>
                              <option value="10:00:00">10:00</option>
                              <option value="11:00:00">11:00</option>
                              <option value="12:00:00">12:00</option>
                              <option value="13:00:00">13:00</option>
                              <option value="14:00:00">14:00</option>
                              <option value="15:00:00">15:00</option>
                              <option value="16:00:00">16:00</option>
                              <option value="17:00:00">17:00</option>
                              <option value="18:00:00">18:00</option>
                              <option value="19:00:00">19:00</option>
                              <option value="20:00:00">20:00</option>
                              <option value="21:00:00">21:00</option>
                              <option value="22:00:00">22:00</option>
                              <option value="23:00:00">23:00</option>
                              <option value="24:00:00">24:00</option>
                            </select>
                            {submitted && !start_time && (
                              <div className="error">
                                Opening time is required
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="form-wrap">
                            <label htmlFor="">Appointment notes</label>
                            <textarea
                              rows="5"
                              name="note"
                              placeholder="Add an appointment note (visible to staff only)"
                            />
                          </div>
                        </div>
                      </div>
                    </form>
                  </FormInput>
                  <div className="product-title">Select a product</div>
                  <div
                    className="accordion product-accordion"
                    id="accordionExample"
                  >
                    {this.props.product
                      ? this.props.product.map((x, index) => (
                          <div key={x.id} className="card">
                            <div
                              className="card-header"
                              id={`headingOne` + x.id}
                            >
                              <h2
                                className="mb-0"
                                data-toggle="collapse"
                                data-target={`#collapseOne` + x.id}
                                aria-expanded={index === 0 ? "true" : "false"}
                                aria-controls={`collapseOne` + x.id}
                              >
                                {x.name}
                              </h2>
                            </div>

                            <div
                              id={`collapseOne` + x.id}
                              className={
                                index === 0 ? "collapse show" : "collapse"
                              }
                              aria-labelledby={`#headingOne` + x.id}
                              data-parent="#accordionExample"
                            >
                              <div className="card-body">
                                <TableWrapper
                                  style={{
                                    overflow: "auto",
                                    maxHeight: "25rem",
                                    marginBottom: "2rem"
                                  }}
                                >
                                  <table>
                                    <thead>
                                      <tr>
                                        <th>Name</th>
                                        <th>Quantity</th>
                                        <th>Retail Price</th>
                                        <th />
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {x.variants.map(obj => (
                                        <tr key={obj.id}>
                                          <td style={{ width: "35%" }}>
                                            {obj.name}
                                          </td>
                                          <td>{obj.quantity}</td>
                                          <td>${obj.retail_price}</td>
                                          <td className="">
                                            <button className="table-select-btn">
                                              <i className="material-icons">
                                                {" "}
                                                add{" "}
                                              </i>{" "}
                                              Add
                                            </button>
                                          </td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </TableWrapper>
                              </div>
                            </div>
                          </div>
                        ))
                      : null}
                  </div>
                </div>
                <div className="client-section">
                  <div className="client-title">Select a client</div>
                  {this.props.clients &&
                    this.props.clients.map(x => (
                      <div key={x.id} className="client-wrap">
                        <div className="avata">{x.first_name.charAt(0)}</div>
                        <div className="client-content">
                          <span className="name">
                            {x.first_name} {x.last_name}
                          </span>
                          <span className="email">{x.email}</span>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
            <div className="footer">
              <Button
                className="float-right"
                buttonColor={color.brandColor}
                textColor={color.whiteColor}
              >
                Save Appointment
              </Button>
            </div>
          </PopupWrap>
        );
      } else {
        return <Spinner />;
      }
    } else {
      return null;
    }
  }
}

export default LargePopup;
