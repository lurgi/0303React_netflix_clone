import { motion } from "framer-motion";
import styled from "styled-components";
import Tv from "./Tv";

const Wrapper = styled(motion.div)`
  z-index: 99;
  position: absolute;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.3);
`;

const Detail = styled(motion.div)`
  height: 90vh;
  width: 850px;
`;

const ImgDiv = styled.div`
  width: 100%;
  height: 500px;
`;

const Title = styled.h1`
  font-size: 30px;
`;

const Info = styled.h2`
  font-size: 25px;
`;

export default function TvDetail() {
  return (
    <Wrapper>
      <Tv></Tv>
      <Detail>
        <ImgDiv>123</ImgDiv>
        <Title>123</Title>
        <Info>123</Info>
      </Detail>
    </Wrapper>
  );
}
