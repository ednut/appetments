import React, { Component } from "react";
import FormInput from "../../components/styles/FormInput";
import styled from "styled-components";
import { color, shadowStyle } from "../../components/styles/constant";
import AdminContainer from "../../components/AdminContainer";
import Button from "../../components/styles/Button";

const SettingWrap = styled.div`
  .title {
    font-weight: 600;
    font-size: 1.7rem;
    margin-bottom: 1rem;
  }
  .caption {
    font-size: 1.4rem;
  }
  .wrapper {
    padding: 2rem 4rem;
    background-color: ${color.whiteColor};
    box-shadow: ${shadowStyle.shadow};
    border-radius: 0.5rem;
  }
  .marginBottom-2 {
    margin-bottom: 4rem;
  }
`;

class Settings extends Component {
  render() {
    return (
      <AdminContainer>
        <SettingWrap className="container">
          <div className="row marginBottom-2">
            <div className="col-md-5">
              <div className="title">Personal Details</div>
              <div className="caption">
                Set your name and contact information, the email address entered
                here is used for your login access
              </div>
            </div>
            <div className="col-md-6 offset-md-1">
              <div className="wrapper">
                <FormInput>
                  <form>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-wrap">
                          <label htmlFor="">First Name</label>
                          <input type="text" />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-wrap">
                          <label htmlFor="">Last Name</label>
                          <input type="text" />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-wrap">
                          <label htmlFor="">Mobile Number</label>
                          <input type="text" />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-wrap">
                          <label htmlFor="">Email</label>
                          <input type="email" />
                        </div>
                      </div>
                    </div>
                  </form>
                </FormInput>
              </div>
            </div>
          </div>

          <div className="row marginBottom-2">
            <div className="col-md-5">
              <div className="title">Change Password</div>
              <div className="caption">
                To make an update, enter your exisiting password followed by a
                new one. If you don't know your existing password, you can
                logout and use the Reset Password link on the Sign In page.
              </div>
            </div>
            <div className="col-md-6 offset-md-1">
              <div className="wrapper">
                <FormInput>
                  <form>
                    <div className="row">
                      <div className="col-md-12">
                        <div className="form-wrap">
                          <label htmlFor="">Current Password</label>
                          <input
                            type="Password"
                            placeholder="Current Password"
                          />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-wrap">
                          <label htmlFor="">New Password</label>
                          <input type="text" placeholder="New Password" />
                        </div>
                      </div>

                      <div className="col-md-12">
                        <div className="form-wrap">
                          <label htmlFor="">Verify Password</label>
                          <input type="text" placeholder="Verify Password" />
                        </div>
                      </div>
                    </div>
                  </form>
                </FormInput>
              </div>
            </div>
          </div>
          <div>
            <Button
              className="float-right"
              buttonColor={color.brandColor}
              textColor={color.whiteColor}
            >
              {" "}
              Save
            </Button>
          </div>
        </SettingWrap>
      </AdminContainer>
    );
  }
}

export default Settings;
