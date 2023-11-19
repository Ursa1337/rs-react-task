import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ResultItem } from '../models';

export interface SearchType {
  items: ResultItem[];
  itemsCount: number;
  id: number;
  count: number;
  detail: number;
  currentPage: number;
  loading: boolean;
  request: string;
}

export const initialState: SearchType = {
  items: [],
  itemsCount: 0,
  id: 0,
  count: 0,
  detail: 0,
  currentPage: 0,
  loading: false,
  request: '',
};

const searchSlice = createSlice({
  name: 'search',
  initialState: initialState,
  reducers: {
    set: (state, action: PayloadAction<Partial<SearchType>>) => {
      return { ...state, ...action.payload };
    }
  }
});

export const { set } = searchSlice.actions;

export default searchSlice.reducer;
