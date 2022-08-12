import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const walletApi = createApi({
  reducerPath: 'walletApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://62f62310612c13062b472f4d.mockapi.io/',
  }),

  tagTypes: ['Cards', 'Cash'],
  endpoints: builder => ({
    getCards: builder.query({
      query: () => `cards`,
      providesTags: result =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Cards', id })),
              { type: 'Cards', id: 'LIST' },
            ]
          : [{ type: 'Cards', id: 'LIST' }],
    }),
    addCards: builder.mutation({
      query: body => ({
        url: 'cards',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Cards', id: 'LIST' }],
    }),
    deleteCards: builder.mutation({
      query: id => ({
        url: `cards/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Cards', id: 'LIST' }],
    }),
    updateCards: builder.mutation({
      query(data) {
        console.log(data);
        const { id, ...body } = data;
        console.log(id);
        console.log(body);
        return {
          url: `cards/${id}`,
          method: 'PUT',
          body,
        };
      },
      invalidatesTags: [{ type: 'Cards', id: 'LIST' }],
    }),

    getCash: builder.query({
      query: () => `cash`,
      providesTags: result =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Cash', id })),
              { type: 'Cash', id: 'LIST' },
            ]
          : [{ type: 'Cash', id: 'LIST' }],
    }),
    addCash: builder.mutation({
      query: body => ({
        url: 'cash',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Cash', id: 'LIST' }],
    }),
    deleteCash: builder.mutation({
      query: id => ({
        url: `cash/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Cash', id: 'LIST' }],
    }),
    updateCash: builder.mutation({
      query(data) {
        const { id, ...body } = data;
        return {
          url: `cash/${id}`,
          method: 'PUT',
          body,
        };
      },
      invalidatesTags: [{ type: 'Cash', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetCardsQuery,
  useGetCashQuery,
  useAddCardsMutation,
  useAddCashMutation,
  useDeleteCardsMutation,
  useDeleteCashMutation,
  useUpdateCardsMutation,
  useUpdateCashMutation,
} = walletApi;
