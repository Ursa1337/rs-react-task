import { ReactNode, createContext, useState } from 'react';
import { ResultItem } from '../models';

export interface SearchContextType {
  items: ResultItem[];
  itemsCount: number;
  id: number;
  count: number;
  detail: number;
  currentPage: number;
  loading: boolean;
  search: string;
}

export const SearchContextInitial: SearchContextType = {
  items: [],
  itemsCount: 0,
  id: 0,
  count: 0,
  detail: 0,
  currentPage: 0,
  loading: false,
  search: '',
};

export const SearchContext = createContext<{
  state: SearchContextType;
  dispatch: React.Dispatch<React.SetStateAction<SearchContextType>>;
} | undefined>(undefined);

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useState(SearchContextInitial);

  return (
    <SearchContext.Provider value={{ state, dispatch }}>
      {children}
    </SearchContext.Provider>
  );
};