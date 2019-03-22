import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getAllCompanyModule,
  updateCompanyModule
} from "../../modules/company";
import UpdateCalenderModal from "./updateCalenderModal";
import SpinerWrap from "../../components/Spinner";
import FormInput from "../../components/styles/FormInput";
import styled from "styled-components";
import { color, shadowStyle } from "../../components/styles/constant";
import AdminContainer from "../../components/AdminContainer";
import Button from "../../components/styles/Button";

const SettingWrap = styled.div`
  .title {
    font-weight: 600;
    font-size: 1.7rem;
    margin-bottom: 1.5rem;
    color: ${color.brandColor};
  }
  .wrapper {
    padding: 2rem 4rem;
    background-color: ${color.whiteColor};
    box-shadow: ${shadowStyle.shadow};
    border-radius: 0.5rem;
  }
  label {
    font-weight: 600;
    color: #888;
    font-size: 1.3rem;
  }
  .cont {
    font-size: 1.7rem;
    line-height: 2rem;
    margin-bottom: 1.5rem;
  }
  .marginBottom-2 {
    margin-bottom: 4rem;
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
    padding-left: 5px;
    box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.2);
    position: fixed;
    bottom: 50px;
    right: 40px;
    cursor: pointer;
    outline: none;
    i {
      font-size: 24px;
    }
    &:hover {
      transform: translateY(-0.3rem);
    }
  }
`;

class Company extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      hours_bookable_in_advance: "",
      max_day_bookable_in_advance: "",
      cancellation_limit: "",
      opening_time: "",
      closing_time: "",
      submitted: false,
      openUpdateCompany: false
    };
  }

  componentDidMount() {
    this.props.getAllCompanyModule();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.update) {
      this.props.getAllCompanyModule();
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    const {
      hours_bookable_in_advance,
      max_day_bookable_in_advance,
      cancellation_limit,
      opening_time,
      closing_time
    } = this.state;
    this.setState({ submitted: true });
    const data = {
      hours_bookable_in_advance: hours_bookable_in_advance,
      max_day_bookable_in_advance: max_day_bookable_in_advance,
      cancellation_limit: cancellation_limit,
      opening_time: opening_time,
      closing_time: closing_time
    };
    this.props.updateCompanyModule(data);
    this.setState({ openUpdateCompany: false });
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onCloseModal = () => {
    this.setState({ openUpdateCompany: false });
  };

  updateInput = () => {
    let details = {
      id: this.props.companies ? this.props.companies.id : "",
      hours_bookable_in_advance: this.props.companies
        ? this.props.companies.hours_bookable_in_advance
        : "",
      max_day_bookable_in_advance: this.props.companies
        ? this.props.companies.max_day_bookable_in_advance
        : "",
      cancellation_limit: this.props.companies
        ? this.props.companies.cancellation_limit
        : "",
      opening_time: this.props.companies
        ? this.props.companies.opening_time
        : "",
      closing_time: this.props.companies
        ? this.props.companies.closing_time
        : "",
      openUpdateCompany: true
    };
    this.setState(details);
    console.log("called");
  };

  render() {
    if (this.props.companies !== undefined) {
      return (
        <AdminContainer>
          <SettingWrap className="container">
            {this.props.loading === true ? <SpinerWrap /> : null}
            <UpdateCalenderModal
              modalState={this.state}
              onCloseModal={this.onCloseModal}
              handleChange={this.handleChange}
              handleSubmit={this.handleSubmit}
              loading={this.props.loading}
              title={"Update Calender Settings"}
            />
            <div className="action-wrap">
              <button onClick={this.updateInput}>
                <i className="far fa-edit" />
              </button>
            </div>

            <div className="row marginBottom-2">
              <div className="col-md-10 m-auto">
                <div className="wrapper">
                  <div className="title">Booking Details</div>
                  <div className="row">
                    <div className="col-md-4">
                      <label htmlFor="">Hours bookable in advance</label>
                      <div className="cont">
                        {this.props.companies.hours_bookable_in_advance}
                      </div>
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="">Max day bookable in advance</label>
                      <div className="cont">
                        {this.props.companies.max_day_bookable_in_advance}
                      </div>
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="">Cancellation limit</label>
                      <div className="cont">
                        {this.props.companies.cancellation_limit}
                      </div>
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="">Opening time</label>
                      <div className="cont">
                        {this.props.companies.opening_time}
                      </div>
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="">Closing time</label>
                      <div className="cont">
                        {this.props.companies.closing_time}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SettingWrap>
        </AdminContainer>
      );
    } else {
      return (
        <AdminContainer>
          <SettingWrap>
            <SpinerWrap />
          </SettingWrap>
        </AdminContainer>
      );
    }
  }
}

const mapStateToProps = state => ({
  companies: state.company.companies,
  update: state.company.update,
  loading: state.company.loading
});

export default connect(
  mapStateToProps,
  {
    getAllCompanyModule,
    updateCompanyModule
  }
)(Company);
