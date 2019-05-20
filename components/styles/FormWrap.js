import styled, { css } from "styled-components";
import { color, height } from "./constant";

const FormWrap = styled.div`
  background-color: #fff;
  position: relative;
  border: 1px solid rgba(0, 0, 0, 0.07);
  border-radius: 2px;
  width: 100%;
  transition: background-color 0.2s ease;
  padding: 7px 12px 4px;
  margin-bottom: 30px;
  .error {
    position: absolute;
    font-size: 13px;
    bottom: -25px;
    left: 10px;
    color: red;
  }
  &[focus-within] {
    border-color: rgba(0, 0, 0, 0.1) !important;
    background-color: rgba(231, 231, 231, 0.4);
    label {
      opacity: 0.4;
    }
  }
  &:focus-within {
    border-color: rgba(0, 0, 0, 0.1) !important;
    background-color: rgba(231, 231, 231, 0.4);
    label {
      opacity: 0.4;
    }
  }

  label {
    font-size: 12px;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    font-weight: 500;
    margin: 0;
    display: block;
    opacity: 1;
    transition: opacity 0.2s ease;
  }
  input,
  input[type="text"],
  input[type="email"],
  select,
  textarea {
    border: none;
    min-height: 25px;
    padding: 0;
    margin-top: -4px;
    background: 0 0;
    width: 100%;
    outline: none;
    position: relative;
    -webkit-appearance: none;
    color: #2c2c2c;
    outline: 0;
    padding: 8px 0;
    line-height: normal;
    font-size: 14px;
    font-weight: 400;
    vertical-align: middle;
    min-height: 35px;
    transition: all 0.12s ease;
    box-shadow: none;
    border-radius: 2px;
    -webkit-border-radius: 2px;
    -moz-border-radius: 2px;
    &.required {
      :after {
        content: "*";
        position: absolute;
        color: red;
        right: 10px;
        top: 5px;
        font-size: 2rem;
      }
    }
  }
  .ant-select-selection {
    border: none;
    outline: none;
    box-shadow: none;
    background: transparent;
    margin-left: 0;
  }
  .ant-select-selection__rendered {
    margin-left: 0;
  }
  .ant-select-selection__placeholder {
    color: rgba(44, 44, 44, 0.6784313725490196);
  }
`;

export default FormWrap;
