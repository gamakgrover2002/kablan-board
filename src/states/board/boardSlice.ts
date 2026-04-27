import { createSlice } from "@reduxjs/toolkit";;
import {  PayloadAction } from "@reduxjs/toolkit";
import { BoardColumn } from "../types";




const initialState: BoardColumn[] = [];

export const boardSlice = createSlice({
    name: "board",
    initialState,
    reducers: {
        addColumns: (state, action: PayloadAction<BoardColumn[]>) => {
            state.push(...action.payload);
        },
        removeColumn: (state, action: PayloadAction<string>) => {
            return state.filter((column) => column.id !== action.payload);
        },
        updateColumn: (state, action: PayloadAction<BoardColumn>) => {
            return state.map((column) =>
                column.id === action.payload.id ? action.payload : column
            );
        },
    },
});

export const { addColumns, removeColumn, updateColumn } = boardSlice.actions;
export default boardSlice.reducer;

export const selectBoard = (state) => state.board;
