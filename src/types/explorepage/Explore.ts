import { movieList } from "../redux/ActionModel";

export interface genres {
  id?: number;
  name?: string;
}

interface production_companies {
  id?: number;
  logo_path?: string;
  name?: string;
  origin_country?: string;
}
export interface production_countries {
  iso_3166_1?: string;
  name?: string;
}
interface spoken_languages {
  english_name?: string;
  iso_639_1?: string;
  name?: string;
}

export interface exploreData {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: null;
  budget: number;
  genres: genres[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  name?: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: production_companies[];
  production_countries: production_countries[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages?: spoken_languages[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  original_name: string;
  media?: string;
  last_air_date?: string;
}

export interface searchResultType {
  page: number;
  results: exploreData[];
  total_pages: number;
  total_results: number;
}

export interface searchMovixCardData {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: string;
  img: string;
  media?: string;
  media_type?: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  profile_img: string;
  release_date: string;
  title: string;
  video: false;
  vote_average: number;
  vote_count: number;
  profile_path?: string;
  original_name?: string;
  name?: string;
  first_air_date?: string;
}

export interface movixPersonData {
  adult: boolean;
  gender: number;
  id: number;
  img: string;
  known_for: searchMovixCardData[];
  known_for_department: string;
  media: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_img: string;
  profile_path: string;
  backdrop_path?: string;
  original_title?: string;
}

export interface latestTvShowData extends exploreData {
  img: string;
  genres: genres[];
  first_air_date: string;
}

export interface collectionShowData {
  backdrop_path: string;
  id: number;
  name: string;
  overview: string;
  parts: searchMovixCardData[];
  poster_path: string;
}

interface images {
  backdrop_sizes: string[];
  base_url: string;
  logo_sizes: string[];
  poster_sizes: string[];
  profile_sizes: string[];
  secure_base_url: string;
  still_sizes: string[];
}
export interface configurationType {
  change_keys: string[];
  images: images;
}

export interface personDetailType {
  adult: boolean;
  also_known_as: string[];
  biography: string;
  birthday: string;
  deathday: string;
  gender: number;
  homepage: any;
  id: number;
  imdb_id: string;
  known_for_department: string;
  name: string;
  place_of_birth: string;
  popularity: number;
  profile_path: string;
}


export interface movieCrediteType {
  cast: movieList[];
  crew: movieList[];
  id: number;
}