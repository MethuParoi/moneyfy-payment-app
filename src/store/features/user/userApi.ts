import { use } from "react";
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
    createConversation: builder.mutation({
      query: (conversationData) => {
        const token = localStorage.getItem("token");

        return {
          url: "/api/create-conversation",
          method: "POST",
          headers: {
            Authorization: token,
          },
          body: conversationData,
        };
      },
    }),

    checkConversation: builder.mutation({
      query: ({ conversationId }) => {
        const token = localStorage.getItem("token");

        return {
          url: `/api/check-conversation/${conversationId}`,
          method: "GET",
          headers: {
            Authorization: token,
          },
        };
      },
    }),
    getMessages: builder.mutation({
      query: ({ conversationId }) => {
        const token = localStorage.getItem("token");

        return {
          url: `/api/messages/${conversationId}`,
          method: "GET",
          headers: {
            Authorization: token,
          },
        };
      },
    }),
    sendMessages: builder.mutation({
      query: ({ conversationId, receiver, message }) => {
        const token = localStorage.getItem("token");

        return {
          url: `/api/create-message`,
          method: "POST",
          headers: {
            Authorization: token,
          },
          body: {
            conversationId,
            receiver,
            message,
          },
        };
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetBalanceQuery,
  useGetAllUserMutation,
  useCreateConversationMutation,
  useCheckConversationMutation,
  useGetMessagesMutation,
  useSendMessagesMutation,
} = userApi;
