import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import boardReducer from "./board/boardSlice";
import filterReducer from "./filter/filterSlice";
import uiReducer from "./ui/uiSlice";

export const store = configureStore({
  reducer: {
    board: boardReducer,
    filter: filterReducer,
    ui: uiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Custom typed hooks for use throughout the application
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
