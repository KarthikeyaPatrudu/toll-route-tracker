import { configureStore } from "@reduxjs/toolkit";
import routeReducer from "../features/route/routeSlice";
import vehicleReducer from "../features/vehicle/vehicleSlice";

export const store = configureStore({
  reducer: {
    route: routeReducer,
    vehicle: vehicleReducer,
  },
});