import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UIState } from "../types";

const initialState: UIState = {
  selectedCardId: null,
  isCreateModalOpen: false,
  isCreateColumnModalOpen: false,
  defaultColumnIdForNewCard: null,
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setSelectedCardId: (state, action: PayloadAction<string | null>) => {
      state.selectedCardId = action.payload;
    },
    openCreateModal: (state, action: PayloadAction<string | undefined>) => {
      state.isCreateModalOpen = true;
      state.defaultColumnIdForNewCard = action.payload || null;
    },
    closeCreateModal: (state) => {
      state.isCreateModalOpen = false;
      state.defaultColumnIdForNewCard = null;
    },
    openCreateColumnModal: (state) => {
      state.isCreateColumnModalOpen = true;
    },
    closeCreateColumnModal: (state) => {
      state.isCreateColumnModalOpen = false;
    },
  },
});

export const {
  setSelectedCardId,
  openCreateModal,
  closeCreateModal,
  openCreateColumnModal,
  closeCreateColumnModal,
} = uiSlice.actions;

export default uiSlice.reducer;
