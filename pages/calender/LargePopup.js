import React, { Component } from "react";
import styled from "styled-components";
import Button from "../../components/styles/Button";
import SpinerWrap from "../../components/Spinner";
import FormInput from "../../components/styles/FormInput";
import Link from "../../components/Link";
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
    width: 100%;
    .form-section {
      width: 60%;
      height: 100%;
      padding: 4rem 11rem 0 20rem;
      overflow: auto;
      .date-title {
        font-size: 25px;
        font-weight: 300;
        margin-bottom: 2rem;
      }
    }
    .client-section {
      width: 40%;
      height: 100%;
      overflow: auto;
      border-left: 1px solid ${color.borderColor};
      .client-title {
        font-size: 25px;
        font-weight: 300;
        margin-bottom: 2rem;
      }
    }
  }
  .selected-client {
    background: rgba(251, 251, 251, 0);
    padding: 2rem 5rem;
    margin-bottom: 5rem;
    border-bottom: 1px solid ${color.borderColor};
    .client-wrap {
      width: 100%;
      border: 1px solid #f7f7f8;
      padding: 1.5rem 4rem 1.5rem 1.5rem;
      border-radius: 3px;
      background: #fff;
      box-shadow: 0 2px 5px 0 rgba(164, 173, 186, 0.25);
      margin-bottom: 1rem;
      position: relative;
      i {
        display: inline-block;
        position: absolute;
        right: 1rem;
        top: 2.8rem;
        cursor: pointer;
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
  .selected-variant-wrap {
    padding: 2rem 6rem;
    .title {
      font-weight: 400;
      display: block;
      padding-bottom: 0.1rem;
      margin-bottom: 0.5rem;
    }
    .selected-variant {
      position: relative;
      display: inline-block;
      margin-right: 1rem;
      margin-bottom: 1rem;
      span {
        display: inline-block;
        background: #efefef;
        border-radius: 4px;
        &.name {
          font-size: 1.4rem;
          font-size: 1.4rem;
          padding: 0 1rem;
        }
        &.remove {
          cursor: pointer;
          padding-right: 5px;
          i {
            font-size: 1.4rem;
            vertical-align: sub;
          }
        }
      }
    }
  }
  .search-wrap {
    background: rgba(251, 251, 251, 0);
    padding: 2rem 5rem;
    margin-bottom: 5rem;
    border-bottom: 1px solid ${color.borderColor};
    .input-wrap {
      background: #fff;
      display: flex;
      border: 1px solid ${color.borderColor};
      height: 4.5rem;
      span.icon {
        display: inline-block;
        width: 10%;
        text-align: center;
        padding-top: 1.1rem;
        cursor: pointer;
        i {
          color: #999;
        }
      }
      input {
        display: inline-block;
        width: 90%;
        border: none;
        background: transparent;
        padding: 0 2rem;
        outline: none;
      }
    }
  }
  .result-wrap {
    padding: 0 5rem;
    .client-wrap {
      width: 100%;
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
  .no-result-wrap {
    padding: 0 5rem;
    text-align: center;
    .icon {
      i {
        font-size: 10rem;
        padding-bottom: 1rem;
        color: #67768c;
      }
    }
    .msg {
      color: #67768c;
      font-size: 1.6rem;
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
  state = {
    displayedContacts: this.props.clients && this.props.clients,
    selected_client: {},
    customer: "",
    selected_variant: [],
    show_service: false
  };

  start_time = React.createRef();
  note = React.createRef();
  service = React.createRef();
  pet = React.createRef();
  price = React.createRef();
  duration = React.createRef();

  handleSubmit = e => {
    e.preventDefault();
    let obj = {
      total_price: 0,
      customer: this.state.customer,
      start_time: `${this.props.modalState.selected_day}T${
        this.start_time.current.value
      }`,
      note: this.note.current.value,
      products: this.selectedVariant,
      services: [
        {
          service:
            this.service.current !== null ? this.service.current.value : "",
          pet: this.pet.current !== null ? this.pet.current.value : "",
          price: this.price.current !== null ? this.price.current.value : "",
          start_time:
            this.start_time.current !== null
              ? `${this.props.modalState.selected_day}T${
                  this.start_time.current.value
                }`
              : "",
          duration:
            this.duration.current !== null ? this.duration.current.value : ""
        }
      ]
    };
    this.props.handleAppointmentSubmit(obj);
  };

  handleChange = () => {
    let obj = {
      selected_time: this.start_time.current.value
    };

    this.props.handleAppointmentChange(obj);
  };

  searchHandler = event => {
    let searcjQery = event.target.value.toLowerCase(),
      displayedContacts =
        this.props.clients &&
        this.props.clients.filter(el => {
          let fullName = `${el.first_name}${el.last_name}`;
          let searchValue = fullName.toLowerCase();

          return searchValue.indexOf(searcjQery) !== -1;
        });
    this.setState({
      displayedContacts: displayedContacts
    });
  };

  getClients = () => {
    this.setState({
      displayedContacts: this.props.clients && this.props.clients
    });
  };

  selectClient = x => {
    this.setState({
      selected_client: x,
      customer: x.id,
      show_service: true
    });
  };

  cancelClient = () => {
    this.setState({
      show_service: false
    });
  };

  selectedVariant = [...new Set(this.selectedVariant)];
  variantReview = [...new Set(this.selectedVariant)];
  addProduct = obj => {
    let newObj = {
      product: obj.product,
      variant: obj.id,
      quantity: obj.quantity,
      unit_price: obj.retail_price
    };
    let review = {
      count: 0,
      id: obj.id,
      name: obj.name,
      unit_price: obj.retail_price
    };
    this.selectedVariant.push(newObj);
    this.variantReview.push(review);
    this.setState({
      selected_variant: this.variantReview
    });
  };

  removeProduct = x => {
    let selected = x;
    this.state.selected_variant.filter((x, index) => {
      if (x.id === selected.id) {
        this.variantReview.splice(index, 1);
        this.selectedVariant.splice(index, 1);
      }
    });
    this.setState({
      selected_variant: this.variantReview
    });
  };

  render() {
    const {
      picked_date,
      selected_time,
      start_time,
      submitted,
      openLargePopup
    } = this.props.modalState;
    let contacts = this.state.displayedContacts;
    let selectedClient = this.state.selected_client;
    let pickedVariant = this.state.selected_variant;
    if (openLargePopup) {
      if (this.props.clients !== undefined) {
        return (
          <PopupWrap>
            {this.props.loading === true ? <SpinerWrap /> : null}
            <div className="header">
              {this.props.title}{" "}
              <span onClick={this.props.close} className="icon">
                <i className="material-icons"> close </i>
              </span>
            </div>
            <form onSubmit={this.handleSubmit}>
              <div className="container-wrap">
                <div className="pop-content">
                  <div className="form-section">
                    <div className="date-title">{picked_date}</div>
                    <FormInput>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="form-wrap">
                            <label htmlFor="">Start Time</label>
                            <select
                              name="start_time"
                              ref={this.start_time}
                              onChange={this.handleChange}
                              value={selected_time}
                            >
                              <option>--- Select Option ---</option>
                              <option value="00:00">0:00</option>
                              <option value="1:00">1:00</option>
                              <option value="1:30">1:30</option>
                              <option value="2:00">2:00</option>
                              <option value="2:30">2:30</option>
                              <option value="3:00">3:00</option>
                              <option value="3:30">3:30</option>
                              <option value="4:00">4:00</option>
                              <option value="4:30">4:30</option>
                              <option value="5:00">5:00</option>
                              <option value="5:30">5:30</option>
                              <option value="6:00">6:00</option>
                              <option value="6:30">6:30</option>
                              <option value="7:00">7:00</option>
                              <option value="7:30">7:30</option>
                              <option value="8:00">8:00</option>
                              <option value="8:30">8:30</option>
                              <option value="9:00">9:00</option>
                              <option value="9:30">9:30</option>
                              <option value="10:00">10:00</option>
                              <option value="10:30">10:30</option>
                              <option value="11:00">11:00</option>
                              <option value="11:30">11:30</option>
                              <option value="12:00">12:00</option>
                              <option value="12:30">12:30</option>
                              <option value="13:00">13:00</option>
                              <option value="13:30">13:30</option>
                              <option value="14:00">14:00</option>
                              <option value="14:30">14:30</option>
                              <option value="15:00">15:00</option>
                              <option value="15:30">15:30</option>
                              <option value="16:00">16:00</option>
                              <option value="16:30">16:30</option>
                              <option value="17:00">17:00</option>
                              <option value="17:30">17:30</option>
                              <option value="18:00">18:00</option>
                              <option value="18:30">18:30</option>
                              <option value="19:00">19:00</option>
                              <option value="19:30">19:30</option>
                              <option value="20:00">20:00</option>
                              <option value="20:30">20:30</option>
                              <option value="21:00">21:00</option>
                              <option value="21:30">21:30</option>
                              <option value="22:00">22:00</option>
                              <option value="22:30">22:30</option>
                              <option value="23:00">23:00</option>
                              <option value="23:30">23:30</option>
                              <option value="24:00">24:00</option>
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
                              ref={this.note}
                              onChange={this.handleChange}
                              placeholder="Add an appointment note (visible to staff only)"
                            />
                          </div>
                        </div>
                      </div>
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
                                              <button
                                                onClick={e => {
                                                  e.preventDefault();
                                                  this.addProduct(obj);
                                                }}
                                                className="table-select-btn"
                                              >
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
                    {!this.state.show_service && (
                      <div>
                        <div className="search-wrap">
                          <div className="input-wrap">
                            <span className="icon">
                              <i className="material-icons"> search </i>
                            </span>
                            <input
                              type="text"
                              onFocus={this.getClients}
                              onChange={this.searchHandler}
                              placeholder="Search client"
                            />
                          </div>
                        </div>
                        <div className="result-wrap">
                          {contacts &&
                            contacts.map(x => (
                              <div
                                key={x.id}
                                className="client-wrap"
                                onClick={() => this.selectClient(x)}
                              >
                                <div className="avata">
                                  {x.first_name.charAt(0)}
                                </div>
                                <div className="client-content">
                                  <span className="name">
                                    {x.first_name} {x.last_name}
                                  </span>
                                  <span className="email">{x.email}</span>
                                </div>
                              </div>
                            ))}
                        </div>
                        <div className="no-result-wrap">
                          {this.state.displayedContacts === undefined ? (
                            <div>
                              <div className="icon">
                                <i className="material-icons"> search </i>
                              </div>
                              <div className="msg">
                                Use the search to add a client.
                              </div>
                            </div>
                          ) : null}

                          {this.state.displayedContacts &&
                          this.state.displayedContacts.length === 0 ? (
                            <div>
                              <div className="icon">
                                <i className="material-icons"> pet </i>
                              </div>
                              <div className="msg">
                                Match not found,{" "}
                                <Link href="/client">
                                  <a>add new client</a>
                                </Link>
                              </div>
                            </div>
                          ) : null}
                        </div>
                      </div>
                    )}

                    {this.state.show_service && (
                      <div>
                        <div className="selected-client">
                          <div className="client-wrap">
                            <div className="client-content">
                              <span className="name">
                                {selectedClient.first_name}{" "}
                                {selectedClient.last_name}
                              </span>
                              <span className="email">
                                {selectedClient.email}
                              </span>
                              <i
                                onClick={this.cancelClient}
                                className="material-icons"
                              >
                                {" "}
                                close{" "}
                              </i>
                            </div>
                          </div>
                        </div>
                        <FormInput>
                          <div className="col-md-10 m-auto">
                            <div className="row">
                              <div className="col-md-6">
                                <div className="form-wrap">
                                  <label htmlFor="">Service</label>
                                  <select name="service">
                                    <option value="">
                                      -- Select a service --
                                    </option>
                                    {this.props.service &&
                                      this.props.service.map(x => (
                                        <option
                                          key={x.id}
                                          value={x.id}
                                          onChange={this.handleChange}
                                          ref={this.service}
                                        >
                                          {x.name}
                                        </option>
                                      ))}
                                  </select>
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="form-wrap">
                                  <label htmlFor="">Pet</label>
                                  <select name="pet">
                                    <option value="">-- Select a pet --</option>
                                    {selectedClient.pets.map(pet => (
                                      <option
                                        key={pet.id}
                                        onChange={this.handleChange}
                                        value={pet.id}
                                        ref={this.pet}
                                      >
                                        {pet.name}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="form-wrap">
                                  <label htmlFor="">Price</label>
                                  <input
                                    name="price"
                                    type="number"
                                    onChange={this.handleChange}
                                    ref={this.price}
                                    placeholder="Service price"
                                  />
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="form-wrap">
                                  <label htmlFor="">Duration(min)</label>
                                  <input
                                    name="duration"
                                    type="number"
                                    onChange={this.handleChange}
                                    ref={this.duration}
                                    placeholder="Service Duration"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </FormInput>
                      </div>
                    )}

                    {pickedVariant.length > 0 && (
                      <div className="selected-variant-wrap">
                        <div className="title">Selected Product</div>
                        {pickedVariant.map(x => (
                          <div
                            key={performance.now()}
                            className="selected-variant"
                          >
                            <span>
                              <span className="name">
                                {x.name} ({x.unit_price})
                              </span>
                              <span
                                className="remove"
                                onClick={() => this.removeProduct(x)}
                              >
                                <i className="material-icons"> close </i>
                              </span>
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
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
            </form>
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
