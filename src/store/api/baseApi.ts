import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://moneyfy-server.vercel.app/",
  // prepareHeaders: (headers, { getState }) => {
  //   const { userToken: token } = getState().user;

  //   if (token) {
  //     headers.set("authorization", token);
  //   }

  //   return headers;
  // },
});

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery,
  tagTypes: ["users"],
  endpoints: () => ({}),
});
