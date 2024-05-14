import { testApi } from "./apiService";
import { axiosService } from "./apiService/axiosService";

const testTaskService = testApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllEpisodes: builder.query({
      queryFn: async ({ incomeData }, { dispatch }) => {
        try {
          const { data } = await axiosService.get("/character", {
            params: incomeData,
          });
          console.log(data);
          if (data?.success) {
            dispatch(contentActions.setListOfResult(data));
          }
          return { data };
        } catch (error) {
          return { error: error?.message || "An error occurred." };
        }
      },
    }),
  }),
  overrideExisting: false,
});

export const { useLazyGetAllEpisodesQuery } = testTaskService;

export default testTaskService;
