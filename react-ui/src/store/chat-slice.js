import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    dataSources: [],
    selectedDataSource: null,
    dataSourceID: null,
    sample_questions: [],
  },
  reducers: {
    setDataSources(state, action) {
      state.dataSources = action.payload;
    },
    setSelectedDataSource(state, action) {
      state.selectedDataSource = action.payload;
    },
    setDataSourceId(state, action) {
      state.dataSourceID = action.payload;
    },
    setSampleQuestions(state, action) {
      state.sample_questions = action.payload;
    },
  },
});

export const chatActions = chatSlice.actions;
export { chatSlice };
