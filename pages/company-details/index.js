import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getAllCompanyModule,
  updateCompanyModule
} from "../../modules/company";
import { getUserRequest } from "../../modules/user";
import UpdateCompanyModal from "./updateCompanyModal";
import SpinerWrap from "../../components/Spinner";
import FormInput from "../../components/styles/FormInput";
import styled from "styled-components";
import { color, shadowStyle } from "../../components/styles/constant";
import AdminContainer from "../../components/AdminContainer";
import Button from "../../components/styles/Button";
import FormWrap from "../../components/styles/FormWrap";
import { Row, Col, Spin, Icon } from "antd";

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
      id: "",
      company_name: "",
      description: "",
      website: "",
      contact_number: "",
      groomer: {
        id: "",
        first_name: "",
        last_name: "",
        email: ""
      },
      submitted: false,
      openUpdateCompany: false
    };
  }

  componentDidMount() {
    this.props.getAllCompanyModule();
    this.props.getUserRequest();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.update) {
      this.props.getAllCompanyModule();
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    const { company_name, description, website, contact_number } = this.state;
    this.setState({ submitted: true });
    const data = {
      company_name: company_name,
      description: description,
      website: website,
      contact_number: contact_number
    };
    console.log(data);
    this.props.updateCompanyModule(data);
    // this.setState({ openUpdateCompany: false });
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onCloseModal = () => {
    this.setState({ openUpdateCompany: false });
  };

  // updateInput = () => {
  //   let details = {
  //     id: this.props.companies ? this.props.companies.id : "",
  //     company_name: this.props.companies
  //       ? this.props.companies.company_name
  //       : "",
  //     description: this.props.companies ? this.props.companies.description : "",
  //     website: this.props.companies ? this.props.companies.website : "",
  //     contact_number: this.props.companies
  //       ? this.props.companies.contact_number
  //       : "",

  //     openUpdateCompany: true
  //   };
  //   this.setState(details);
  //   console.log("called");
  // };

  render() {
    if (this.props.companies !== undefined) {
      const antIcon = (
        <Icon type="loading" style={{ fontSize: 18, color: "white" }} spin />
      );
      console.log(this.props.companies);
      const { submitted } = this.state;
      return (
        <AdminContainer>
          <SettingWrap className="container">
            {this.props.loading === true ? <SpinerWrap /> : null}
            <div className="page-content">
              <Row>
                <Col span={14} offset={5}>
                  <div className="userInfo">
                    <div className="user-avata">{`${this.props.user &&
                      this.props.user.first_name.charAt(0)}${this.props.user &&
                      this.props.user.last_name.charAt(0)}`}</div>
                    <div className="user-fullname">
                      {this.props.user ? (
                        `${this.props.user.first_name} ${
                          this.props.user.last_name
                        }`
                      ) : (
                        <Spin style={{ color: "#333" }} indicator={antIcon} />
                      )}
                    </div>
                  </div>
                  <FormInput>
                    <form onSubmit={this.handleSubmit}>
                      <Row gutter={16}>
                        <Col span={12}>
                          <FormWrap>
                            <label htmlFor="">First Name</label>
                            <input
                              type="text"
                              name="first_name"
                              defaultValue={
                                this.props.companies.first_name || ""
                              }
                              placeholder="Enter your first name"
                            />
                          </FormWrap>
                        </Col>
                        <Col span={12}>
                          <FormWrap>
                            <label htmlFor="">Last Name</label>
                            <input
                              type="text"
                              name="last_name"
                              defaultValue={
                                this.props.companies.last_name || ""
                              }
                              placeholder="Enter your first name"
                            />
                          </FormWrap>
                        </Col>
                        <Col span={12}>
                          <FormWrap>
                            <label htmlFor="">Email</label>
                            <input
                              type="email"
                              name="email"
                              defaultValue={this.props.companies.email || ""}
                              placeholder="Enter your email"
                            />
                          </FormWrap>
                        </Col>
                        <Col span={12}>
                          <FormWrap>
                            <label htmlFor="">Company Name</label>
                            <input
                              type="text"
                              name="company_name"
                              defaultValue={
                                this.props.companies.company_name || ""
                              }
                              onChange={this.handleChange}
                              placeholder="Enter your company name"
                            />
                            {/* {submitted && !company_name && (
                              <div className="error">
                                Company name is required
                              </div>
                            )} */}
                          </FormWrap>
                        </Col>
                        <Col span={12}>
                          <FormWrap>
                            <label htmlFor="">Company Website</label>
                            <input
                              type="text"
                              name="website"
                              defaultValue={this.props.companies.website || ""}
                              onChange={this.handleChange}
                              placeholder="Enter your website"
                            />
                            {/* {submitted && !website && (
                              <div className="error">Website is required</div>
                            )} */}
                          </FormWrap>
                        </Col>
                        <Col span={12}>
                          <FormWrap>
                            <label htmlFor="">Contact Number</label>
                            <input
                              type="text"
                              name="contact_number"
                              defaultValue={
                                this.props.companies.contact_number || ""
                              }
                              onChange={this.handleChange}
                              placeholder="Enter your contact number"
                            />
                            {/* {submitted && !contact_number && (
                              <div className="error">
                                Contact number is required
                              </div>
                            )} */}
                          </FormWrap>
                        </Col>
                        <Col span={24}>
                          <FormWrap>
                            <label htmlFor="">Description</label>
                            <textarea
                              name="description"
                              defaultValue={
                                this.props.companies.description || ""
                              }
                              onChange={this.handleChange}
                              placeholder="Enter description"
                            />
                            {/* {submitted && !description && (
                              <div className="error">
                                Description is required
                              </div>
                            )} */}
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
                            {"Update Company Details"}
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
  user: state.user.user,
  loading: state.company.loading
});

export default connect(
  mapStateToProps,
  {
    getAllCompanyModule,
    updateCompanyModule,
    getUserRequest
  }
)(Company);
