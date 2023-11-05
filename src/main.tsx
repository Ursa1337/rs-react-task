import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import RightBlock from './rightBlock/rightBlock';
import ErrorBoundary from './ErrorBoundary/ErrorBoundary';
import './index.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ErrorBoundary>
        <Routes>
          <Route path="" element={<Navigate to="/pikachu" />} />
          <Route path="/:search/" element={<App />}>
            <Route path=":id" element={<RightBlock />} />
          </Route>
        </Routes>
      </ErrorBoundary>
    </BrowserRouter>
  </React.StrictMode>
);
