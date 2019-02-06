import React, { Component } from "react";
import AdminContainer from "../../components/AdminContainer";
import styled from "styled-components";
import { shadowStyle, color, height } from "../../components/styles/constant";

const NoData = styled.div`
  position: relative;
  text-align: center;
  color: ${color.textColor};
  margin-top: ${height.spaceHeight};
  .icon {
    i {
      font-size: 12rem;
      color: ${color.textLight};
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

class Messages extends Component {
  render() {
    return (
      <AdminContainer>
        <NoData>
          <div className="row">
            <div className="col-md-5 m-auto">
              <div className="icon">
                <i className="material-icons"> mail_outline </i>
              </div>
              <div className="title">No Recent Messages</div>
              <div className="caption">
                Appetments will send automated customer notifications,
                reminders, confirmations and much more. Make the most of this
                feature by saving customer contact details in Appetments and
                give it a try!
              </div>
            </div>
          </div>
        </NoData>
      </AdminContainer>
    );
  }
}

export default Messages;
