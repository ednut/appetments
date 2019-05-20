import React, { Component } from "react";
import OnlineBookingWrapper from "../components/OnlineBookingWrapper";
import { Row, Col, Form, Input, Icon } from "antd";
import Link from "next/link";
import styled from "styled-components";
import SpinerWrap from "../components/Spinner";
import Button from "../components/styles/Button";
import { color } from "../components/styles/constant";

const Completed = styled.div`
  .checkmark__circle {
    stroke-dasharray: 166;
    stroke-dashoffset: 166;
    stroke-width: 2;
    stroke-miterlimit: 10;
    stroke: ${color.brandColor};
    fill: none;
    animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
  }

  .checkmark {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    display: block;
    stroke-width: 2;
    stroke: #fff;
    stroke-miterlimit: 10;
    margin: 10% auto 1% auto;
    box-shadow: inset 0px 0px 0px ${color.brandColor};
    animation: fill 0.4s ease-in-out 0.4s forwards,
      scale 0.3s ease-in-out 0.9s both;
  }

  .checkmark__check {
    transform-origin: 50% 50%;
    stroke-dasharray: 48;
    stroke-dashoffset: 48;
    animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards;
  }

  @keyframes stroke {
    100% {
      stroke-dashoffset: 0;
    }
  }
  @keyframes scale {
    0%,
    100% {
      transform: none;
    }
    50% {
      transform: scale3d(1.1, 1.1, 1);
    }
  }
  @keyframes fill {
    100% {
      box-shadow: inset 0px 0px 0px 30px ${color.brandColor};
    }
  }
`;

class Success extends Component {
  render() {
    return (
      <OnlineBookingWrapper>
        <div className="header"> Success Booking</div>
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <Completed>
                <svg
                  className="checkmark"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 52 52"
                >
                  <circle
                    className="checkmark__circle"
                    cx="26"
                    cy="26"
                    r="25"
                    fill="none"
                  />
                  <path
                    className="checkmark__check"
                    fill="none"
                    d="M14.1 27.2l7.1 7.2 16.7-16.8"
                  />
                </svg>
              </Completed>
              <div
                className="page-title"
                style={{
                  marginTop: "0",
                  marginBottom: "10px",
                  fontWeight: "600"
                }}
              >
                Your Booking Was Successfull
              </div>
              <div className="col-md-8 offset-md-2">
                <div
                  className="caption"
                  style={{
                    marginBottom: "10px",
                    fontSize: "16px",
                    color: "#666"
                  }}
                >
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem
                  omnis qui exercitationem, iusto libero nihil molestias opti.
                </div>
              </div>
              <div>
                <Link href="/online-booking">
                  <a
                    style={{
                      display: "inline-block",
                      //   border: "1px solid",
                      padding: "10px 30px",
                      fontWeight: "600",
                      borderRadius: "3px",
                      marginTop: "5px",
                      color: "#fff",
                      background: `${color.brandColor}`
                    }}
                  >
                    Make another appointment
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </OnlineBookingWrapper>
    );
  }
}

export default Success;
