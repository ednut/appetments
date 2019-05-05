import React, { Component, Fragment } from "react";
import ReactTextRotator from "react-text-rotator";
import Link from "next/link";
import { color } from "../components/styles/constant";
import Button from "../components/styles/Button";
import Cookies from "js-cookie";
import styled, { css } from "styled-components";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {
  MainSection,
  LogoHolder,
  IconHolder,
  Section,
  Text
} from "../components/styles/PageStyles";

const textRotated = [
  {
    text: "Online Appointment Requests.",
    // className: 'classA',
    animation: "fade"
  },
  {
    text: "Appointment Reminders.",
    // className: 'classB',
    animation: "fade"
  },
  {
    text: "Google Calendar Integration.",
    // className: 'classC',
    animation: "fade"
  },
  {
    text: "Smart Deposits.",
    // className: 'classD',
    animation: "fade"
  },
  {
    text: "Client & Pet records.",
    // className: 'classE',
    animation: "fade"
  }
];

const featuresRotated = [
  {
    text: "Business Guides",
    // className: 'classA',
    animation: "fade"
  },
  {
    text: "Multiple Employees",
    // className: 'classB',
    animation: "fade"
  },
  {
    text: "Sales/POS Module",
    // className: 'classC',
    animation: "fade"
  },
  {
    text: "Products/Inventory Management",
    // className: 'classD',
    animation: "fade"
  }
];

class LandingPage extends React.Component {
  render() {
    return (
      <React.Fragment>
        <MainSection src={"/static/images/appetments_banner.jpg"}>
          <LogoHolder>
            <IconHolder
              src={"/static/images/appetmentsicon.png"}
              width={"30px"}
              heigght={"30px"}
            />
          </LogoHolder>
          <Section justifyContent={"center"} alignItems={"center"}>
            <Text
              fontSize={"1.5rem"}
              // padding={" 1rem 0"}
              style={{ letterSpacing: "1px" }}
              color={color.lightShade}
            >
              DISCOVER APPETMENTS
            </Text>
            <Text
              fontSize={"3.5rem"}
              fontWeight={"200"}
              padding={"0 0 4rem 0"}
              textAlign={"center"}
              style={{ lineHeight: "4rem" }}
              color={color.lightShade}
            >
              A Pet sheduling app you'll love with&nbsp;
              <ReactTextRotator
                content={textRotated}
                // time={5000}
                // startDelay={250}
                // transitionTime={5000}
              />
            </Text>
            <div className="text-center">
              {Cookies.get("token") === undefined ? (
                <Link href="/signup">
                  <Button
                    radius={"30rem"}
                    fontWeight={"300"}
                    fontSize={"1.5rem"}
                    textTransform={"capitalize"}
                    height={"4.5rem"}
                    padding={"0rem 3.5rem"}
                    lineHeight={"100%"}
                    className="button"
                  >
                    Get a 14 Day Free Trial{" "}
                  </Button>
                </Link>
              ) : (
                <Link href="/dashboard">
                  <Button
                    radius={"30rem"}
                    fontWeight={"300"}
                    fontSize={"1.5rem"}
                    textTransform={"capitalize"}
                    height={"4.5rem"}
                    padding={"0rem 3.5rem"}
                    lineHeight={"100%"}
                    className="button"
                  >
                    View Your Dashboard
                  </Button>
                </Link>
              )}
            </div>
          </Section>
          <Section
            absolutePosition
            withImage
            src={"/static/images/brush_stroke.png"}
            backgroundSize={"cover"}
            justifyContent={"center"}
            alignItems={"center"}
            padding={"11.5rem 0 0 0"}
            height={"200px"}
          >
            <Header />
          </Section>
        </MainSection>

        <Section
          justifyContent={"space-between"}
          padding={"5rem 10rem"}
          height={"550px"}
          flexDirection={"row"}
        >
          <Section flex={"0.7"}>
            <Text
              fontSize={"1.5rem"}
              // padding={" 1rem 0"}
              style={{ letterSpacing: "1px" }}
              color={color.textLight}
            >
              APPETMENTS
            </Text>
            <Text
              fontSize={"3.4rem"}
              padding={" 1.5rem 0"}
              fontWeight={"300"}
              style={{ letterSpacing: "1px", lineHeight: "3.6rem" }}
              color={color.textColor}
            >
              We're the new kid on the block.
            </Text>
            <Text
              fontSize={"1.8rem"}
              padding={" 1.5rem 0"}
              fontWeight={"300"}
              style={{ letterSpacing: "1px" }}
              style={{ lineHeight: "2.5rem" }}
              color={color.textColor}
            >
              Appetments is here for you and your business. We've launched with
              features you've been waiting too long to get and we don't look
              like we were made before dinosaurs.
            </Text>
            <Text
              fontSize={"1rem"}
              padding={" 1.5rem 0"}
              fontWeight={"300"}
              style={{ letterSpacing: "1px" }}
              style={{ lineHeight: "100%" }}
              color={color.textColor}
            >
              Enough about us, let's get down to business..
            </Text>
            <div className="text-center">
              {Cookies.get("token") === undefined ? (
                <Link href="/signup">
                  <Button
                    radius={"30rem"}
                    buttonColor={"#10cfbd"}
                    textColor={color.whiteColor}
                    fontWeight={"400"}
                    fontSize={"1.5rem"}
                    textTransform={"capitalize"}
                    height={"4.5rem"}
                    padding={"0rem 3.5rem"}
                    lineHeight={"100%"}
                    className="button"
                  >
                    Get a 14 Day Free Trial{" "}
                  </Button>
                </Link>
              ) : (
                <Link href="/dashboard">
                  <Button
                    radius={"30rem"}
                    buttonColor={"#10cfbd"}
                    textColor={color.whiteColor}
                    fontWeight={"400"}
                    fontSize={"1.5rem"}
                    textTransform={"capitalize"}
                    height={"4.5rem"}
                    padding={"0rem 3.5rem"}
                    lineHeight={"100%"}
                    className="button"
                  >
                    View Your Dashboard
                  </Button>
                </Link>
              )}
            </div>
          </Section>
          <Section padding={"3rem 0 0 0"} alignItems={"center"}>
            <IconHolder
              width={"350px"}
              height={"470px"}
              position={"top center"}
              backgroundSize={"cover"}
              src={"/static/images/iphone.png"}
            />
          </Section>
        </Section>

        <Section
          backgroundColor={"#fafaf4"}
          alignItems={"center"}
          padding={"5rem 10rem"}
        >
          <Text
            fontSize={"1.6rem"}
            // padding={" 1rem 0"}
            style={{ letterSpacing: "1px" }}
            textAlign={"center"}
            fontWeight={"300"}
            color={color.textLight}
          >
            FEATURES
          </Text>
          <Text
            fontSize={"2.8rem"}
            padding={" 1.5rem 0"}
            fontWeight={"300"}
            style={{ letterSpacing: "0px", lineHeight: "3.6rem" }}
            color={color.textColor}
          >
            This is just the beginning..
          </Text>
          <Text
            fontSize={"1.8rem"}
            // padding={" 1rem 0"}
            // style={{letterSpacing: '1px'}}
            textAlign={"center"}
            fontWeight={"300"}
            color={color.textLight}
          >
            We've launched with features others have ignored, and we're just
            getting started.
          </Text>
          <Section
            flexDirection={"row"}
            justifyContent={"space-between"}
            padding={"5rem 0rem"}
          >
            <Section
              justifyContent={"center"}
              alignItems={"center"}
              margin={"0 4rem 0 0"}
            >
              <IconHolder
                width={"60px"}
                height={"60px"}
                src={"/static/images/Parachute.svg"}
                margin={"auto"}
              />
              <Text
                fontSize={"2rem"}
                padding={" 1rem 0"}
                fontWeight={"300"}
                textAlign={"center"}
                style={{ letterSpacing: "1px", lineHeight: "3rem" }}
                color={color.textColor}
              >
                APPOINTMENT SCHEDULING
              </Text>
              <Text
                fontSize={"1.7rem"}
                // padding={" 1rem 0"}
                style={{ lineHeight: "2rem" }}
                textAlign={"center"}
                fontWeight={"300"}
                color={color.textLight}
              >
                A clean, easy to use calendar for scheduling all your clients &
                their owners.
              </Text>
            </Section>
            <Section
              justifyContent={"center"}
              alignItems={"center"}
              margin={"0 4rem 0 0"}
            >
              <IconHolder
                width={"60px"}
                height={"60px"}
                src={"/static/images/Prizemedalion.svg"}
                margin={"auto"}
              />
              <Text
                fontSize={"2rem"}
                padding={" 1rem 0"}
                fontWeight={"300"}
                textAlign={"center"}
                style={{ letterSpacing: "1px", lineHeight: "3rem" }}
                color={color.textColor}
              >
                OWNER/PET RECORDS
              </Text>
              <Text
                fontSize={"1.7rem"}
                // padding={" 1rem 0"}
                style={{ lineHeight: "2rem" }}
                textAlign={"center"}
                fontWeight={"300"}
                color={color.textLight}
              >
                Your digital Client Record Cards. Keep track of Owners & their
                pets, no fuss.
              </Text>
            </Section>
            <Section justifyContent={"center"} alignItems={"center"}>
              <IconHolder
                width={"60px"}
                height={"60px"}
                src={"/static/images/Umbrella.svg"}
                margin={"auto"}
              />
              <Text
                fontSize={"2rem"}
                padding={" 1rem 0"}
                fontWeight={"300"}
                textAlign={"center"}
                style={{ letterSpacing: "1px", lineHeight: "3rem" }}
                color={color.textColor}
              >
                GOOGLE CALENDAR INTERGRATION
              </Text>
              <Text
                fontSize={"1.7rem"}
                // padding={" 1rem 0"}
                style={{ lineHeight: "2rem" }}
                textAlign={"center"}
                fontWeight={"300"}
                color={color.textLight}
              >
                View your Appointments in Google Calendar & your Google Events
                in our Calendar.
              </Text>
            </Section>
          </Section>
          <Section
            flexDirection={"row"}
            justifyContent={"space-between"}
            padding={"5rem 0rem"}
          >
            <Section
              justifyContent={"center"}
              alignItems={"center"}
              margin={"0 4rem 0 0"}
            >
              <IconHolder
                width={"60px"}
                height={"60px"}
                src={"/static/images/Parachute.svg"}
                margin={"auto"}
              />
              <Text
                fontSize={"2rem"}
                padding={" 1rem 0"}
                fontWeight={"300"}
                textAlign={"center"}
                style={{ letterSpacing: "1px", lineHeight: "3rem" }}
                color={color.textColor}
              >
                SMART DEPOSITS
              </Text>
              <Text
                fontSize={"1.7rem"}
                // padding={" 1rem 0"}
                style={{ lineHeight: "2rem" }}
                textAlign={"center"}
                fontWeight={"300"}
                color={color.textLight}
              >
                % of Appointment? Done! Dollar Amount? No problem. How about
                when they no show? Forfeit or Return.. you decide!
              </Text>
            </Section>
            <Section
              justifyContent={"center"}
              alignItems={"center"}
              margin={"0 4rem 0 0"}
            >
              <IconHolder
                width={"60px"}
                height={"60px"}
                src={"/static/images/Prizemedalion.svg"}
                margin={"auto"}
              />
              <Text
                fontSize={"2rem"}
                padding={" 1rem 0"}
                fontWeight={"300"}
                textAlign={"center"}
                style={{ letterSpacing: "1px", lineHeight: "3rem" }}
                color={color.textColor}
              >
                ONLINE BOOKING REQUESTS
              </Text>
              <Text
                fontSize={"1.7rem"}
                // padding={" 1rem 0"}
                style={{ lineHeight: "2rem" }}
                textAlign={"center"}
                fontWeight={"300"}
                color={color.textLight}
              >
                Don't settle for Generic. Booking require your approval? Sure.
                New Customer 100% deposit? We got you.
              </Text>
            </Section>
            <Section justifyContent={"center"} alignItems={"center"}>
              <IconHolder
                width={"60px"}
                height={"60px"}
                src={"/static/images/Umbrella.svg"}
                margin={"auto"}
              />
              <Text
                fontSize={"2rem"}
                padding={" 1rem 0"}
                fontWeight={"300"}
                textAlign={"center"}
                style={{ letterSpacing: "1px", lineHeight: "3rem" }}
                color={color.textColor}
              >
                SMS/EMAIL REMINDERS
              </Text>
              <Text
                fontSize={"1.7rem"}
                // padding={" 1rem 0"}
                style={{ lineHeight: "2rem" }}
                textAlign={"center"}
                fontWeight={"300"}
                color={color.textLight}
              >
                Reduce No-Shows and Increase Customer Satisfaction with SMS &
                Email Reminders. Easy.
              </Text>
            </Section>
          </Section>
        </Section>

        <Section
          withImage
          padding={"5rem 10rem 0rem 10rem"}
          src={"/static/images/appetments_banner.jpg"}
          backgroundSize={"cover"}
          alignItems={"center"}
        >
          <Text
            fontSize={"2.2rem"}
            fontWeight={"200"}
            padding={"0 0 4rem 0"}
            textAlign={"center"}
            style={{ lineHeight: "4rem", marginBottom: "5rem" }}
            color={color.lightShade}
          >
            Thats not all, we also have&nbsp;
            <ReactTextRotator
              content={featuresRotated}
              time={1500}
              startDelay={150}
              // transitionTime={5000}
            />
            &nbsp; and Legendary Customer Support
          </Text>
          <img src="/static/images/laptop_screen.png" />
        </Section>

        <Footer />
      </React.Fragment>
    );
  }
}

export default LandingPage;
