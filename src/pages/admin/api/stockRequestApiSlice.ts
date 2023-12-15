import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { apiBaseUrl } from '../../../utils';

export interface StockRequest {
  _id: string;
  quantity: number;
  status: 'processing' | 'processed';
  admin_status: 'processing' | 'approved';
  created_date: string;
  product: Product;
}
interface Product {
  _id: string;
  product_name: string;
  in_stock_count: number;
}

const stockRequestApiSlice = createApi({
  reducerPath: 'stock-request',
  baseQuery: fetchBaseQuery({
    baseUrl: apiBaseUrl,
  }),
  tagTypes: ['StockRequests'],
  endpoints: (builder) => ({
    getStockRequests: builder.query<StockRequest[], { date: string }>({
      query: ({ date }) => `/requested-stocks/${date}`,
      providesTags: () => {
        return [{ type: 'StockRequests', id: 'LIST' }];
      },
    }),

    approveStockRequest: builder.mutation<
      StockRequest,
      { request_ids: string[] }
    >({
      query({ request_ids }) {
        return {
          url: '/approve-stock-request',
          method: 'PATCH',
          body: { request_ids },
        };
      },
      invalidatesTags: [{ type: 'StockRequests', id: 'LIST' }],
    }),
  }),
});

export const { useApproveStockRequestMutation, useGetStockRequestsQuery } =
  stockRequestApiSlice;
export default stockRequestApiSlice;
