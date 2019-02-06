import Link from "next/link";
import { color } from "../components/styles/constant";
import Button from "../components/styles/Button";
import Cookies from "js-cookie";

const PageInfo = () => {
  return (
    <React.Fragment>
      <section className="banner">
        <div className="container">
          <div className="page-title">
            Meet the #1 Software for Pets Business
          </div>
          <div className="page-caption">
            Simple, flexible and powerful booking software for your business
          </div>
          <div className="text-center">
            {Cookies.get("token") === undefined ? (
              <Link href="/signup">
                <button className="button">Get Started</button>
              </Link>
            ) : (
              <Link href="/dashboard">
                <button className="button">View Your Dashboard</button>
              </Link>
            )}
          </div>
          <div className="img" />
        </div>
      </section>
      <section className="features">
        <div className="container">
          <div className="title">Loaded with Advanced Features</div>
          <div className="caption">
            All the great tools you need to run your profitable business
          </div>
          <div className="feature-wrap">
            <div className="row">
              <div className="col-md-4 space">
                <div className="svg-wrap">
                  <img src="/static/images/appointment.svg" alt="" />
                </div>
                <div className="title">Schedule Appointments</div>
                <div className="description">
                  Appetments is a clean, simple tool with powerful calendar
                  scheduling features that can handle all your salon appointment
                  bookings. Features include online booking, pos with payments
                  and mobile apps.
                </div>
              </div>

              <div className="col-md-4 space">
                <div className="svg-wrap">
                  <img src="/static/images/manage_ clients.svg" alt="" />
                </div>
                <div className="title">Manage your clients</div>
                <div className="description">
                  Maintain client relationships with advanced salon software
                  management features with detailed client appointments history,
                  booking preferences, future bookings and contact details.
                </div>
              </div>

              <div className="col-md-4 space">
                <div className="svg-wrap">
                  <img src="/static/images/reminders.svg" alt="" />
                </div>
                <div className="title">Send automated reminders </div>
                <div className="description">
                  Send automated reminders and custom messages to clients about
                  appointments and notify them of any changes. Appetment
                  Scheduling app is the best software for bussiness.
                </div>
              </div>

              <div className="col-md-4 space">
                <div className="svg-wrap">
                  <img src="/static/images/dashboard.svg" alt="" />
                </div>
                <div className="title">Activity Dashboard </div>
                <div className="description">
                  Keep track of daily appointment scheduling activities and
                  never miss a beat. The free dashboard displays up to date
                  appointment bookings, online bookings, appointment
                  cancelations and client notifications.
                </div>
              </div>

              <div className="col-md-4 space">
                <div className="svg-wrap">
                  <img src="/static/images/online_booking.svg" alt="" />
                </div>
                <div className="title">Online Bookings</div>
                <div className="description">
                  Supercharge your appointment bookings by allowing customers to
                  book appointments online through your own website, Facebook or
                  online booking apps. Allow clients to book, cancel or
                  reschedule their own appointment bookings through the app.
                </div>
              </div>

              <div className="col-md-4 space">
                <div className="svg-wrap">
                  <img src="/static/images/sales.svg" alt="" />
                </div>
                <div className="title">Sales & Products</div>
                <div className="description">
                  Appetments has point-of-sale built-in, takes care of your
                  salon and Spa pos sales transactions, invoicing, receipts,
                  taxes and retail product management. Appetments POS is
                  advanced and fully integrated with salon scheduling app.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="pricing">
        <div className="container">
          <div className="section-title">Choose Pricing Plan</div>
          <div className="row">
            <div className="col-md-4">
              <div className="pricing-wrap m-auto">
                <div className="title">Start</div>
                <div className="amount">$500</div>
                <div className="benefit">
                  <ul>
                    <li>Lorem ipsum dolor sit amet consectetur.</li>
                    <li>Lorem ipsum dolor sit amet.</li>
                    <li>Lorem ipsum consectetur sit amet.</li>
                    <li>Lorem ipsum dolor sit.</li>
                  </ul>
                  <div className="button-wrap text-center">
                    <Button
                      buttonColor={color.brandColor}
                      textColor={color.whiteColor}
                      radius={"3rem"}
                    >
                      Select Plan
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="pricing-wrap more-shadow m-auto">
                <div className="title">Partner</div>
                <div className="amount">$1,500</div>
                <div className="benefit">
                  <ul>
                    <li>Lorem ipsum dolor sit amet consectetur.</li>
                    <li>Lorem ipsum dolor sit amet.</li>
                    <li>Lorem ipsum consectetur sit amet.</li>
                    <li>Lorem ipsum dolor sit.</li>
                  </ul>
                  <div className="button-wrap text-center">
                    <Button
                      buttonColor={`#F9D100`}
                      textColor={color.whiteColor}
                      radius={"3rem"}
                    >
                      Select Plan
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="pricing-wrap more-shadow m-auto">
                <div className="title">Business</div>
                <div className="amount">$2,500</div>
                <div className="benefit">
                  <ul>
                    <li>Lorem ipsum dolor sit amet consectetur.</li>
                    <li>Lorem ipsum dolor sit amet.</li>
                    <li>Lorem ipsum consectetur sit amet.</li>
                    <li>Lorem ipsum dolor sit.</li>
                  </ul>
                  <div className="button-wrap text-center">
                    <Button
                      buttonColor={color.brandColor}
                      textColor={color.whiteColor}
                      radius={"3rem"}
                    >
                      Select Plan
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="testimony">
        <div className="container">
          <div className="title">
            Hear what some of our users are saying about us
          </div>
          <div className="caption">
            Appetments is important for every pet business
          </div>
          <div className="testimonies">
            <blockquote className="blockquote">
              <p className="mb-0">
                “Best online pet system! Features include appointment
                scheduling, online booking app, pos system and best of all its
                easy to use! Appetments is more than a software app, its a
                complete solution for your business. ”
              </p>
              <footer className="blockquote-footer">
                William O. James <cite title="Source Location">Queensland</cite>
              </footer>
            </blockquote>
          </div>
        </div>
      </section>
      <footer className="footer">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <div className="logo">
                <Link href="/">
                  <a>
                    Appetments
                    <span className="icon">
                      <i className="fas fa-circle" />
                    </span>
                  </a>
                </Link>
                <div style={{ color: "white", fontSize: "1.1rem" }}>
                  {" "}
                  © {new Date().getFullYear()} Terms and Conditions Apply
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="links">
                <ul>
                  <li>
                    <Link href="">
                      <a>Home</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="">
                      <a>About</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="">
                      <a>Contact us</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="">
                      <a>Signup</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="">
                      <a>Login</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="">
                      <a>Support Center</a>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-4">
              <ul className="social">
                <li>
                  <Link href="#">
                    <a>
                      <i className="fab fa-facebook-square" />
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="#">
                    <a>
                      <i className="fab fa-twitter-square" />
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="#">
                    <a>
                      <i className="fab fa-instagram" />
                    </a>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* <div className="trademark text-center">
          © {new Date().getFullYear()} Appetment Inc. Privacy , Terms and
          Conditions Apply
        </div> */}
      </footer>
    </React.Fragment>
  );
};

export default PageInfo;
