import { baseApi } from "../../api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (loginData) => ({
        url: "/api/login",
        method: "POST",
        body: loginData,
      }),
    }),
    register: builder.mutation({
      query: (registerData) => ({
        url: "/api/register",
        method: "POST",
        body: registerData,
      }),
    }),
    getBalance: builder.query({
      query: (email) => ({
        url: `/api/get-balance/${email}`,
        method: "GET",
      }),
      providesTags: ["balance"],
    }),
    getAllUser: builder.mutation({
      query: () => {
        const token = localStorage.getItem("token");
        return {
          url: `/api/users`,
          method: "GET",
          headers: {
            Authorization: token,
          },
        };
      },
      invalidatesTags: ["users"],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetBalanceQuery,
  useGetAllUserMutation,
} = userApi;
