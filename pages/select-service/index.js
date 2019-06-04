import React, { Component } from "react";
import OnlineBookingWrapper from "../../components/OnlineBookingWrapper";
import { Row, Col, Form, Input, Empty, Icon } from "antd";
import { connect } from "react-redux";
import Cookies from "js-cookie";
import {
  customerLoginRequest,
  customerSignupRequest,
  serviceDataRequest
} from "../../modules/clientModule";
import CreateServiceModal from "./createServiceModal";
import { addPetToClientRequest } from "../../modules/clientModule";
import AddPetToClient from "./createPetModal";
import { getAllServiceRequest } from "../../modules/serviceModule";
import { getAllPetsCategoryRequest } from "../../modules/petCategoryModule";
import SpinerWrap from "../../components/Spinner";
import FormInput from "../../components/styles/FormInput";
import FormWrap from "../../components/styles/FormWrap";
import Button from "../../components/styles/Button";
import { color } from "../../components/styles/constant";
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
      service: [],
      pet: "",
      openPetService: false,
      update: false,
      openCreateService: false
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
    this.forceUpdate();
    this.setState({ update: false });
  };

  onClosePetModal = () => {
    // console.log("called now");
    this.setState({ openPetService: false });
  };

  onOpenCreateModal = () => {
    this.setState({ openCreateService: true });
  };

  onCloseCreateModal = () => {
    this.setState({ openCreateService: false });
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  addingPet = e => {
    this.setState({
      category: e
    });
    console.log(e);
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

  pickedServices = [];
  pickedPet = [];

  selectedService = obj => {
    this.pickedServices.push(obj);
  };

  selectedPet = obj => {
    this.pickedPet.push(obj);
  };

  removeSelectedService = x => {
    this.pickedServices = this.pickedServices.filter(y => y.id !== x);
  };

  removeSelectedPet = x => {
    this.pickedPet = this.pickedPet.filter(y => y.id !== x);
  };

  onChangeService = value => {};

  onChangePet = value => {
    this.setState({ pet: value });
  };

  totalService = [];

  addSelectedService = () => {
    let data = this.pickedServices.map(x => ({
      service: x.id,
      service_name: x.name,
      pet: this.pickedPet.map(x => x.id),
      pet_name: this.pickedPet.map(x => x.name),
      price: x.price,
      start_time: "",
      duration: x.duration
    }));

    for (let x in data) {
      if (this.totalService.indexOf(data[x] === -1)) {
        this.totalService.push(data[x]);
      }
    }

    this.setState(prevState => ({
      service: prevState.service.concat(this.totalService),
      openCreateService: false
    }));
  };

  removeService = obj => {
    // let service = this.totalService.map(x => x.service.map(y => y));
    console.log("before", this.totalService);
    this.totalService.splice(this.totalService.indexOf(obj), 1);
    console.log("after", this.totalService);
    this.setState(prevState => ({
      service: prevState.service.concat(this.totalService)
    }));
  };

  moveToNext = () => {
    this.props.serviceDataRequest({
      service: this.totalService,
      user: this.props.data
    });
    Router.push("/select-date");
  };

  remove = x => {
    this.totalService.splice(this.totalService.indexOf(x.serviceId), 1);
    console.log("", this.totalService);
  };

  render() {
    function goBack() {
      Router.back();
    }
    console.log(this.totalService);
    if (this.props.services !== undefined && this.props.data !== undefined) {
      return (
        <OnlineBookingWrapper>
          {this.props.loading === true ? <SpinerWrap /> : null}
          <CreateServiceModal
            modalState={this.state}
            onCloseModal={this.onCloseCreateModal}
            removeSelectedService={this.removeSelectedService}
            onChangeService={this.onChangeService}
            services={this.props.services}
            addingPetToClient={this.addingPetToClient}
            onChangePet={this.onChangePet}
            removeSelectedPet={this.removeSelectedPet}
            selectedService={this.selectedService}
            selectedPet={this.selectedPet}
            moveToNext={this.addSelectedService}
            pets={this.props.data.pets}
            title={"Create Service"}
          />
          <AddPetToClient
            modalState={this.state}
            onCloseModal={this.onClosePetModal}
            handleChange={this.handleChange}
            handleSubmit={this.handlePetSubmit}
            selectedPet={this.addingPet}
            categories={this.props.petCategories && this.props.petCategories}
            loading={this.props.loading}
            title={"Add Pet to Client"}
          />
          <div className="header">
            {" "}
            <Icon onClick={goBack} type="left" /> Select a service
          </div>
          <div className="p-2 mtop-5 ">
            <div className="container">
              {this.totalService.length !== 0 ? (
                <div className="row">
                  <div className="col-md-6 offset-md-3">
                    <div className="service-creation text-right">
                      <Button
                        buttonColor={color.brandColor}
                        buttonHover={color.brandColor}
                        textColor={color.whiteColor}
                        className="button"
                        onClick={this.onOpenCreateModal}
                      >
                        Add service
                      </Button>
                    </div>

                    <div className="service-wrap">
                      <table className="table">
                        <tbody>
                          <tr>
                            <th>Pet</th>
                            <th>Service</th>
                            <th>Price</th>
                            <th />
                          </tr>
                          {this.totalService.map(y => (
                            <tr key={y.service}>
                              {console.log(y)}
                              <td>
                                {" "}
                                <span className="tag">{y.pet_name}</span>{" "}
                              </td>
                              <td>
                                {" "}
                                <span className="tag">
                                  {y.service_name}
                                </span>{" "}
                              </td>
                              <td>${y.price}</td>
                              <td>
                                <i
                                  onClick={() => this.removeService(y)}
                                  className="fas fa-times"
                                />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="row">
                  <div className="page-title" />
                  <div className="col-md-6 offset-md-3 text-center">
                    <div className="no-service">
                      <div>
                        {/* <i class="far fa-check-square" /> */}
                        <Empty image={Empty.PRESENTED_IMAGE_DEFAULT} />
                      </div>
                      <div className="text">
                        No service selected yet, click below to select a service
                      </div>
                      {/* <button onClick={this.onOpenCreateModal}>
                      Select service
                    </button> */}
                      <Button
                        buttonColor={color.brandColor}
                        buttonHover={color.brandColor}
                        textColor={color.whiteColor}
                        className="button"
                        onClick={this.onOpenCreateModal}
                      >
                        Select service
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* {console.log(this.state.service !== "" && this.state.pet !== "")} */}
          {this.state.service !== "" && this.state.pet !== "" && (
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
