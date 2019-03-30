
import { color } from "./constant";
import styled, { css } from "styled-components";





export const MainSection = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  background-repeat: no-repeat;
  background-color: ${props => (props.backgroundColor ? props.backgroundColor : "transparent")};
  background-position: center;
  background-image: ${props => (props.src ? `url(${props.src})` : "none")};
  background-size: cover;
  position: relative;
  border-bottom: 1px solid #f0f0f0;
  ${'' /* padding: 0 3rem; */}
`;

export const LogoHolder = styled.div`
  width: 70px;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  position: absolute;
  left: 10rem;
  right: 0;
  top: 0;
  bottom: 0;
`;

export const IconHolder = styled.div`
  display: flex;
  flex-direction: column;
  width: ${props => (props.width ? props.width : "50px")};
  height: ${props => (props.height ? props.height : "50px")};
  background-size: cover;
  flex-grow: 0;
  flex-shrink: 0;
  margin: ${props => (props.margin ? props.margin : "0px 0px")};
  border-radius: ${props => (props.borderRadius ? props.borderRadius : "0px")};
  background-repeat: no-repeat;
  background-color: ${props => (props.backgroundColor ? props.backgroundColor : "transparent")};
  background-position: ${props => (props.position ? props.position : "center")};
  background-image: ${props => (props.src ? `url(${props.src})` : "none")};
  background-size: ${props => (props.backgroundSize ? props.backgroundSize : "contain")};
`;
export const Section = styled.div`
  display: flex;
  flex: ${(props) => (props.flex ? props.flex : 1)};
  justify-content: ${(props) => (props.justifyContent ? props.justifyContent : "flex-start")};
  align-items: ${(props) => (props.alignItems ? props.alignItems : "flex-start")};
  flex-direction: ${(props) => (props.flexDirection ? props.flexDirection : "column")};
  background: ${(props) => (props.backgroundColor ? props.backgroundColor : "transparent")};
  text-align: ${(props) => (props.textAlign ? props.textAlign : "inherit")};
  font-size: ${(props) => (props.fontSize ? props.fontSize : "inherit")};
  width: 100%;
  height: ${(props) => (props.height ? props.height : "auto")};
  min-height: ${(props) => (props.minHeight ? props.minHeight : "100px")};
  padding: ${(props) => (props.padding ? props.padding : "0")};
  margin: ${(props) => (props.margin ? props.margin : "0")};
  ${(props) =>
      props.absolutePosition &&
      css`
      position: absolute;
      bottom: 0;
      `};
  ${(props) =>
      props.withImage &&
      css`
      background-repeat: no-repeat;
      background-position: center;
      background-image: ${props => (props.src ? `url(${props.src})` : "none")};
      background-size: ${props => (props.backgroundSize ? props.backgroundSize  : "contain")};
      `};
`;

export const Text = styled.div`
  text-align: ${(props) => (props.textAlign ? props.textAlign : "inherit")};
  font-size: ${(props) => (props.fontSize ? props.fontSize : "1rem")};
  font-weight: ${(props) => (props.fontWeight ? props.fontWeight : "400")};
  color: ${(props) => (props.color ? props.color : "inherit")};
  padding: ${(props) => (props.padding ? props.padding : "0")};

`
// export
