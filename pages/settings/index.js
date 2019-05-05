import React, { Component } from "react";
import FormInput from "../../components/styles/FormInput";
import styled from "styled-components";
import { color, shadowStyle } from "../../components/styles/constant";
import AdminContainer from "../../components/AdminContainer";
import Button from "../../components/styles/Button";
import FormWrap from "../../components/styles/FormWrap";
import { Row, Col, Card } from "antd";

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
          <Row>
            <Col span={18} offset={3}>
              <Row gutter={16} className="marginBottom-2">
                <Col span={10}>
                  <div className="title">Personal Details</div>
                  <div className="caption">
                    Set your name and contact information, the email address
                    entered here is used for your login access
                  </div>
                </Col>
                <Col span={12} offset={2}>
                  <Card>
                    <FormInput>
                      <form>
                        <div className="row">
                          <Col span={24}>
                            <FormWrap>
                              <label htmlFor="">First Name</label>
                              <input type="text" placeholder="First Name" />
                            </FormWrap>
                          </Col>
                          <Col span={24}>
                            <FormWrap>
                              <label htmlFor="">Last Name</label>
                              <input type="text" placeholder="Last Name" />
                            </FormWrap>
                          </Col>
                          <Col span={24}>
                            <FormWrap>
                              <label htmlFor="">Mobile Number</label>
                              <input type="text" placeholder="Mobile Number" />
                            </FormWrap>
                          </Col>
                          <Col span={24}>
                            <FormWrap>
                              <label htmlFor="">Email</label>
                              <input type="email" placeholder="Email" />
                            </FormWrap>
                          </Col>
                        </div>
                      </form>
                    </FormInput>
                  </Card>
                </Col>
              </Row>

              <Row className="marginBottom-2">
                <Col span={10}>
                  <div className="title">Change Password</div>
                  <div className="caption">
                    To make an update, enter your exisiting password followed by
                    a new one. If you don't know your existing password, you can
                    logout and use the Reset Password link on the Sign In page.
                  </div>
                </Col>
                <Col span={12} offset={2}>
                  <Card>
                    <FormInput>
                      <form>
                        <Row>
                          <Col span={24}>
                            <FormWrap>
                              <label htmlFor="">New Password</label>
                              <input type="text" placeholder="New Password" />
                            </FormWrap>
                          </Col>

                          <Col span={24}>
                            <FormWrap>
                              <label htmlFor="">Verify Password</label>
                              <input
                                type="text"
                                placeholder="Verify Password"
                              />
                            </FormWrap>
                          </Col>
                        </Row>
                      </form>
                    </FormInput>
                  </Card>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <br />
                  <Button
                    buttonColor={color.brandColor}
                    textColor={color.whiteColor}
                    style={{ float: "right" }}
                  >
                    {" "}
                    Save Changes
                  </Button>
                  <br />
                  <br />
                  <br />
                  <br />
                </Col>
              </Row>
            </Col>
          </Row>
        </SettingWrap>
      </AdminContainer>
    );
  }
}

export default Settings;
