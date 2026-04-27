import { configureStore } from '@reduxjs/toolkit';
import { boardSlice } from './board/boardSlice';

export default configureStore({
  reducer: {
    board: boardSlice.reducer,
  },
});
