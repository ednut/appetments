import styled, { css } from "styled-components";
import { color, height } from "./constant";

const button = styled.button`
  text-transform: ${props =>
    props.textTransform ? props.textTransform : "uppercase"};
  text-decoration: none;
  padding: ${props => (props.padding ? props.padding : "0.6rem 1.7rem")};
  display: inline-block;
  border-radius: ${props => (props.radius ? props.radius : "0.3rem")};
  transition: all 0.2s;
  position: relative;
  animation: moveInBottom 1s linear;
  font-size: ${props => (props.fontSize ? props.fontSize : "1.4rem")};
  font-weight: ${props => (props.fontWeight ? props.fontWeight : "600")};
  border: none;
  outline: none;
  height: ${props => (props.height ? props.height : "auto")};
  line-height: ${props => (props.lineHeight ? props.lineHeight : "30px")};
  background-color: ${props =>
    props.buttonColor ? props.buttonColor : "#ffffff"};
  color: ${props => (props.textColor ? props.textColor : "#000000")};
  position: relative;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  &:hover {
    transform: none;
    box-shadow: none;
    background-color: ${props =>
      props.buttonHover ? props.buttonHover : "none"};
    ${props =>
      props.hover &&
      css`
        transform: translateY(-0.3rem);
        box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.2);
      `};
  }
  &:focus {
    outline: none;
  }
  &:active {
    transform: translateY(-0.1rem);
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.2);
  }
  &.full {
    width: 100%;
  }
  &.with-right-icon {
    .btn-icon {
      display: inline-block;
      position: absolute;
      right: 0;
      i {
        font-size: 1.4rem;
      }
    }
  }
  ${props =>
    props.withBorder &&
    css`
      border: 1px solid ${color.textColor};
    `}
`;

export default button;
