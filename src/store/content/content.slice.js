const { createSlice } = require("@reduxjs/toolkit");

const initialState = { listOfResult: [] };

const contentSlice = createSlice({
  name: "content",
  initialState,
  reducers: {
    setListOfResult: (state, { payload }) => {
      state.listOfResult = payload;
    },
  },
});

export const contentActions = contentSlice.actions;

export default contentSlice;
