import styled from "styled-components";
import { color, shadowStyle } from "../../components/styles/constant";

const TableWrapper = styled.section`
  table {
    color: ${color.textColor};
    border: 1px solid #e6e9ed;
    background: #fff;
    width: 100%;
    thead {
      tr {
        background-color: #efefef;
        color: ${color.textLight};
        th {
          padding: 1rem;
          border: none;
        }
        td {
          border-top: 1px solid #dee2e6;
        }
      }
    }
    tbody {
      tr {
        border-top: 1px solid #dee2e6;
        td {
          padding: 1rem;
          vertical-align: top;
          &.more-options {
            text-align: right;
            span {
              display: inline-block;
              cursor: pointer;
              i {
                font-size: 1.4rem;
              }
            }
          }
          .dropdown {
            a {
              font-size: 1.4rem;
              cursor: pointer;
            }
            .dropdown-item:active {
              background-color: #efefef;
            }
            .dropdown-item.delete {
              color: #920025;
            }
          }
          .red {
            color: #920025;
          }
          .multi {
            display: inline-block;
            margin-right: 1rem;
            margin-bottom: 1rem;
            padding: 0.2rem 0.8rem;
            border-radius: 0.5rem;
            background: #efefef;
          }
        }
      }
    }
  }
`;

export default TableWrapper;
