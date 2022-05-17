import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Store from '@/pages/store';
import Detail from '@/pages/detail';
import Ranking from '@/pages/ranking';
import Shelf from '@/pages/shelf';
import Reader from '@/pages/chapter';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/store" element={<Store />} />
        <Route path="/shelf" element={<Shelf />} />
        <Route path="/ranking" element={<Ranking />} />
        <Route path="/book">
          <Route path=":bookId" element={<Detail />}>
            <Route path=":chapterId" element={<Reader />} />
          </Route>
          <Route index element={<Ranking />} />
        </Route>
        <Route path="*" element={<Navigate to="/store" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
