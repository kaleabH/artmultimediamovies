import { createSlice } from "@reduxjs/toolkit";

export const AdminSideBarSlice = createSlice({
  name: "AdminSideBar",
  initialState: {
    buttonsList: [],
  },
  reducers: {
    setMainList: (state) => {
      state.buttonsList = ["add movie", "add series", "add audiobook"];
    },
    setMovieDetailList: (state) => {
      state.buttonsList = ["remove movie"];
    },
    setSeriesDetailList: (state) => {
      state.buttonsList = ["remove series", "add episode", "remove episode"];
    },
  },
});

export const { setMainList, setMovieDetailList, setSeriesDetailList } =
  AdminSideBarSlice.actions;

export default AdminSideBarSlice.reducer;
