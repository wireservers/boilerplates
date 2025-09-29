import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export type Product = {
  id: number;
  sku: string;
  name: string;
  price: number;
  createdUtc: string;
};
export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/" }),
  tagTypes: ["Products"],
  endpoints: (b) => ({
    list: b.query<Product[], void>({
      query: () => "products",
      providesTags: ["Products"],
    }),
    create: b.mutation<Product, Partial<Product>>({
      query: (body) => ({ url: "products", method: "POST", body }),
      invalidatesTags: ["Products"],
    }),
  }),
});
export const { useListQuery, useCreateMutation } = productsApi;
