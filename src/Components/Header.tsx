import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  motion,
  useAnimation,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { faBell, faSearch } from "@fortawesome/free-solid-svg-icons";
import { useRecoilState } from "recoil";
import { searchState } from "../atom";
import { useForm } from "react-hook-form";

const Nav = styled(motion.nav)`
  display: flex;
  width: 100vw;
  justify-content: space-between;
  align-items: center;
  padding: 22px 56px;
  position: fixed;
  top: 0;
  z-index: 98;
`;

const Col = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Logo = styled(motion.svg)`
  width: 100px;
  height: 25px;
  margin-right: 45px;
  fill: red;
`;

const Items = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Item = styled(motion.li)`
  font-size: 14px;
  font-weight: 500;
  color: white;
  margin-right: 20px;
  &:hover {
    cursor: pointer;
  }
`;
const FakeItem = styled.li`
  font-size: 14px;
  font-weight: 500;
  color: white;
  margin-right: 20px;
  &:hover {
    cursor: default;
  }
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  margin-right: 20px;
  position: relative;
`;

const Input = styled(motion.input)`
  height: 38px;
  width: 250px;
  transform-origin: right;
  position: absolute;
  top: -8px;
  right: 0;
  background: none;
  padding-left: 50px;
  border: 1px solid white;
  color: white;
`;

const logoVari = {
  initial: {
    fillOpacity: 1,
    pathLength: 0,
  },
  active: {
    fillOpacity: 0,
    pathLength: 1,
  },
};

type IFormData = {
  errors: {
    search: {
      message: string;
    };
  };
  search: string;
};

const navVari = {
  initial: {
    background: "linear-gradient(rgb(49, 49, 49),rgba(0, 0, 0,0))",
  },
  animate: {
    background: "linear-gradient(rgb(14, 14, 14),rgb(14, 14, 14))",
  },
};

function Header() {
  const [searchClick, setSearchClick] = useRecoilState(searchState);
  const onSearchClick = () => {
    setSearchClick((prev) => !prev);
  };
  const { register, watch, handleSubmit, setValue } = useForm<IFormData>();
  const navigate = useNavigate();
  const onValid = () => {
    if (watch().search !== undefined) {
      navigate(`/Search/${watch().search}`);
      setValue("search", "");
      window.location.reload();
    }
  };
  const navArr = [{ 영화: "" }, { 시리즈: "Tv" }];
  const ref = useLocation();
  const { scrollY } = useScroll();
  const scrollAnimation = useAnimation();
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest >= 100) {
      scrollAnimation.start("animate");
    } else {
      scrollAnimation.start("initial");
    }
  });
  return (
    <Nav variants={navVari} initial="initial" animate={scrollAnimation}>
      <Col
        onClick={() => {
          setSearchClick(false);
        }}
      >
        <Logo
          xmlns="http://www.w3.org/2000/svg"
          width="1024"
          height="276.742"
          viewBox="0 0 1024 276.742"
        >
          <motion.path
            variants={logoVari}
            whileHover="active"
            initial="initial"
            transition={{
              default: { duration: 1.5 },
            }}
            style={{
              stroke: "red",
              strokeWidth: 10,
            }}
            d="M140.803 258.904c-15.404 2.705-31.079 3.516-47.294 5.676l-49.458-144.856v151.073c-15.404 1.621-29.457 3.783-44.051 5.945v-276.742h41.08l56.212 157.021v-157.021h43.511v258.904zm85.131-157.558c16.757 0 42.431-.811 57.835-.811v43.24c-19.189 0-41.619 0-57.835.811v64.322c25.405-1.621 50.809-3.785 76.482-4.596v41.617l-119.724 9.461v-255.39h119.724v43.241h-76.482v58.105zm237.284-58.104h-44.862v198.908c-14.594 0-29.188 0-43.239.539v-199.447h-44.862v-43.242h132.965l-.002 43.242zm70.266 55.132h59.187v43.24h-59.187v98.104h-42.433v-239.718h120.808v43.241h-78.375v55.133zm148.641 103.507c24.594.539 49.456 2.434 73.51 3.783v42.701c-38.646-2.434-77.293-4.863-116.75-5.676v-242.689h43.24v201.881zm109.994 49.457c13.783.812 28.377 1.623 42.43 3.242v-254.58h-42.43v251.338zm231.881-251.338l-54.863 131.615 54.863 145.127c-16.217-2.162-32.432-5.135-48.648-7.838l-31.078-79.994-31.617 73.51c-15.678-2.705-30.812-3.516-46.484-5.678l55.672-126.75-50.269-129.992h46.482l28.377 72.699 30.27-72.699h47.295z"
          />
        </Logo>
        <Items>
          {navArr.map((option) => (
            <Link
              key={`/${Object.values(option)}`}
              to={`/${Object.values(option)}`}
            >
              {`/${Object.values(option)}` === ref.pathname ? (
                <FakeItem key={`/${Object.values(option)}`}>
                  {Object.keys(option)}
                </FakeItem>
              ) : (
                <Item
                  whileHover={{ color: "rgba(255,255,255,0.5)" }}
                  initial={{ color: "rgba(255,255,255,1)" }}
                  transition={{ duration: 0.3 }}
                >
                  {Object.keys(option)}
                </Item>
              )}
            </Link>
          ))}
          <FakeItem>NEW! 요즘 대세 콘텐츠</FakeItem>
          <FakeItem>내가 찜한 콘텐츠</FakeItem>
          <FakeItem>언어별로 찾아보기</FakeItem>
        </Items>
      </Col>
      <Col>
        <SearchBar>
          <motion.div
            style={{ zIndex: 99 }}
            onClick={onSearchClick}
            transition={{ type: "leanear" }}
            animate={{ x: searchClick ? -215 : 0 }}
          >
            <FontAwesomeIcon
              style={{ color: "white" }}
              size="lg"
              icon={faSearch}
            />
          </motion.div>
          <form onSubmit={handleSubmit(onValid)}>
            <Input
              {...register("search", { required: "검색어를 입력해주세요" })}
              transition={{ type: "leanear" }}
              animate={{ scaleX: searchClick ? 1 : 0 }}
              placeholder="영화 제목, 시리즈 제목"
            ></Input>
          </form>
        </SearchBar>
        <FontAwesomeIcon style={{ color: "white" }} size="lg" icon={faBell} />
      </Col>
    </Nav>
  );
}

export default Header;
