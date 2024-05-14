import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const testApi = createApi({
  reducerPath: "test",
  tagTypes: ["SomeTagType"], // Replace with actual tag types, or remove if not needed
  baseQuery: fetchBaseQuery({
    baseUrl: "https://rickandmortyapi.com/api",
    prepareHeaders: (headers) => {
      // Add any pre-flight logic for headers here. Remove if not needed.
      return headers;
    },
    credentials: "omit", // Set to 'omit' to exclude credentials on cross-origin requests
  }),
  endpoints: (builder) => ({}), // Define your endpoints here
});

// Export hooks for each endpoint when you define them
// export const { useYourEndpointQuery, useYourMutationMutation } = testApi;

export default testApi;
