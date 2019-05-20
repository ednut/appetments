import React, { Component } from "react";
import OnlineBookingWrapper from "../components/OnlineBookingWrapper";
import { Row, Col, Form, Input, Select, Icon } from "antd";
import { connect } from "react-redux";
import Cookies from "js-cookie";
import {
  customerLoginRequest,
  customerSignupRequest,
  serviceDataRequest
} from "../modules/clientModule";
import { addPetToClientRequest } from "../modules/clientModule";
import AddPetToClient from "../pages/client/addPetToClientModal";
import { getAllServiceRequest } from "../modules/serviceModule";
import { getAllPetsCategoryRequest } from "../modules/petCategoryModule";
import SpinerWrap from "../components/Spinner";
import FormInput from "../components/styles/FormInput";
import FormWrap from "../components/styles/FormWrap";
import Button from "../components/styles/Button";
import { color } from "../components/styles/constant";
import Router from "next/router";

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class SelectService extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      category: "",
      serviceID: {},
      petId: "",
      openPetService: false,
      update: false
    };
  }

  componentDidMount() {
    this.props.getAllServiceRequest();
    this.props.customerLoginRequest({
      customer_code: Cookies.get("CustomerID")
    });
    this.props.getAllPetsCategoryRequest();
  }

  componentDidUpdate() {
    if (this.state.update) {
      this.updatePet();
    }
  }

  updatePet = () => {
    this.props.customerLoginRequest({
      customer_code: Cookies.get("CustomerID")
    });
    this.props.getAllServiceRequest();
    this.props.getAllPetsCategoryRequest();
    this.setState({ update: false });
  };

  onClosePetModal = () => {
    console.log("called now");
    this.setState({ openPetService: false });
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  selectedPet = e => {
    this.setState({
      category: e
    });
  };

  handlePetSubmit = e => {
    e.preventDefault();
    const { name, category } = this.state;
    this.setState({ submitted: true });
    const data = {
      name: name,
      category: category
    };
    if ((name, category)) {
      this.props.addPetToClientRequest(data, this.state.id);
      this.setState({ openPetService: false, update: true });
    }
  };

  addingPetToClient = () => {
    this.setState({
      id: this.props.data.id
    });
    this.setState({ openPetService: true });
  };

  selectedService = obj => {
    this.setState({ serviceID: obj });
  };

  onChangeService = value => {
    // console.log(value);
    // this.setState({ serviceID: value });
  };

  onChangePet = value => {
    this.setState({ petId: value });
  };

  moveToNext = () => {
    this.props.serviceDataRequest({
      service: this.state.serviceID,
      pet: this.state.petId,
      data: this.props.data
    });
    Router.push("/select-date");
  };

  render() {
    console.log("page data", this.props.data);

    const Option = Select.Option;

    function onSearch(val) {
      // console.log("search:", val);
    }

    function goBack() {
      Router.back();
    }
    if (this.props.services !== undefined && this.props.data !== undefined) {
      return (
        <OnlineBookingWrapper>
          {this.props.loading === true ? <SpinerWrap /> : null}
          <AddPetToClient
            modalState={this.state}
            onCloseModal={this.onClosePetModal}
            handleChange={this.handleChange}
            handleSubmit={this.handlePetSubmit}
            selectedPet={this.selectedPet}
            categories={this.props.petCategories && this.props.petCategories}
            loading={this.props.loading}
            title={"Add Pet to Client"}
          />
          <div className="header">
            {" "}
            <Icon onClick={goBack} type="left" /> Select a service
          </div>
          <div className="p-2 mtop-10">
            <div className="container">
              <div className="row">
                <div className="page-title" />
                <div className="col-md-8 offset-md-2">
                  <FormInput>
                    <Form>
                      <FormWrap>
                        <label htmlFor="">Select a service</label>
                        <Select
                          showSearch
                          placeholder="Select a service"
                          optionFilterProp="children"
                          onChange={this.onChangeService}
                          onSearch={onSearch}
                          filterOption={(input, option) =>
                            option.props.children
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                        >
                          {this.props.services.map(x => (
                            <Option
                              key={x.id}
                              onClick={() => this.selectedService(x)}
                              value={x.id}
                            >
                              {x.name}
                            </Option>
                          ))}
                        </Select>
                      </FormWrap>
                      <span
                        style={{
                          display: "block",
                          textAlign: "right",
                          padding: "10px"
                        }}
                      >
                        <strong
                          style={{
                            color: `${color.brandColor}`,
                            cursor: "pointer"
                          }}
                          onClick={this.addingPetToClient}
                        >
                          Add a new pet
                        </strong>
                      </span>
                      <FormWrap>
                        <label htmlFor="">Select a pet</label>
                        <Select
                          showSearch
                          placeholder="Select a pet"
                          optionFilterProp="children"
                          onChange={this.onChangePet}
                          onSearch={onSearch}
                          filterOption={(input, option) =>
                            option.props.children
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                        >
                          {this.props.data.pets.map(x => (
                            <Option key={x.id} value={x.id}>
                              {x.name}
                            </Option>
                          ))}
                        </Select>
                      </FormWrap>
                    </Form>
                  </FormInput>
                </div>
              </div>
            </div>
          </div>
          {/* {console.log(this.state.serviceID !== "" && this.state.petId !== "")} */}
          {this.state.serviceID !== "" && this.state.petId !== "" && (
            <footer>
              <div className="selected-info-wrap" />
              <button onClick={this.moveToNext}>Continue</button>
            </footer>
          )}
        </OnlineBookingWrapper>
      );
    } else {
      return (
        <OnlineBookingWrapper>
          {" "}
          <SpinerWrap />{" "}
        </OnlineBookingWrapper>
      );
    }
  }
}

const mapStateToProps = state => ({
  services: state.serviceReducer.services,
  petCategories: state.petCategoryReducer.petsCategory,
  reloadPet: state.petCategoryReducer.reloadPet,
  data: state.clientReducer.clientData,
  loading: state.clientReducer.loadingClient
});

export default connect(
  mapStateToProps,
  {
    customerLoginRequest,
    customerSignupRequest,
    getAllServiceRequest,
    serviceDataRequest,
    addPetToClientRequest,
    getAllPetsCategoryRequest
  }
)(SelectService);
