import React, { Component } from "react";
import AdminContainer from "../../components/AdminContainer";
import styled from "styled-components";
import { shadowStyle, color, height } from "../../components/styles/constant";

const FilterSection = styled.div`
  width: 100%;
  position: relative;
  margin-bottom: ${height.gutterHeight};
  form {
    display: flex;
    select {
      border: 1px solid ${color.borderColor};
      width: 100%;
      margin-right: 5%;
      background-color: transparent;
      height: 4.5rem;
      border-radius: 0.3rem;
      padding: 0 1rem;
      outline: none;
    }
  }
`;

const ContentWrap = styled.div`
  table {
    background-color: ${color.whiteColor};
    box-shadow: 0 2px 5px 0 rgba(164, 173, 186, 0.25);
    border-bottom: none;
    border-radius: 0.2rem;
    tr {
      border-bottom: 1px solid #eef0f2;
    }
    th {
      padding: 1.7rem 3rem;
      color: ${color.textLight};
    }
    td {
      padding: 1.7rem 3rem;
      color: ${color.textColor};
    }
    tbody tr:hover {
      background-color: #fbfbfb;
      cursor: pointer;
    }
  }
`;

class Client extends Component {
  render() {
    return (
      <AdminContainer>
        <FilterSection>
          <div className="row">
            <div className=" offset-md-10 col-md-2">
              <form>
                <select name="" id="">
                  <option value="">Export</option>
                  <option value="">Excel</option>
                  <option value="">PDF</option>
                  <option value="">CSV</option>
                </select>
              </form>
            </div>
          </div>
        </FilterSection>
        <ContentWrap>
          <table className="table table-borderless">
            <thead>
              <tr>
                <th>Name</th>
                <th>Mobile number</th>
                <th>Email</th>
                <th>Gender</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Segun Afolahan</td>
                <td>0802000000</td>
                <td>segun.afo@gmail.com</td>
                <td>Male</td>
              </tr>
              <tr>
                <td>Oduntan Balogun</td>
                <td>0802000000</td>
                <td>segun.afo@gmail.com</td>
                <td>Female</td>
              </tr>
            </tbody>
          </table>
        </ContentWrap>
      </AdminContainer>
    );
  }
}

export default Client;
