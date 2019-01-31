import styled from "styled-components";
import { color, height, shadowStyle } from "./constant";

const BodyContent = styled.div`
  section.banner {
    min-height: 90vh;
    position: relative;
    background-image: linear-gradient(
      to bottom,
      #ffffff,
      #fcfcfd,
      #f9f8fc,
      #f6f5fa,
      #f3f2f8
    );
    .page-title {
      text-align: center;
      font-size: 4.925rem;
      line-height: 4.8125rem;
      letter-spacing: -0.08px;
      font-weight: 500;
      padding-top: 10rem;
    }
    img {
      position: absolute;
      bottom: -15px;
      left: 20%;
      /* width: 60%; */
      width: 57vw;
    }
    .page-caption {
      text-align: center;
      font-size: 2.8rem;
      line-height: 2.3125rem;
      font-weight: 300;
      padding: 3rem;
    }
    .button {
      border-radius: 10rem !important;
      padding-bottom: 2rem !important;
      padding: 1rem 4rem !important;
      height: 5.5rem !important;
      font-size: 1.6rem !important;
      font-weight: 600;
      border: none;
      background-color: ${color.brandColor};
      color: ${color.whiteColor};
      outline: none;
    }
  }
  section.features {
    margin: ${height.spaceHeight} 0;
    .title {
      text-align: center;
      font-weight: 600;
      font-size: 2.8rem;
      margin-bottom: 1rem;
    }
    .caption {
      text-align: center;
      font-size: 1.8rem;
    }
    .feature-wrap {
      margin-top: ${height.spaceHeight};
      .space {
        margin-bottom: ${height.spaceHeight};
      }
      .svg-wrap {
        text-align: center;
        img {
          height: 15rem;
          width: auto;
        }
      }
      .title {
        font-weight: 600;
        margin-top: ${height.gutterHeight};
        font-size: 1.9rem;
        margin-bottom: 1rem;
        text-align: center;
      }
      .description {
        font-weight: 500;
        text-align: center;
      }
    }
  }
  section.pricing {
    padding: ${height.spaceHeight} 0 10rem 0;
    background-color: #fbfbfb;
    .section-title {
      text-align: center;
      font-weight: 600;
      font-size: 2.8rem;
      margin-bottom: ${height.spaceHeight};
    }
    .pricing-wrap {
      width: 90%;
      padding: 4rem;
      background-color: ${color.whiteColor};
      box-shadow: ${shadowStyle.lightShadow};
      &.more-shadow {
        box-shadow: ${shadowStyle.shadow};
      }
      .title {
        font-weight: 600;
        margin: 0 0 ${height.gutterHeight} 0;
        font-size: 1.9rem;
        text-align: center;
      }
      .amount {
        font-size: 4rem;
        color: ${color.brandColor};
        text-align: center;
        margin-bottom: ${height.gutterHeight};
        font-weight: 300;
      }
      .benefit {
        ul {
          margin: 0;
          padding: 0;
          li {
            display: block;
            padding-bottom: 0.5rem;
            text-align: center;
          }
        }
      }
      .button-wrap {
        margin-top: ${height.gutterHeight};
      }
    }
  }
  section.testimony {
    padding: ${height.spaceHeight} 0 10rem 0;
    .title {
      text-align: center;
      font-weight: 600;
      font-size: 2.8rem;
    }
    .caption {
      text-align: center;
      font-size: 1.8rem;
      margin-bottom: 4rem;
    }
    .testimonies {
      blockquote {
        font-size: 2.5rem;
        width: 80%;
        margin: auto;
        text-align: center;
      }
    }
  }
  footer.footer {
    min-height: 17rem;
    background-color: ${color.adminColor};
    padding: 4rem 0 0rem 0;
    .logo {
      a {
        color: ${color.whiteColor};
        font-size: 3rem;
        text-transform: capitalize;
        font-weight: 400;
        display: inline-block;
        height: 100%;
        span.icon {
          display: inline-block;
          color: ${color.whiteColor};
          margin-left: 0.5rem;
          i {
            font-size: 1rem;
          }
        }
        &:hover {
          text-decoration: none;
          color: ${color.whiteColor};
        }
      }
    }
    ul {
      padding: 0;
      margin-top: 1rem;
      li {
        display: inline-block;
        width: 49%;
        padding-bottom: 1rem;
        a {
          color: ${color.whiteColor};
          display: inline-block;
        }
      }
      &.social {
        text-align: right;
        margin-top: 3.5rem;
        li {
          display: inline;
          padding-bottom: 1rem;
          margin-left: 2rem;
          a {
            color: ${color.whiteColor};
            display: inline-block;
            i {
              font-size: 2.5rem;
            }
          }
        }
      }
    }
    .trademark {
      color: ${color.whiteColor};
      margin-top: 2rem;
      background-color: #3a3e51;
    }
  }
`;

export default BodyContent;
