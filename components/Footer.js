import React, { Component } from "react";
import Link from "next/link";
import Nav from "./styles/Nav";
import { color } from "../components/styles/constant";
import Button from "../components/styles/Button";
import Cookies from "js-cookie";
import styled, { css } from "styled-components";
import {
  MainSection,
  LogoHolder,
  IconHolder,
  Section,
  Text
} from "../components/styles/PageStyles";

const FooterLinks = styled.a`
  display: flex;
  height: 100%;
  justify-content: center;
  white-space: nowrap;
  align-items: center;
  padding: 10px 20px;
  background-color: ${props =>
    props.backgroundColor ? props.backgroundColor : "transparent"};
  color: ${props => (props.color ? props.color : "#626262")};
  font-weight: 300;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  font-size: ${props => (props.fontSize ? props.fontSize : "0.8rem")};
  ${"" /* transition: color 0.25s ease-in-out; */}

  &:hover {
    color: black;
    cursor: pointer;
    text-decoration: underline;
  }
`;

const Footer = props => (
  <Section
    alignItems={"center"}
    backgroundColor={color.whiteColor}
    padding={"5rem 10rem"}
    style={{ color: "#626262" }}
  >
    <IconHolder
      margin={"auto"}
      src={"/static/images/appetments-textonly.png"}
      width={"130px"}
    />
    <Section
      flexDirection={"row"}
      justifyContent={"center"}
      alignItems={"center"}
      minHeight={"30px"}
    >
      <FooterLinks fontSize={"1rem"}>Privacy</FooterLinks>|
      <FooterLinks fontSize={"1rem"}>Terms of Service</FooterLinks>|
      <FooterLinks fontSize={"1rem"}>Support</FooterLinks>
    </Section>
    <Text
      fontSize={"1rem"}
      fontWeight={"300"}
      // padding={" 1rem 0"}
      style={{ letterSpacing: "1px" }}
      color={"#626262"}
    >
      Copyright © 2019 Appetments. All Rights Reserved.
    </Text>
  </Section>
);

export default Footer;
