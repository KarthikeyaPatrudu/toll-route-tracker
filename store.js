import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  vehicles: [],
  selectedVehicle: null,
};

const vehicleSlice = createSlice({
  name: "vehicle",
  initialState,
  reducers: {
    setVehicles: (state, action) => {
      state.vehicles = action.payload;
    },
    setSelectedVehicle: (state, action) => {
      state.selectedVehicle = action.payload;
    },
  },
});

export const { setVehicles, setSelectedVehicle } =
  vehicleSlice.actions;

export default vehicleSlice.reducer;