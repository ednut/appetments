import styled from "styled-components";
import { color, height } from "./constant";

const FormInput = styled.div`
  .form-wrap {
    position: relative;
    width: 100%;
    margin-bottom: ${height.gutterHeight};

    &.inline {
      display: inline-block;
      margin-right: 3rem;
      width: auto;
      vertical-align: top;
    }
    .error {
      color: red;
      font-size: 1.3rem;
      padding-left: 1rem;
      bottom: -2.2rem;
    }
    &.with-gutter {
      .form-field {
        margin-bottom: ${height.gutterHeight};
      }
    }
    label {
      font-weight: 400;
      display: block;
      padding-bottom: 0.1rem;
      margin-bottom: 0.5rem;
    }
    input {
      height: ${height.formHeight};
      border: 0.1rem solid ${color.borderColor};
      width: 100%;
      padding: 0 1rem;
      border-radius: 0.3rem;
      outline: none;
    }
    span.error {
      color: red;
      font-size: 1.4rem;
      display: inline-block;
    }
    select {
      height: ${height.formHeight};
      border: 0.1rem solid ${color.borderColor};
      width: 100%;
      padding: 0 1rem;
      border-radius: 0.3rem;
      outline: none;
      background-color: ${color.whiteColor};
    }
    textarea {
      height: ${height.formHeight} * 3;
      min-height: ${height.formHeight};
      max-height: ${height.formHeight} * 5;
      border: 0.1rem solid ${color.borderColor};
      width: 100%;
      min-width: 100%;
      padding: 1rem;
      border-radius: 0.3rem;
      outline: none;
    }
    a.forgot-passoword {
      display: inline-block;
      position: absolute;
      color: ${color.brandColor};
      font-weight: 600;
      font-weight: 600;
      right: 0;
      top: 0;
    }
    &.with-icon {
      input {
        padding: 0 1rem 0 5rem;
      }
      .form-icon {
        display: inline-block;
        position: absolute;
        left: 1.3rem;
        bottom: 0.1rem;
        color: ${color.borderColor};
      }
    }
    &.input-button {
      .form-field {
        display: inline-block;
        label {
          cursor: pointer;
          display: inline-block;
          width: 20rem;
          height: 10rem;
          line-height: 10rem;
          border: 0.2rem solid lighten(${color.blackColor}, 50%);
          margin-right: 1em;
          position: relative;
          background: ${color.whiteColor};
          color: ${color.blackColor};
          border-radius: 0.7rem;
          font-size: 1.6rem;
          background-color: ${color.whiteColor};
          text-align: center;
          &:hover {
            border: 0.2rem solid ${color.brandColor};
            background-color: ${color.brandColor};
            color: ${color.whiteColor};
          }
        }
        input {
          width: 100%;
          background-color: ${color.whiteColor};
          padding: 2rem;
          border-radius: 0.3rem;
          border: 0.1rem solid #dedbdd;
          outline: 0;
          color: ${color.blackColor};
          transition: border-color 0.2s ease-in-out;
          font-size: 1.7rem;
        }
        input[type="radio"] {
          display: none;
        }
        input[type="radio"]:checked + label {
          border: 0.2rem solid ${color.brandColor};
          background-color: ${color.brandColor};
          color: ${color.whiteColor};
        }
      }
    }
    &.input {
      input[type="radio"],
      input[type="checkbox"] {
        display: none;
      }
      label {
        position: relative;
        display: inline-block;
        font-weight: 500;
        cursor: pointer;
        span.icon {
          display: none;
          i {
            position: absolute;
            left: 0.54rem;
            top: 0.6rem;
            color: ${color.brandColor};
          }
        }
        span.text {
          display: inline-block;
          padding-left: 3.5rem;
          vertical-align: text-top;
        }
        &::before {
          content: "";
          width: 2.5rem;
          height: 2.5rem;
          left: 0;
          position: absolute;
          cursor: pointer;
        }
      }
      &.radio {
        input[type="radio"]:checked + label {
          font-weight: 600;
          span.icon {
            display: inline-block;
          }
          span.text {
            display: inline-block;
            padding-left: 3.2rem;
            vertical-align: text-top;
          }
        }
        label {
          &::before {
            content: "";
            border: o.2rem solid lighten(${color.blackColor}, 40%);
            border-radius: 50%;
          }
        }
      }
      &.checkbox {
        input[type="checkbox"]:checked + label {
          font-weight: 600;
          span.icon {
            display: inline-block;
          }
          span.text {
            display: inline-block;
            padding-left: 3.2rem;
            vertical-align: text-top;
          }
        }
        label {
          &::before {
            content: "";
            border: 0.2rem solid lighten(${color.blackColor}, 40%);
            border-radius: 0.4rem;
          }
        }
      }
      &.bordered {
        border: 0.2rem solid lighten(${color.blackColor}, 40%);
        padding: 0 ${height.gutterHeight} - 0.7;
        width: 30rem;
        border-radius: 0.5rem;
        height: 6rem;
        line-height: 5.5rem;
        label {
          width: 100%;
          &::before {
            top: 1.5rem;
          }
          span.icon {
            i {
              top: 2.05rem;
              left: 0.55rem;
            }
          }
          span.text {
            float: right;
            width: 95%;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            margin-top: 0.1rem;
          }
        }
        &.with-edit {
          label {
            width: 90%;
          }
          span.edit {
            width: 10%;
            display: inline-block;
            i {
              display: inline-block;
              margin-top: 1.5rem;
              color: ${color.brandColor};
            }
          }
        }
      }
    }
    .button,
    a.button {
      text-transform: uppercase;
      text-decoration: none;
      padding: 0 4rem;
      display: inline-block;
      border-radius: 0.3rem;
      transition: all 0.2s;
      position: relative;
      animation: moveInBottom 1s linear;
      font-size: 1.4rem;
      font-weight: 600;
      border: none;
      outline: none;
      height: ${height.bottonHeight};
      line-height: ${height.bottonHeight};
      background-color: #33d0a2;
      color: ${color.whiteColor};
      position: relative;
      &:hover {
        transform: translateY(-0.3rem);
        box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.2);
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
    }
  }
`;

export default FormInput;
