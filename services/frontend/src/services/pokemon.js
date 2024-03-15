// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'http://localhost:3000/' 
  }),
  tagTypes: ['Post'],
  endpoints: (build) => ({
    getPokemonByName: build.query({
      query: (name) => `api/music/search/${name}`,
    })
  }),
})

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { useGetPokemonByNameQuery } = api


/*
Redux Toolkit: Queries
https://redux-toolkit.js.org/rtk-query/usage/queries

*/