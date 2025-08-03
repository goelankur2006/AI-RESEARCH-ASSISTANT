import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './Layout/MainLayout';
import PapersLayout from './Layout/PapersLayout';

import Home from './pages/Home/Home';
import AllResearchPapers from './pages/AllReseachPapers/AllResearchPapers';
import Chat from './pages/Chats/Chats';
import MyContribution from './pages/Mycontributions/MyContributions';

const App = () => {
  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/chats" element={<Chat />} />
          <Route path="/mycontribution" element={<MyContribution/>} />
        </Route>
        <Route element={<PapersLayout />}>
          <Route path="/allresearchpapers" element={<AllResearchPapers />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
