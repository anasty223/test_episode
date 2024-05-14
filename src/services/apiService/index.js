import { createApi } from "@reduxjs/toolkit/query/react";

export const testApi = createApi({
  reducerPath: "test",
  tagTypes: [],
  endpoints: (builder) => ({}),
});
