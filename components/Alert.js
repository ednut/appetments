import React, { Component } from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { clear } from "../modules/alert";
import { message } from "antd";

class Alert extends Component {
  render() {
    if (this.props.error !== undefined) {
      if (this.props.error.errType === "success") {
        return <span>{message.success(this.props.error.message, 5)}</span>;
      } else if (this.props.error.errType === "error") {
        return <span>{message.error(this.props.error.message, 5)}</span>;
      } else {
        return null;
      }
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
