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

class AddStaffToLocation extends Component {
  render() {
    const { staff, submitted, openStaffService } = this.props.modalState;
    const allStaffs = this.props.staff ? this.props.staff : [];
    let options = [];
    for (let i = 0; i < allStaffs.length; i++) {
      options.push({
        value: allStaffs[i].id,
        label: allStaffs[i].first_name + " " + allStaffs[i].last_name
      });
    }
    return (
      <Modal open={openStaffService} onClose={this.props.onCloseModal}>
        <ModalWrap>
          <div className="title">{this.props.title}</div>
          <FormInput>
            <form onSubmit={this.props.handleSubmit}>
              <div className="row">
                <div className="col-md-12">
                  <div className="form-wrap">
                    <label htmlFor="">Staff</label>
                    <select name="staff" onChange={this.props.handleChange}>
                      <option value="">---- Select Staff ----</option>
                      {this.props.staff
                        ? this.props.staff.map(x => (
                            <option key={x.id} value={`${x.id}`}>
                              {`${x.first_name} ${x.last_name}`}
                            </option>
                          ))
                        : null}
                    </select>
                    {/* <Select
                      onChange={this.props.handleChange}
                      options={options}
                      isMulti
                    /> */}
                    {submitted && !staff && (
                      <div className="error">Staff is required</div>
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
                  {this.props.loading ? "Loading...." : "Save Staff"}
                </Button>
              </footer>
            </form>
          </FormInput>
        </ModalWrap>
      </Modal>
    );
  }
}

export default AddStaffToLocation;
