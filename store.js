import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedVehicle: null,

  // route data
  includedPoints: [],
  excludedPoints: [],

  // stats
  totalDistance: 0,
  avgSpeed: 0,

  // filters (future ready)
  filters: {
    fromDate: null,
    fromTime: null,
    toDate: null,
    toTime: null
  },

  loading: false
};

const trackerSlice = createSlice({
  name: "tracker",
  initialState,

  reducers: {
    setSelectedVehicle: (state, action) => {
      state.selectedVehicle = action.payload;
    },

    setRouteData: (state, action) => {
      state.includedPoints = action.payload.included;
      state.excludedPoints = action.payload.excluded;
    },

    setRouteStats: (state, action) => {
      state.totalDistance = action.payload.distance;
      state.avgSpeed = action.payload.avgSpeed;
    },

    setFilters: (state, action) => {
      state.filters = action.payload;
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    clearTracker: (state) => {
      return initialState;
    }
  }
});

export const {
  setSelectedVehicle,
  setRouteData,
  setRouteStats,
  setFilters,
  setLoading,
  clearTracker
} = trackerSlice.actions;

export default trackerSlice.reducer;