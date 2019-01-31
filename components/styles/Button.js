import styled, { css } from "styled-components";
import { color, height } from "./constant";

const button = styled.button`
  text-transform: uppercase;
  text-decoration: none;
  padding: 0 4rem;
  display: inline-block;
  border-radius: ${props => (props.radius ? props.radius : "0.3rem")};
  transition: all 0.2s;
  position: relative;
  animation: moveInBottom 1s linear;
  font-size: 1.4rem;
  font-weight: 600;
  border: none;
  outline: none;
  height: ${height.buttonHeight};
  line-height: ${height.buttonHeight};
  background-color: ${props =>
    props.buttonColor ? props.buttonColor : "#ffffff"};
  color: ${props => (props.textColor ? props.textColor : "#000000")};
  position: relative;
  cursor: pointer;
  &:hover {
    transform: translateY(-0.3rem);
    box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.2);
    ${props =>
      props.noHover &&
      css`
        transform: none;
        box-shadow: none;
      `};
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
