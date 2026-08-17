import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FilterState, IssuePriority, CardTag } from "../types";

const initialState: FilterState = {
  searchQuery: "",
  priorityFilter: "all",
  tagFilter: "all",
  assigneeFilter: "all",
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setPriorityFilter: (state, action: PayloadAction<IssuePriority | "all">) => {
      state.priorityFilter = action.payload;
    },
    setTagFilter: (state, action: PayloadAction<CardTag | "all">) => {
      state.tagFilter = action.payload;
    },
    setAssigneeFilter: (state, action: PayloadAction<string | "all">) => {
      state.assigneeFilter = action.payload;
    },
    resetFilters: (state) => {
      state.searchQuery = "";
      state.priorityFilter = "all";
      state.tagFilter = "all";
      state.assigneeFilter = "all";
    },
  },
});

export const {
  setSearchQuery,
  setPriorityFilter,
  setTagFilter,
  setAssigneeFilter,
  resetFilters,
} = filterSlice.actions;

export default filterSlice.reducer;
