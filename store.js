import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  included: [],
  excluded: [],
  distance: 0,
  avgSpeed: 0,
};

const routeSlice = createSlice({
  name: "route",
  initialState,
  reducers: {
    setRouteData: (state, action) => {
      state.included = action.payload.included;
      state.excluded = action.payload.excluded;
    },
    setRouteStats: (state, action) => {
      state.distance = action.payload.distance;
      state.avgSpeed = action.payload.avgSpeed;
    },
    clearRoute: (state) => {
      state.included = [];
      state.excluded = [];
      state.distance = 0;
      state.avgSpeed = 0;
    },
  },
});

export const { setRouteData, setRouteStats, clearRoute } =
  routeSlice.actions;

export default routeSlice.reducer;