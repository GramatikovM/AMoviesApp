import { httpClient } from './httpClient';
import { OMDB_CONFIG } from './config';
import {
  OmdbApiResponse,
  OmdbErrorResponse,
  OmdbSuccessResponse,
} from './omdb.types';

type OmdbParams = Record<string, string | number | undefined>;

const assertSuccess = <TPayload>(
  response: OmdbApiResponse<TPayload>,
): response is OmdbSuccessResponse<TPayload> => response.Response === 'True';

export const omdbRequest = async <TPayload,>(
  params: OmdbParams,
): Promise<TPayload> => {
  const response = await httpClient.get<OmdbApiResponse<TPayload>>(
    OMDB_CONFIG.BASE_URL,
    {
      params: {
        apikey: OMDB_CONFIG.API_KEY,
        ...params,
      },
    },
  );

  const data = response.data;

  if (!assertSuccess(data)) {
    const error = (data as OmdbErrorResponse).Error ?? 'OMDb request failed';
    throw new Error(error);
  }

  return data;
};
