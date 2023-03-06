import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { getSearchMovie, getSearchTv, ILastestTv } from "../api";
import { searchState } from "../atom";
import SearchMovie from "../Components/search/Search_movie";
import SearchTv from "../Components/search/Search_tv";

const SliderDiv = styled.div`
  height: 230px;
  color: white;
  font-size: 22px;
  margin-left: 20px;
`;

function Search() {
  const setSearchClick = useSetRecoilState(searchState);
  const { id } = useParams();

  const onSearchClick = () => {
    setSearchClick((prev) => false);
  };
  const movie = useQuery<ILastestTv>(["tv", "search"], () =>
    getSearchMovie(id + "")
  );
  const tv = useQuery<ILastestTv>(["tv", "search"], () => getSearchTv(id + ""));
  return (
    <>
      <div style={{ marginTop: 160 }} onClick={onSearchClick}>
        {movie.isLoading ? (
          <SliderDiv>Loading...</SliderDiv>
        ) : (
          <SliderDiv>
            <SearchMovie />
          </SliderDiv>
        )}
        {tv.isLoading ? (
          <SliderDiv>Loading...</SliderDiv>
        ) : (
          <SliderDiv>
            <SearchTv />
          </SliderDiv>
        )}
      </div>
    </>
  );
}
export default Search;
