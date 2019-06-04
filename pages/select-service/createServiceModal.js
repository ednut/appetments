import React, { Component } from "react";
import Modal from "react-responsive-modal";
import FormInput from "../../components/styles/FormInput";
import Button from "../../components/styles/Button";
import { color } from "../../components/styles/constant";
import styled from "styled-components";
import FormWrap from "../../components/styles/FormWrap";
import { Row, Col, Form, Input, Select, Icon } from "antd";

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
    button {
      float: right;
    }
  }
`;

class CreateServiceModal extends Component {
  render() {
    const { openCreateService, service, pet } = this.props.modalState;
    const {
      removeSelectedService,
      onChangeService,
      services,
      addingPetToClient,
      onChangePet,
      removeSelectedPet,
      selectedPet,
      selectedService,
      pets,
      moveToNext
    } = this.props;
    const Option = Select.Option;

    function onSearch(val) {}
    return (
      <Modal open={openCreateService} onClose={this.props.onCloseModal}>
        <ModalWrap>
          <div className="title">{this.props.title}</div>
          <FormInput>
            <Form>
              <FormWrap>
                <label htmlFor="">Select a service</label>
                <Select
                  showSearch
                  mode="multiple"
                  placeholder="Select a service"
                  optionFilterProp="children"
                  onChange={onChangeService}
                  onDeselect={x => removeSelectedService(x)}
                  onSearch={onSearch}
                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {services.map(x => (
                    <Option
                      key={x.id}
                      onClick={() => selectedService(x)}
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
                  onClick={addingPetToClient}
                >
                  Add a new pet
                </strong>
              </span>
              <FormWrap>
                <label htmlFor="">Select a pet</label>
                <Select
                  showSearch
                  // mode="multiple"
                  placeholder="Select a pet"
                  optionFilterProp="children"
                  onChange={onChangePet}
                  onDeselect={x => removeSelectedPet(x)}
                  onSearch={onSearch}
                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {pets.map(x => (
                    <Option
                      onClick={() => selectedPet(x)}
                      key={x.id}
                      value={x.id}
                    >
                      {x.name}
                    </Option>
                  ))}
                </Select>
              </FormWrap>
              {service !== "" && pet !== "" ? (
                <Button
                  buttonColor={color.brandColor}
                  buttonHover={color.brandColor}
                  textColor={color.whiteColor}
                  onClick={moveToNext}
                  className="button float-right"
                >
                  Add Service
                </Button>
              ) : (
                <Button
                  buttonColor={color.brandColor}
                  buttonHover={color.brandColor}
                  textColor={color.whiteColor}
                  className="button float-right"
                  style={{ opacity: "0.5", cursor: "not-allowed" }}
                >
                  Add Service
                </Button>
              )}
            </Form>
          </FormInput>
        </ModalWrap>
      </Modal>
    );
  }
}

export default CreateServiceModal;
