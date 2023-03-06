import {
  faPlayCircle,
  faPlusCircle,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { getMovieDetail, IgetMoviesResults } from "../api";
import { makeImg } from "../utils";

const Wrapper = styled(motion.div)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 90%;
  width: 850px;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.3);
`;

const Detail = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 10px;
  overflow: hidden;
  background-color: rgb(24, 24, 24);
  position: relative;
  & > h3 {
    font-size: 100px;
    color: white;
  }
`;

const ImgDiv = styled.div<{ bgPhoto: string }>`
  width: 100%;
  height: 500px;
  border-radius: 5px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgb(24, 24, 24)),
    url(${(props) => props.bgPhoto});
  background-size: cover;
`;

const Title = styled.h1`
  font-size: 30px;
  width: 100%;
  color: white;
  position: absolute;
  top: 346px;
  left: 20px;
  font-size: 50px;
  font-weight: 500;
`;

const Info = styled.h2`
  font-size: 25px;
  background-color: rgb(24, 24, 24);
  min-height: 150px;
  width: 100%;
  color: white;
  padding: 20px;
  padding-top: 0;
`;

const Icons = styled.div`
  position: absolute;
  left: 0;
  top: 427px;
  padding-left: 20px;
  display: flex;
  align-items: center;
  & > span {
    color: white;
    margin-right: 10px;
  }
  & > span:first-child {
    background-color: white;
    width: 110px;
    height: 40px;
    color: rgb(24, 24, 24);
    display: flex;
    align-items: center;
    padding-left: 10px;
    border-radius: 5px;
    & > h1 {
      font-size: 18px;
      font-weight: 600;
      padding-left: 10px;
    }
  }
`;

export default function MovieDetail() {
  const { id } = useParams();
  const { data, isLoading } = useQuery<IgetMoviesResults>("movie", () =>
    getMovieDetail(id + "")
  );
  console.log(data);
  return (
    <>
      <Wrapper>
        {isLoading ? (
          <Detail>
            <h3>Loading...</h3>
          </Detail>
        ) : (
          <Detail>
            <ImgDiv bgPhoto={makeImg(data?.backdrop_path || "")}></ImgDiv>
            <Title>{data?.original_title}</Title>
            <Icons>
              <span>
                <FontAwesomeIcon size="2x" icon={faPlayCircle} />
                <h1>재생</h1>
              </span>
              <span>
                <FontAwesomeIcon size="2x" icon={faPlusCircle} />
              </span>
              <span>
                <FontAwesomeIcon size="2x" icon={faThumbsUp} />
              </span>
            </Icons>
            <Info>{data?.overview}</Info>
          </Detail>
        )}
      </Wrapper>
    </>
  );
}
