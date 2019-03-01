import React, { Component } from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import styled from "styled-components";
import { shadowStyle } from "../components/styles/constant";
import { clear } from "../modules/alert";

const AlertPopup = styled.div`
  position: fixed;
  z-index: 100;
  top: 1rem;
  right: 1rem;
  border: 1px solid transparent;
  padding: 0.75rem 1.25rem;
  border-radius: 0.25rem;
  box-shadow: ${shadowStyle.shadow};
  display: flex;
  &.success {
    color: #155724;
    background-color: #d4edda;
    border-color: #c3e6cb;
  }
  &.error {
    color: #721c24;
    background-color: #f8d7da;
    border-color: #f5c6cb;
  }
  .cancel {
    padding-left: 2rem;
    font-weight: 600;
    font-size: 2rem;
    margin-top: -0.7rem;
    cursor: pointer;
  }
`;

class Alert extends Component {
  remove = () => {
    this.props.clear();
  };

  componentDidUpdate() {
    if (this.timeOut) {
      this.timeOut = 0;
    }
  }
  render() {
    {
      console.log;
    }
    if (this.props.error !== undefined) {
      return (
        <div>
          <AlertPopup
            className={this.props.error.errType ? this.props.error.errType : ""}
          >
            <span className="text">{this.props.error.message}</span>
            <span className="cancel" onClick={this.remove}>
              &times;
            </span>
          </AlertPopup>
        </div>
      );
    }
    return null;
  }
}

Alert.propTypes = {
  alert: PropTypes.string
};

const mapStateToProps = state => ({
  error: state.alert.message
});

export default connect(
  mapStateToProps,
  { clear }
)(Alert);
