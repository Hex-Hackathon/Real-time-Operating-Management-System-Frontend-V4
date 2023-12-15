import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { apiBaseUrl } from '../../../utils';
import { RequestedMaterial } from '../../../components/admin/MaterialTable';

const materialRequestApi = createApi({
  reducerPath: 'materialRequestApi',
  baseQuery: fetchBaseQuery({
    baseUrl: apiBaseUrl,
  }),
  tagTypes: ['Materials'],
  endpoints: (builder) => ({
    getAllMaterialRequests: builder.query<
      RequestedMaterial[],
      { date: string }
    >({
      query: ({ date }) => `/requested-materials/${date}`,
      providesTags: () => {
        return [{ type: 'Materials', id: 'LIST' }];
      },
    }),

    approveMaterialRequest: builder.mutation<
      RequestedMaterial,
      { request_ids: string[] }
    >({
      query({ request_ids }) {
        return {
          url: '/approve-material-requests',
          method: 'PATCH',
          body: { request_ids },
        };
      },
      invalidatesTags: [{ type: 'Materials', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetAllMaterialRequestsQuery,
  useApproveMaterialRequestMutation,
} = materialRequestApi;
export default materialRequestApi;
