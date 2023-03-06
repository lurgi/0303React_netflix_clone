import {
  faChevronLeft,
  faChevronRight,
  faPlayCircle,
  faPlusCircle,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import {
  getSearchMovie,
  getTodaySeries,
  IgetMovies,
  IgetSeries,
} from "../../api";
import { makeImg } from "../../utils";

const RowWrapper = styled.div`
  transform: translate(-237px, -60px);
  position: relative;
  margin: 0px 60px;
`;

const Row = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 7px;
  position: absolute;
`;

const RowTitle = styled.div`
  transform: translate(237px, 0px);
  color: white;
  font-size: 22px;

  font-weight: 500;
  margin-bottom: 17px;
`;

const Box = styled(motion.div)<{ bgphoto: string }>`
  width: 230px;
  height: 130px;
  color: whitesmoke;
  font-size: 20px;
  border-radius: 3px;
  background-color: black;
  background-image: url(${(props) => props.bgphoto});
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 5px 10px 2px rgba(0, 0, 0, 1);
  &:hover {
    cursor: pointer;
  }
  & > h1 {
    font-size: 20px;
    font-weight: 600;
    padding: 5px;
  }
  &:nth-child(2) {
    transform-origin: center left;
  }
  &:nth-child(7) {
    transform-origin: center right;
  }
`;

const BoxInfo = styled(motion.div)`
  width: 230px;
  padding: 5px;
  margin-top: 50px;
  background-color: rgb(20, 20, 20);
  position: absolute;
  opacity: 0;
  top: 76px;
  border-radius: 0px 0px 3px 3px;
  & > div:first-child {
    display: flex;
    align-items: center;
    margin-bottom: 5px;
  }
  & > div > h2 {
    margin-top: 3px;
    font-size: 12px;
    font-weight: 600;
  }
  & > span {
    margin-right: 10px;
  }
  & > div:last-child {
    margin-top: 3px;
    font-weight: 600;
    font-size: 10px;
    color: #36934d;
  }
`;

const RowVari = {
  initial: (back: boolean) => {
    return {
      x: back ? 1422 : -1422,
    };
  },
  animate: { x: 0 },
  exit: (back: boolean) => {
    return {
      x: back ? -1422 : +1422,
    };
  },
};

const boxVari = {
  initial: { scale: 1 },
  hover: {
    scale: 1.5,
    y: -100,
    transition: { delay: 0.6, duration: 0.3, type: "tween" },
  },
};

const H1Vari = {
  initial: { opacity: 1 },
  hover: {
    opacity: 0,
    transition: { delay: 0.6, duration: 0.3, type: "tween" },
  },
};

const InfoVari = {
  hover: {
    opacity: 1,
    transition: { delay: 0.6, duration: 0.3, type: "tween" },
  },
};

export default function SearchMovie() {
  const { id } = useParams();
  const { data } = useQuery<IgetMovies>(["series", "popular"], () =>
    getSearchMovie(id + "")
  );
  const [topMoiveIndex, setTopMovieIndex] = useState(0);
  const [back, setBack] = useState(false);

  const increaseIndex = () => {
    setBack(true);
    setTopMovieIndex((prev) => (prev === 2 ? 2 : prev + 1));
  };
  const decreaseIndex = () => {
    setBack(false);
    setTopMovieIndex((prev) => (prev === 0 ? 0 : prev - 1));
  };

  const topSeries = data?.results.slice(0, 18) || [];
  return (
    <RowWrapper>
      <RowTitle>검색 된 영화</RowTitle>

      <AnimatePresence initial={false} custom={back}>
        <Row
          custom={back}
          variants={RowVari}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ type: "tween", duration: 1 }}
          key={topMoiveIndex}
        >
          {topSeries[6 * topMoiveIndex - 1] ? (
            <Box
              bgphoto={makeImg(
                data?.results.slice(0, 18)[6 * topMoiveIndex - 1]
                  .backdrop_path || ""
              )}
            >
              <h1>{data?.results.slice(0, 18)[6 * topMoiveIndex - 1].title}</h1>
            </Box>
          ) : (
            <Box bgphoto="" style={{ opacity: 0 }}></Box>
          )}
          {topSeries
            .slice(6 * topMoiveIndex, 6 * topMoiveIndex + 6)
            .map((v) => (
              <Box
                variants={boxVari}
                whileHover="hover"
                key={v.id}
                transition={{ type: "tween" }}
                bgphoto={makeImg(v.backdrop_path)}
              >
                <motion.h1 variants={H1Vari}>{v.title}</motion.h1>
                <BoxInfo variants={InfoVari}>
                  <div>
                    <h2>{v.title}</h2>
                  </div>
                  <span>
                    <FontAwesomeIcon size="sm" icon={faPlayCircle} />
                  </span>
                  <span>
                    <FontAwesomeIcon size="sm" icon={faPlusCircle} />
                  </span>
                  <span>
                    <FontAwesomeIcon size="sm" icon={faThumbsUp} />
                  </span>
                  <div>
                    <h3>평점 : {v.vote_average}</h3>
                  </div>
                </BoxInfo>
              </Box>
            ))}
          {topSeries[6 * topMoiveIndex + 6] ? (
            <Box
              bgphoto={makeImg(topSeries[6 * topMoiveIndex + 6].backdrop_path)}
            >
              <h1>{topSeries[6 * topMoiveIndex + 6].title}</h1>
            </Box>
          ) : (
            <Box bgphoto="" style={{ opacity: 0 }}></Box>
          )}
        </Row>
      </AnimatePresence>
      <FontAwesomeIcon
        onClick={increaseIndex}
        icon={faChevronRight}
        size="2x"
        style={{
          position: "absolute",
          top: 100,
          right: -272,
          color: "white",
        }}
      />
      <FontAwesomeIcon
        onClick={decreaseIndex}
        icon={faChevronLeft}
        size="2x"
        style={{ position: "absolute", top: 100, left: 198, color: "white" }}
      />
    </RowWrapper>
  );
}
