import React, { Component } from "react";
import Modal from "react-responsive-modal";
import FormInput from "../../components/styles/FormInput";
import Button from "../../components/styles/Button";
import { shadowStyle, color, height } from "../../components/styles/constant";
import styled from "styled-components";

const ModalWrap = styled.div`
  width: 55rem;
  padding: 0 2rem;
  height: auto;
  .title {
    height: 5rem;
    font-size: 2.5rem;
    margin-bottom: 2rem;
    font-weight: 200;
    border-bottom: 1px solid ${color.borderColor};
  }
  footer {
    height: 5rem;
    width: 100%;
  }
`;

class UpdateCompanyModal extends Component {
  render() {
    const {
      company_name,
      description,
      website,
      contact_number,
      hours_bookable_in_advance,
      max_day_bookable_in_advance,
      cancellation_limit,
      opening_time,
      closing_time,
      submitted,
      openUpdateCompany
    } = this.props.modalState;
    return (
      <Modal open={openUpdateCompany} onClose={this.props.onCloseModal}>
        <ModalWrap>
          <div className="title">{this.props.title}</div>
          <FormInput>
            <form onSubmit={this.props.handleSubmit}>
              <div className="row">
                <div className="col-md-12">
                  <div className="form-wrap">
                    <label htmlFor="">Company Name</label>
                    <input
                      type="text"
                      name="company_name"
                      value={company_name || ""}
                      onChange={this.props.handleChange}
                      placeholder="Enter your company name"
                    />
                    {submitted && !company_name && (
                      <div className="error">Company name is required</div>
                    )}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-wrap">
                    <label htmlFor="">Company Website</label>
                    <input
                      type="text"
                      name="website"
                      value={website || ""}
                      onChange={this.props.handleChange}
                      placeholder="Enter your website"
                    />
                    {submitted && !website && (
                      <div className="error">Website is required</div>
                    )}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-wrap">
                    <label htmlFor="">Contact Number</label>
                    <input
                      type="text"
                      name="contact_number"
                      value={contact_number || ""}
                      onChange={this.props.handleChange}
                      placeholder="Enter your contact number"
                    />
                    {submitted && !contact_number && (
                      <div className="error">Contact number is required</div>
                    )}
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-wrap">
                    <label htmlFor="">Description</label>
                    <textarea
                      name="description"
                      value={description || ""}
                      onChange={this.props.handleChange}
                      placeholder="Enter description"
                    />
                    {submitted && !description && (
                      <div className="error">Description is required</div>
                    )}
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-wrap">
                    <label htmlFor="">Hours Bookable In Advance</label>
                    <select
                      name="hours_bookable_in_advance"
                      value={hours_bookable_in_advance || ""}
                      onChange={this.props.handleChange}
                    >
                      <option>--- Select Option ---</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </select>
                    {submitted && !hours_bookable_in_advance && (
                      <div className="error">
                        Hours bookable in advance is required
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-wrap">
                    <label htmlFor="">Max Day Bookable In Advance</label>
                    <select
                      name="max_day_bookable_in_advance"
                      value={max_day_bookable_in_advance || ""}
                      onChange={this.props.handleChange}
                    >
                      <option>--- Select Option ---</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </select>
                    {submitted && !max_day_bookable_in_advance && (
                      <div className="error">
                        Max day bookable in advance is required
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-wrap">
                    <label htmlFor="">Cancellation Limit</label>
                    <select
                      name="cancellation_limit"
                      value={cancellation_limit || ""}
                      onChange={this.props.handleChange}
                    >
                      <option>--- Select Option ---</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </select>
                    {submitted && !cancellation_limit && (
                      <div className="error">
                        Cancellation limit is required
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-wrap">
                    <label htmlFor="">Opening Time</label>
                    <select
                      name="opening_time"
                      value={opening_time || ""}
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
                    {submitted && !opening_time && (
                      <div className="error">Opening time is required</div>
                    )}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-wrap">
                    <label htmlFor="">Closing Time</label>
                    <select
                      name="closing_time"
                      value={closing_time || ""}
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
                    {submitted && !closing_time && (
                      <div className="error">Closing time is required</div>
                    )}
                  </div>
                </div>
              </div>

              <footer>
                <Button
                  buttonColor={color.brandColor}
                  textColor={color.whiteColor}
                  type="submit"
                  className="float-right"
                >
                  {" "}
                  {this.props.loading ? "Loading...." : "Update Company"}
                </Button>
              </footer>
            </form>
          </FormInput>
        </ModalWrap>
      </Modal>
    );
  }
}

export default UpdateCompanyModal;
