import Link from "next/link";
import { color } from "../components/styles/constant";
import Button from "../components/styles/Button";
import Cookies from "js-cookie";
import styled, { css } from "styled-components";
import Header from "../components/Header";






const MainSection = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  background-repeat: no-repeat;
  background-color: ${props => (props.backgroundColor ? props.backgroundColor : "transparent")};
  background-position: center;
  background-image: ${props => (props.src ? `url(${props.src})` : "none")};
  background-size: cover;
  position: relative;
  border-bottom: 1px solid #f0f0f0;
  ${'' /* padding: 0 3rem; */}
`;

const LogoHolder = styled.div`
  width: 70px;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  position: absolute;
  left: 10rem;
  right: 0;
  top: 0;
  bottom: 0;
`;

const IconHolder = styled.div`
  display: flex;
  flex-direction: column;
  width: ${props => (props.width ? props.width : "50px")};
  height: ${props => (props.height ? props.height : "50px")};
  background-size: cover;
  flex-grow: 0;
  flex-shrink: 0;
  margin: ${props => (props.margin ? props.margin : "0px 0px")};
  border-radius: ${props => (props.borderRadius ? props.borderRadius : "0px")};
  background-repeat: no-repeat;
  background-color: ${props => (props.backgroundColor ? props.backgroundColor : "transparent")};
  background-position: ${props => (props.position ? props.position : "center")};
  background-image: ${props => (props.src ? `url(${props.src})` : "none")};
  background-size: ${props => (props.backgroundSize ? props.backgroundSize : "contain")};
`;
const Section = styled.div`
  display: flex;
  flex: ${(props) => (props.flex ? props.flex : 1)};
  justify-content: ${(props) => (props.justifyContent ? props.justifyContent : "flex-start")};
  align-items: ${(props) => (props.alignItems ? props.alignItems : "flex-start")};
  flex-direction: ${(props) => (props.flexDirection ? props.flexDirection : "column")};
  background: ${(props) => (props.backgroundColor ? props.backgroundColor : "transparent")};
  text-align: ${(props) => (props.textAlign ? props.textAlign : "inherit")};
  font-size: ${(props) => (props.fontSize ? props.fontSize : "inherit")};
  width: 100%;
  height: ${(props) => (props.height ? props.height : "auto")};
  min-height: 100px;
  padding: ${(props) => (props.padding ? props.padding : "0")};
  ${(props) =>
      props.absolutePosition &&
      css`
      position: absolute;
      bottom: 0;
      `};
  ${(props) =>
      props.withImage &&
      css`
      background-repeat: no-repeat;
      background-position: center;
      background-image: ${props => (props.src ? `url(${props.src})` : "none")};
      background-size: ${props => (props.backgroundSize ? props.backgroundSize  : "contain")};
      `};
`;

const Text = styled.div`
  text-align: ${(props) => (props.textAlign ? props.textAlign : "inherit")};
  font-size: ${(props) => (props.fontSize ? props.fontSize : "1rem")};
  font-weight: ${(props) => (props.fontWeight ? props.fontWeight : "400")};
  color: ${(props) => (props.color ? props.color : "inherit")};
  padding: ${(props) => (props.padding ? props.padding : "0")};

`






class LandingPage extends React.Component {
  // constructor(props){
  //         super(props);
  //         this.state = {
  //           top: "",
  //           height: "",
  //           scroll: "",
  //          };
  //         this.handleScroll = this.handleScroll.bind(this);
  //     }
  //
  //
  //   handleScroll() {
  //       this.setState({scroll: window.scrollY});
  //   }
  //
  //   componentDidMount() {
  //         const el = document.querySelector('Header');
  //         console.log(el, "--------->")
  //         this.setState({top: el.offsetTop, height: el.offsetHeight});
  //         window.addEventListener('scroll', this.handleScroll);
  //   }
  //
  //   componentDidUpdate() {
  //       this.state.scroll > this.state.top ?
  //           document.body.style.paddingTop = `${this.state.height}px` :
  //           document.body.style.paddingTop = 0;
  //   }

    render() {
      return (
        <React.Fragment>
          <MainSection src={"/static/images/appetments_banner.jpg"}>
            <LogoHolder>
              <IconHolder src={"/static/images/appetmentsicon.png"} width={"30px"} heigght={"30px"} />
            </LogoHolder>
            <Section
              justifyContent={"center"}
              alignItems={"center"}>
              <Text
                fontSize={"1.5rem"}
                // padding={" 1rem 0"}
                style={{letterSpacing: '1px'}}
                color={color.lightShade}>
                DISCOVER APPETMENTS
              </Text>

              <Text
                fontSize={"3.5rem"}
                fontWeight={"200"}
                padding={"0 0 4rem 0"}
                textAlign={"center"}
                style={{lineHeight: '4rem', }}
                color={color.lightShade}>
                A Pet sheduling app you'll love with Online Appointments
              </Text>
              <div className="text-center">
                {Cookies.get("token") === undefined ? (
                  <Link href="/signup">
                    <Button radius={"30rem"} fontWeight={"300"} fontSize={"1.5rem"} textTransform={"capitalize"} height={"4.5rem"} padding={"0rem 3.5rem"} lineHeight={"100%"} className="button">Get a 14 Day Free Trial </Button>
                  </Link>
                ) : (
                  <Link href="/dashboard">
                    <Button radius={"30rem"} fontWeight={"300"} fontSize={"1.5rem"} textTransform={"capitalize"} height={"4.5rem"} padding={"0rem 3.5rem"} lineHeight={"100%"} className="button">View Your Dashboard</Button>
                  </Link>
                )}
              </div>
            </Section>
            <Section
              absolutePosition
              withImage
              src={"/static/images/brush_stroke.png"}
              backgroundSize={"cover"}
              justifyContent={"center"}
              alignItems={"center"}
              padding={"11.5rem 0 0 0"}
              height={"200px"}>
              <Header />
            </Section>
          </MainSection>

          <Section
            justifyContent={"space-between"}
            padding={"5rem 10rem"}
            height={"550px"}
            flexDirection={"row"}>
            <Section
              flex={"0.7"}>
              <Text
                fontSize={"1.5rem"}
                // padding={" 1rem 0"}
                style={{letterSpacing: '1px'}}
                color={color.textLight}>
                APPETMENTS
              </Text>
              <Text
                fontSize={"3.4rem"}
                padding={" 1.5rem 0"}
                fontWeight={"300"}
                style={{letterSpacing: '1px', lineHeight: '3.6rem',}}
                color={color.textColor}>
                We're the new kid on the block.
              </Text>
              <Text
                fontSize={"1.8rem"}
                padding={" 1.5rem 0"}
                fontWeight={"300"}
                style={{letterSpacing: '1px'}}
                style={{lineHeight: '2.5rem', }}
                color={color.textColor}>
                Appetments is here for you and your business.
                We've launched with features you've been waiting too long to get and
                we don't look like we were made before dinosaurs.
              </Text>
              <Text
                fontSize={"1rem"}
                padding={" 1.5rem 0"}
                fontWeight={"300"}
                style={{letterSpacing: '1px'}}
                style={{lineHeight: '100%', }}
                color={color.textColor}>
                Enough about us, let's get down to business..
              </Text>
              <div className="text-center">
                {Cookies.get("token") === undefined ? (
                  <Link href="/signup">
                    <Button radius={"30rem"} buttonColor={"#10cfbd"} textColor={color.whiteColor} fontWeight={"400"} fontSize={"1.5rem"} textTransform={"capitalize"} height={"4.5rem"} padding={"0rem 3.5rem"} lineHeight={"100%"} className="button">Get a 14 Day Free Trial </Button>
                  </Link>
                ) : (
                  <Link href="/dashboard">
                    <Button radius={"30rem"} buttonColor={"#10cfbd"} textColor={color.whiteColor} fontWeight={"400"} fontSize={"1.5rem"} textTransform={"capitalize"} height={"4.5rem"} padding={"0rem 3.5rem"} lineHeight={"100%"} className="button">View Your Dashboard</Button>
                  </Link>
                )}
              </div>
            </Section>
            <Section
              padding={"3rem 0 0 0"}
              alignItems={"center"}>
              <IconHolder width={"350px"} height={"470px"} position={"top center"} backgroundSize={"cover"} src={"/static/images/iphone.png"} />
            </Section>
          </Section>
          <Section backgroundColor={"#fafaf4"}>

          </Section>
        </React.Fragment>
      );
    }
}



// const LandingPage = () => {
//   return (
//     <React.Fragment>
//       <MainSection src={"/static/images/appetments_banner.jpg"}>
//         <LogoHolder>
//           <IconHolder src={"/static/images/appetmentsicon.png"} width={"30px"} heigght={"30px"} />
//         </LogoHolder>
//         <Section
//           justifyContent={"center"}
//           alignItems={"center"}>
//           <Text
//             fontSize={"1.5rem"}
//             // padding={" 1rem 0"}
//             style={{letterSpacing: '1px'}}
//             color={color.lightShade}>
//             DISCOVER APPETMENTS
//           </Text>
//
//           <Text
//             fontSize={"3.5rem"}
//             fontWeight={"200"}
//             padding={"0 0 4rem 0"}
//             textAlign={"center"}
//             style={{lineHeight: '4rem', }}
//             color={color.lightShade}>
//             A Pet sheduling app you'll love with Onine Appointments
//           </Text>
//           <div className="text-center">
//             {Cookies.get("token") === undefined ? (
//               <Link href="/signup">
//                 <Button radius={"30rem"} fontWeight={"300"} fontSize={"1.5rem"} textTransform={"capitalize"} height={"4.5rem"} padding={"0rem 3.5rem"} lineHeight={"100%"} className="button">Get a 14 Day Free Trial </Button>
//               </Link>
//             ) : (
//               <Link href="/dashboard">
//                 <Button radius={"30rem"} fontWeight={"300"} fontSize={"1.5rem"} textTransform={"capitalize"} height={"4.5rem"} padding={"0rem 3.5rem"} lineHeight={"100%"} className="button">View Your Dashboard</Button>
//               </Link>
//             )}
//           </div>
//         </Section>
//         <Section
//           absolutePosition
//           withImage
//           src={"/static/images/brush_stroke.png"}
//           backgroundSize={"cover"}
//           justifyContent={"center"}
//           alignItems={"center"}
//           padding={"11.5rem 0 0 0"}
//           height={"200px"}>
//           <Header />
//         </Section>
//       </MainSection>
//       <Section></Section>
//     </React.Fragment>
//   );
// };

export default LandingPage;
