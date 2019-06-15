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
import { Row, Col, Card } from "antd";
import FormWrap from "../../components/styles/FormWrap";

const SettingWrap = styled.div`
  .page-title {
    font-weight: 400;
    font-size: 20px;
  }
  .page-content {
    margin-top: 4rem;
    margin-bottom: 5rem;
    .userInfo {
      margin-bottom: 5rem;
      .title {
        font-weight: 600;
        font-size: 20px;
        padding-bottom: 5px;
      }
      .user-avata {
        width: 10rem;
        height: 10rem;
        border-radius: 50%;
        display: inline-block;
        text-align: center;
        vertical-align: text-bottom;
        background: #2e977b;
        color: #fff;
        font-weight: 600;
        font-size: 40px;
        padding-top: 15px;
        color: #fff;
        font-weight: 600;
        font-size: 40px;
        padding-top: 15px;
      }
      .user-fullname {
        font-size: 18px;
        margin-left: 20px;
        vertical-align: top;
        padding-top: 33px;
        display: inline-block;
      }
    }
    button {
      float: right;
    }
  }
`;

class Company extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
      console.log("state", this.state);
      const {
        hours_bookable_in_advance,
        max_day_bookable_in_advance,
        cancellation_limit,
        opening_time,
        closing_time
      } = this.state;
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
            {/* <div className="action-wrap">
              <button onClick={this.updateInput}>
                <i className="far fa-edit" />
              </button>
            </div> */}

            <div className="page-content">
              <Row>
                <Col span={14} offset={5}>
                  <div className="userInfo">
                    <div className="title">Calender Settings</div>
                    <div className="caption">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Quo perferendis mollitia molestias inventore! Quos,
                      adipisicing elit. Quo perferendis mollitia molestias
                      inventore! Quos, quidem.
                    </div>
                  </div>
                  <FormInput>
                    <form onSubmit={this.handleSubmit}>
                      <Row gutter={16}>
                        <Col span={8}>
                          <FormWrap>
                            <label htmlFor="">Hours bookable in advance</label>
                            <input
                              type="text"
                              onChange={this.handleChange}
                              name="hours_bookable_in_advance"
                              value={hours_bookable_in_advance}
                            />
                          </FormWrap>
                        </Col>
                        <Col span={8}>
                          <FormWrap>
                            <label htmlFor="">
                              Max day bookable in advance
                            </label>
                            <input
                              type="text"
                              onChange={this.handleChange}
                              name="max_day_bookable_in_advance"
                              value={max_day_bookable_in_advance}
                            />
                          </FormWrap>
                        </Col>
                        <Col span={8}>
                          <FormWrap>
                            <label htmlFor="">Cancellation limit</label>
                            <input
                              type="text"
                              name="cancellation_limit"
                              onChange={this.handleChange}
                              value={cancellation_limit}
                            />
                          </FormWrap>
                        </Col>
                        <Col span={12}>
                          <FormWrap>
                            <label htmlFor="">Opening time</label>
                            <input
                              type="text"
                              name="opening_time"
                              onChange={this.handleChange}
                              value={opening_time}
                            />
                          </FormWrap>
                        </Col>
                        <Col span={12}>
                          <FormWrap>
                            <label htmlFor="">Closing time</label>
                            <input
                              type="text"
                              name="closing_time"
                              onChange={this.handleChange}
                              value={closing_time}
                            />
                          </FormWrap>
                        </Col>

                        <Col span={24}>
                          <Button
                            buttonColor={color.brandColor}
                            textColor={color.whiteColor}
                            type="submit"
                            className="float-left"
                          >
                            {" "}
                            {"Save Calender Settings"}
                          </Button>
                        </Col>
                      </Row>
                    </form>
                  </FormInput>
                </Col>
              </Row>
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
