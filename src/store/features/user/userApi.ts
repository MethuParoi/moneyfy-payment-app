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
    getAllUser: builder.query({
      query: () => ({
        url: `/api/users`,
        method: "GET",
      }),
      providesTags: ["users"],
    }),
    createConversation: builder.mutation({
      query: (data) => ({
        url: "/api/create-conversation",
        method: "POST",
        body: data,
      }),
    }),
    checkConversation: builder.query({
      query: (receiverId) => ({
        url: `/api/check-conversation/${receiverId}`,
        method: "GET",
      }),
    }),
    getMessages: builder.query({
      query: (conversationId) => ({
        url: `/api/messages/${conversationId}`,
        method: "GET",
      }),
      providesTags: ["messages"],
    }),
    createMessage: builder.mutation({
      query: (data) => ({
        url: "/api/create-message",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["messages"],
    }),

    pinInfo: builder.query({
      query: () => ({
        url: "/api/pin-info",
        method: "GET",
      }),
    }),
    setPin: builder.mutation({
      query: (data) => ({
        url: "/api/set-pin",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["pin"],
    }),
    updatePin: builder.mutation({
      query: (data) => ({
        url: "/api/update-pin",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["pin"],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetBalanceQuery,
  useGetAllUserQuery,
  useCreateConversationMutation,
  useLazyCheckConversationQuery,
  useGetMessagesQuery,
  useCreateMessageMutation,
  useSetPinMutation,
  useUpdatePinMutation,
  usePinInfoQuery,
} = userApi;
