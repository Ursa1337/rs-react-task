import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { NotFound, SearchView } from './pages';
import { DetailBlock, ErrorBoundary } from './components';
import './App.css'
import { ErrorPage } from './pages/ErrorPage';

const ErrorBoundaryWrapper = () => {
  const navigation = useNavigate();
  return (
    <ErrorBoundary
      navigate={navigation}
    >
      <Routes>
        <Route path='*' element={<NotFound />} />
        <Route path='/' element={<SearchView />} />
        <Route path='/:search/' element={<SearchView />}>
          <Route path=':id' element={<DetailBlock />} />
        </Route>
        <Route path='/error' element={<ErrorPage />}></Route>
      </Routes>
    </ErrorBoundary>
  )
}

export const App = () => {
  return (
    <BrowserRouter>
      <ErrorBoundaryWrapper />
    </BrowserRouter>
  )
}