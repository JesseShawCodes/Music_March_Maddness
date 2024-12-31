import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// https://redux-toolkit.js.org/rtk-query/usage/queries
export const jsonServerApi = createApi({
  reducerPath: 'jsonServerApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_SERVER,
  }),
  refetchOnMountOrArgChange: true,
  tagTypes: ['Artists'],
  endpoints: (builder) => ({
    getArtists: builder.query({
      query: (artist) => ({
        url: `/artist?q=${artist}`,
      }),
    }),
    getArtistInfo: builder.query({
      query: (artistId) => ({
        url: `/artist_page/${artistId}`,
      }),
    }),
  }),
});

export const { useGetArtistsQuery, useGetArtistInfoQuery } = jsonServerApi;
