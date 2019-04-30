import React, { Component } from "react";
import styled from "styled-components";
import { color, height } from "../components/styles/constant";

const NoDataWrap = styled.div`
  position: relative;
  text-align: center;
  color: ${color.textColor};
  margin-top: 10rem;
  .icon {
    i {
      font-size: 8rem;
      color: ${color.textLight};
      margin-bottom: 2rem;
    }
  }
  .title {
    font-size: 3rem;
    font-weight: 200;
  }
  .caption {
    margin-top: ${height.gutterHeight};
  }
`;

class NoData extends Component {
  render() {
    return (
      <div>
        {/* <NoDataWrap>
        <div className="row">
          <div className="col-md-5 m-auto">
            <div className="icon">
              <i className="far fa-sad-tear" />
            </div>
            <div className="title">{this.props.message}</div>
          </div>
        </div>
      </NoDataWrap> */}
      </div>
    );
  }
}

export default NoData;
