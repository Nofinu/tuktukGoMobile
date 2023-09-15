import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "../Data/AuthSlice";


export const store = configureStore({
  reducer:{
    auth:AuthSlice
  }
})