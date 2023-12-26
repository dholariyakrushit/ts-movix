import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { MovieListModel, movieList } from "../../types/redux/ActionModel";

const initialState: MovieListModel = {
  movieList: null,
  paginationNumber: 1,
  resultValue: "multi",
};

export const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    setMovieList: (
      state = initialState,
      action: PayloadAction<movieList[]>
    ) => {
      state.movieList = action.payload;
    },
    setPaginationNumber: (
      state = initialState,
      action: PayloadAction<number>
    ) => {
      state.paginationNumber = action.payload;
    },
    setResultValue: (state = initialState, action: PayloadAction<string>) => {
      state.resultValue = action.payload;
    },
  },
});

export const { setMovieList, setPaginationNumber, setResultValue } =
  homeSlice.actions;

export default homeSlice.reducer;
