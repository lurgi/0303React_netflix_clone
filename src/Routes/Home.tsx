import {
  faChevronLeft,
  faChevronRight,
  faPlayCircle,
  faPlusCircle,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { useState } from "react";
import { useQuery } from "react-query";
import { useMatch, useNavigate, useParams } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { getMovies, IgetMovies } from "../api";
import { searchState } from "../atom";
import TopRatedMovies from "../Components/movies/TopRated";
import UpcomingMovies from "../Components/movies/Upcoming_movie";
import { makeImg } from "../utils";

const HeadMovie = styled.div<{ bgPhoto: string }>`
  height: 100vh;
  background-color: blue;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgb(1, 0, 5)),
    url(${(props) => props.bgPhoto});
  background-size: cover;
  padding-left: 61px;
`;

const Loader = styled.div`
  text-align: center;
  font-size: 100px;
  margin-top: 50px;
  font-weight: 600;
`;

const Title = styled.h1`
  font-size: 80px;
  font-weight: 600;
  width: 545px;
  color: white;
  margin-bottom: 10px;
`;

const Overview = styled.h2`
  font-size: 18px;
  font-weight: 400;
  width: 545px;
  color: white;
`;

const SliderDiv = styled.div`
  height: 230px;
`;

const Wrapper = styled(motion.div)`
  position: absolute;
  height: 100%;
  width: 100%;
  z-index: 99;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Detail = styled(motion.div)`
  display: flex;
  width: 850px;
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

const ImgDiv = styled(motion.div)<{ bgPhoto: string }>`
  width: 100%;
  height: 500px;
  border-radius: 5px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgb(24, 24, 24)),
    url(${(props) => props.bgPhoto});
  background-size: cover;
`;

const Title2 = styled(motion.h1)`
  font-size: 30px;
  width: 100%;
  color: white;
  position: absolute;
  top: 346px;
  left: 20px;
  font-size: 50px;
  font-weight: 500;
`;

const Info = styled(motion.h2)`
  font-size: 25px;
  background-color: rgb(24, 24, 24);
  min-height: 150px;
  width: 100%;
  color: white;
  padding: 20px;
  padding-top: 0;
`;

const Icons = styled(motion.div)`
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
  initial: (back1: boolean) => {
    return {
      x: back1 ? 1422 : -1422,
    };
  },
  animate: { x: 0 },
  exit: (back1: boolean) => {
    return {
      x: back1 ? -1422 : +1422,
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

function Home() {
  const popularMovies = useQuery<IgetMovies>(["moives", "popular"], getMovies);
  const [topMoiveIndex, setTopMovieIndex] = useState(0);
  const [back1, setBack1] = useState(false);
  const naviate = useNavigate();
  const onClickDetail = (movieId: number) => {
    naviate(`/movie/${movieId}`);
  };
  const increaseIndex = () => {
    setBack1(true);
    setTopMovieIndex((prev) => (prev === 2 ? 2 : prev + 1));
  };
  const decreaseIndex = () => {
    setBack1(false);
    setTopMovieIndex((prev) => (prev === 0 ? 0 : prev - 1));
  };
  const topMovies = popularMovies.data?.results.slice(1, 19) || [];
  const setSearchClick = useSetRecoilState(searchState);
  const navigate = useNavigate();
  const onClickLocate = () => {
    navigate("/");
  };
  const match = useMatch("/movie/:movieId");
  const onSearchClick = () => {
    setSearchClick((prev) => false);
  };
  const { data, isLoading } = useQuery<IgetMovies>(
    ["moives", "popular"],
    getMovies
  );
  const params = useParams();
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (latest) => {
    console.log(latest);
  });
  return (
    <>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <HeadMovie
          onClick={onSearchClick}
          bgPhoto={makeImg(data?.results[0].backdrop_path || "")}
        >
          <Title>{data?.results[0].title}</Title>
          <Overview>{data?.results[0].overview}</Overview>
        </HeadMovie>
      )}
      <SliderDiv>
        <RowWrapper>
          <RowTitle>TOP10 영화</RowTitle>

          <AnimatePresence initial={false} custom={back1}>
            <Row
              custom={back1}
              variants={RowVari}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ type: "tween", duration: 1 }}
              key={topMoiveIndex}
            >
              {topMovies[6 * topMoiveIndex - 1] ? (
                <Box
                  bgphoto={makeImg(
                    popularMovies.data?.results.slice(1, 19)[
                      6 * topMoiveIndex - 1
                    ].backdrop_path || ""
                  )}
                >
                  <h1>
                    {
                      popularMovies.data?.results.slice(1, 19)[
                        6 * topMoiveIndex - 1
                      ].original_title
                    }
                  </h1>
                </Box>
              ) : (
                <Box bgphoto="" style={{ opacity: 0 }}></Box>
              )}
              {topMovies
                .slice(6 * topMoiveIndex, 6 * topMoiveIndex + 6)
                .map((v) => (
                  <Box
                    layoutId={`${v.id}`}
                    onClick={() => onClickDetail(v.id)}
                    variants={boxVari}
                    whileHover="hover"
                    key={v.id}
                    transition={{ type: "tween" }}
                    bgphoto={makeImg(v.backdrop_path)}
                  >
                    <motion.h1 variants={H1Vari}>{v.original_title}</motion.h1>
                    <BoxInfo variants={InfoVari}>
                      <div>
                        <h2>{v.original_title}</h2>
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
              {topMovies[6 * topMoiveIndex + 6] ? (
                <Box
                  bgphoto={makeImg(
                    topMovies[6 * topMoiveIndex + 6].backdrop_path
                  )}
                >
                  <h1>{topMovies[6 * topMoiveIndex + 6].original_title}</h1>
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
            style={{
              position: "absolute",
              top: 100,
              left: 198,
              color: "white",
            }}
          />
        </RowWrapper>
      </SliderDiv>
      <SliderDiv>
        <TopRatedMovies />
      </SliderDiv>
      <SliderDiv>
        <UpcomingMovies />
      </SliderDiv>
      {match ? (
        <AnimatePresence>
          <Wrapper
            style={{ top: scrollY }}
            onClick={onClickLocate}
            initial={{ backgroundColor: "rgba(0,0,0,0)" }}
            animate={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
            transition={{ duration: 0.5 }}
          >
            <Detail layoutId={`${match.params.movieId}`}>
              <ImgDiv
                bgPhoto={makeImg(
                  popularMovies.data?.results.find(
                    (movie) => movie.id + "" === params.id
                  )?.backdrop_path || ""
                )}
              ></ImgDiv>
              <Title2>
                {
                  popularMovies.data?.results.find(
                    (movie) => movie.id + "" === params.id
                  )?.original_title
                }
              </Title2>
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
              <Info>
                {
                  popularMovies.data?.results.find(
                    (movie) => movie.id + "" === params.id
                  )?.overview
                }
              </Info>
            </Detail>
          </Wrapper>
        </AnimatePresence>
      ) : null}
    </>
  );
}
export default Home;
