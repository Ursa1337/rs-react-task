import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { PokemonDescription, SearchResult } from '../models';

interface RTKSearchType {
  request: string;
  search: string;
  count: number;
  currentPage: number;
}

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2' }),
  endpoints: (builder) => ({
    getPokemonByName: builder.query<PokemonDescription, string>({
      query: (name: string) => `pokemon/${name}`,
    }),
    getPokemon: builder.query<SearchResult, RTKSearchType>({
      query: (params: RTKSearchType) => params.request,
      transformResponse: (rawData: SearchResult, _, args) => {
        return {
          ...rawData,
          results: rawData.results.filter((v) => 
            v.name.includes(args.search)
          ).slice(
            args.count * args.currentPage,
            args.count * (args.currentPage + 1),
          )
        }
      },
    }),
  }),
});

export const { useGetPokemonByNameQuery, useGetPokemonQuery } = pokemonApi;