export interface MovieListModel {
  movieList?: movieList[] | null;
  paginationNumber?:number;
  resultValue?:string
}

 export interface movieList {
   adult?: boolean;
   backdrop_path: string;
   genre_ids?: number[];
   id?: number;
   img?: string;
   media_type?: string;
   original_language?: string;
   original_title?: string;
   overview?: string;
   popularity?: number;
   poster_path?: string;
   release_date?: Date;
   title?: string;
   video?: boolean;
   vote_average?: number | undefined;
   vote_count?: number;
   name?: string;
   profile_path?:string
   profile_img?:string
 }