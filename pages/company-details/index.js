import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getAllCompanyModule,
  updateCompanyModule
} from "../../modules/company";
import UpdateCompanyModal from "./updateCompanyModal";
import SpinerWrap from "../../components/Spinner";
import FormInput from "../../components/styles/FormInput";
import styled from "styled-components";
import { color, shadowStyle } from "../../components/styles/constant";
import AdminContainer from "../../components/AdminContainer";
import Button from "../../components/styles/Button";
import { Row, Col, Card } from "antd";

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
    background-color: #17977c;
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
      company_name: this.props.companies
        ? this.props.companies.company_name
        : "",
      description: this.props.companies ? this.props.companies.description : "",
      website: this.props.companies ? this.props.companies.website : "",
      contact_number: this.props.companies
        ? this.props.companies.contact_number
        : "",

      openUpdateCompany: true
    };
    this.setState(details);
    console.log("called");
  };

  render() {
    if (this.props.companies !== undefined) {
      console.log(this.props.companies);
      return (
        <AdminContainer>
          <SettingWrap className="container">
            {this.props.loading === true ? <SpinerWrap /> : null}
            <UpdateCompanyModal
              modalState={this.state}
              onCloseModal={this.onCloseModal}
              handleChange={this.handleChange}
              handleSubmit={this.handleSubmit}
              loading={this.props.loading}
              title={"Update Company"}
            />
            <div className="action-wrap">
              <button onClick={this.updateInput}>
                <i className="far fa-edit" />
              </button>
            </div>

            <Row className="marginBottom-2">
              <Col span={12} offset={6}>
                <Card>
                  <div className="title">Personal Details</div>
                  <div className="row">
                    <div className="col-md-4">
                      <label htmlFor="">First Name</label>
                      <div className="cont">
                        {/* {this.props.companies.groomer.first_name} */}
                      </div>
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="">Last Name</label>
                      <div className="cont">
                        {/* {this.props.companies.groomer.last_name} */}
                      </div>
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="">Email</label>
                      <div className="cont">
                        {/* {this.props.companies.groomer.email} */}
                      </div>
                    </div>
                  </div>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col span={12} offset={6}>
                <Card>
                  <div className="title">Company Details</div>
                  <div className="row">
                    <div className="col-md-4">
                      <label htmlFor="">Company Name</label>
                      <div className="cont">
                        {this.props.companies.company_name}
                      </div>
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="">Company Website</label>
                      <div className="cont">{this.props.companies.website}</div>
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="">Contact Number</label>
                      <div className="cont">
                        {this.props.companies.contact_number}
                      </div>
                    </div>
                    <div className="col-md-12">
                      <label htmlFor="">Description</label>
                      <div className="cont">
                        {this.props.companies.description}
                      </div>
                    </div>
                  </div>
                </Card>
              </Col>
            </Row>
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
