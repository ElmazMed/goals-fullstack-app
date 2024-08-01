import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/AuthSlice";
import goalsReducer from "../features/GoalSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    goals: goalsReducer,
  },
});
