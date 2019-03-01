import React, { Component } from "react";
import Modal from "react-responsive-modal";
import Select from "react-select";
import FormInput from "../../components/styles/FormInput";
import Button from "../../components/styles/Button";
import { color } from "../../components/styles/constant";
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

class AddPetToClient extends Component {
  render() {
    const { name, pet_type, submitted, openPetService } = this.props.modalState;
    return (
      <Modal open={openPetService} onClose={this.props.onCloseModal}>
        <ModalWrap>
          <div className="title">{this.props.title}</div>
          <FormInput>
            <form onSubmit={this.props.handleSubmit}>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-wrap">
                    <label htmlFor="">Name</label>
                    <input
                      type="text"
                      name="name"
                      onChange={this.props.handleChange}
                    />
                    {submitted && !name && (
                      <div className="error">Name is required</div>
                    )}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-wrap">
                    <label htmlFor="">Pets</label>
                    <select name="pet_type" onChange={this.props.handleChange}>
                      <option value="">---- Select pets ----</option>
                      <option value="dog">Dog</option>
                      <option value="cat">Cat</option>
                      <option value="bird">Bird</option>
                      <option value="guinea pig">Guinea pig</option>
                      <option value="reptile">Reptile</option>
                      <option value="ferret">Ferret</option>
                    </select>
                    {submitted && !pet_type && (
                      <div className="error">Pet is required</div>
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
                  {this.props.loading ? "Loading...." : "Save Pet"}
                </Button>
              </footer>
            </form>
          </FormInput>
        </ModalWrap>
      </Modal>
    );
  }
}

export default AddPetToClient;
