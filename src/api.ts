const API_KEY = "a991768ffb1a0cc45b63baf59751ad0f";
const BASE_PATH = "https://api.themoviedb.org/3";

export interface IgetMoviesResults {
  adult: boolean;
  backdrop_path: string;
  id: number;
  original_title: string;
  overview: string;
  poster_path: string;
  title: string;
  vote_average: number;
  release_date: string;
}

export interface IgetSeriesResults {
  backdrop_path: string;
  first_air_date: string;
  id: number;
  name: string;
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
}

export interface IgetMovies {
  page: number;
  results: IgetMoviesResults[];
  total_pages: number;
  total_results: number;
  id: number;
}

export interface IgetSeries {
  page: number;
  results: IgetSeriesResults[];
  total_pages: number;
  total_results: number;
  id: number;
}

export interface ILastestTv {
  name?: string;
  poster_path?: string;
  backdrop_path?: string;
  next_episode_to_air?: {
    id: number;
    name: string;
    overview: string;
    air_date: string;
    episode_number: number;
  };
}

export function getMovies() {
  return fetch(
    `${BASE_PATH}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
  ).then((response) => response.json());
}

export function getTopRatedMovies() {
  return fetch(
    `${BASE_PATH}/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`
  ).then((response) => response.json());
}

export function getUpcomingMovies() {
  return fetch(
    `${BASE_PATH}/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`
  ).then((response) => response.json());
}

export function getLastestSeries() {
  return fetch(`${BASE_PATH}/tv/latest?api_key=${API_KEY}&language=en-US`).then(
    (response) => response.json()
  );
}

export function getTodaySeries() {
  return fetch(
    `${BASE_PATH}/tv/airing_today?api_key=${API_KEY}&language=en-US&page=1`
  ).then((response) => response.json());
}

export function getPopularSeries() {
  return fetch(
    `${BASE_PATH}/tv/popular?api_key=${API_KEY}&language=en-US&page=1`
  ).then((response) => response.json());
}

export function getTopSeries() {
  return fetch(
    `${BASE_PATH}/tv/top_rated?api_key=${API_KEY}&language=en-US&page=1`
  ).then((response) => response.json());
}

export function getSearchMovie(movieQuery: string) {
  return fetch(
    `${BASE_PATH}/search/movie?api_key=${API_KEY}&language=en-US&query=${movieQuery}&page=1&include_adult=false`
  ).then((response) => response.json());
}

export function getSearchTv(tvQuery: string) {
  return fetch(
    `${BASE_PATH}/search/tv?api_key=${API_KEY}&language=en-US&page=1&query=${tvQuery}&include_adult=false`
  ).then((response) => response.json());
}

export function getTvDetail(tvId: string) {
  return fetch(
    `${BASE_PATH}/tv/${tvId}?api_key=${API_KEY}&language=en-US`
  ).then((response) => response.json());
}

export function getMovieDetail(movieId: string) {
  return fetch(
    `${BASE_PATH}/movie/${movieId}?api_key=${API_KEY}&language=en-US`
  ).then((response) => response.json());
}
