import { httpClient } from './httpClient';
import { OMDB_CONFIG } from './config';

type OmdbParams = Record<string, string | number | undefined>;

export const omdbRequest = async <T,>(params: OmdbParams): Promise<T> => {
  const response = await httpClient.get<T>(OMDB_CONFIG.BASE_URL, {
    params: {
      apikey: OMDB_CONFIG.API_KEY,
      ...params,
    },
  });

  const data: any = response.data;

  if (data.Response === 'False') {
    throw new Error(data.Error || 'OMDb request failed');
  }

  return data;
};
