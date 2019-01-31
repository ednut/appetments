import React, { Component } from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import styled from "styled-components";
import { shadowStyle } from "../components/styles/constant";

const AlertPopup = styled.div`
  position: absolute;
  z-index: 100;
  top: 1rem;
  right: 1rem;
  border: 1px solid transparent;
  color: #155724;
  background-color: #d4edda;
  border-color: #c3e6cb;
  padding: 0.75rem 1.25rem;
  border-radius: 0.25rem;
  box-shadow: ${shadowStyle.shadow};
  display: flex;
  .cancel {
    padding-left: 2rem;
    font-weight: 600;
    font-size: 2rem;
    margin-top: -0.7rem;
    cursor: pointer;
  }
`;

class Alert extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: true
    };
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({
        active: false
      });
    }, 9000);
  }
  render() {
    if (this.state.active && this.props.alert) {
      return (
        <div>
          <AlertPopup>
            <span className="text">{this.props.alert}</span>
            <span
              className="cancel"
              onClick={() => this.setState({ active: false })}
            >
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
  alert: state.alert.message
});

export default connect(mapStateToProps)(Alert);
