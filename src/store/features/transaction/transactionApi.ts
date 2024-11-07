import { baseApi } from "../../api/baseApi";

const transactionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    sendMoney: builder.mutation({
      query: ({ amount, receiver }) => {
        const token = localStorage.getItem("token");
        return {
          url: `/api/send-or-make-payment`,
          method: "POST",
          headers: {
            Authorization: token,
          },
          body: { amount, transactionType: "send-money", receiver },
        };
      },
      invalidatesTags: ["balance"],
    }),

    addMoney: builder.mutation({
      query: ({ amount }) => {
        const token = localStorage.getItem("token");
        return {
          url: `/api/add-money`,
          method: "POST",
          headers: {
            Authorization: token,
          },
          body: { amount },
        };
      },
      invalidatesTags: ["balance"],
    }),
    checkBalance: builder.mutation({
      query: () => {
        const token = localStorage.getItem("token");
        return {
          url: `/api/get-balance`,
          method: "GET",
          headers: {
            Authorization: token,
          },
        };
      },
      invalidatesTags: ["balance"],
    }),
    getTransactionsHistory: builder.mutation({
      query: () => {
        const token = localStorage.getItem("token");
        return {
          url: `/api/user-transactions`,
          method: "GET",
          headers: {
            Authorization: token,
          },
        };
      },
      invalidatesTags: ["balance"],
    }),
  }),
});

export const {
  useSendMoneyMutation,
  useGetTransactionsHistoryMutation,
  useAddMoneyMutation,
  useCheckBalanceMutation,
} = transactionApi;

// import { baseApi } from "../../api/baseApi";

// const userApi = baseApi.injectEndpoints({
//   endpoints: (builder) => ({
//     makeTransaction: builder.mutation({
//       query: (transactionData) => ({
//         url: "/api/make-transaction",
//         method: "POST",
//         body: transactionData,
//       }),
//       invalidatesTags: ["balance"],
//     }),
//     getTransactionsHistory: builder.query({
//       query: (username) => ({
//         url: `/api/get-transactions/${username}`,
//         method: "GET",
//       }),
//       providesTags: ["balance"],
//     }),
//     addMoney: builder.mutation({
//       query: () => {
//         const token = localStorage.getItem("token");
//         return {
//           url: `/api/add-money`,
//           method: "POST",
//           body: { token },
//         };
//       },
//       invalidatesTags: ["balance"],
//     }),
//   }),
// });

// export const {
//   useMakeTransactionMutation,
//   useGetTransactionsHistoryQuery,
//   useAddMoneyMutation,
// } = userApi;
