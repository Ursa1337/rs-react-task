import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { NotFound, SearchView } from './pages';
import { DetailBlock, ErrorBoundary } from './components';
import './App.css'
import { ErrorPage } from './pages/ErrorPage';

export const App = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Routes>
          <Route path='*' element={<NotFound />} />
          <Route path='/' element={<SearchView />} />
          <Route path='/:search/' element={<SearchView />}>
            <Route path=':id' element={<DetailBlock />} />
          </Route>
          <Route path='/error' element={<ErrorPage />}></Route>
        </Routes>
      </ErrorBoundary>
    </BrowserRouter>
  )
}