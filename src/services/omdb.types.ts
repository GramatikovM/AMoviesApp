import { MovieDetails } from '@/types/movieTypes';

export type OmdbContentType = 'movie' | 'series' | 'episode';

export type OmdbMovieShort = {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  Type: OmdbContentType;
};

export type OmdbErrorResponse = {
  Response: 'False';
  Error: string;
};

export type OmdbSuccessResponse<TPayload> = TPayload & {
  Response: 'True';
};

export type OmdbApiResponse<TPayload> =
  | OmdbSuccessResponse<TPayload>
  | OmdbErrorResponse;

export type OmdbSearchPayload = {
  Search: OmdbMovieShort[];
  totalResults: string;
};

export type OmdbSearchResponse = OmdbApiResponse<OmdbSearchPayload>;
export type OmdbMovieDetailsResponse = OmdbApiResponse<MovieDetails>;
