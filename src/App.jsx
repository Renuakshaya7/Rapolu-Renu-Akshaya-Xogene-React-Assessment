// eslint-disable-next-line no-unused-vars
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Search from './components/Search';
import DrugDetails from './components/DrugDetails';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <img 
            src="https://media.licdn.com/dms/image/D4D0BAQEc3Q21_3taqg/company-logo_200_200/0/1665150838923/xogene_logo?e=2147483647&v=beta&t=yz6_g0c77uK2SLB38b8nocucHkJidkW7MHnxoeJXkJo" 
            alt="Logo" 
            className="App-logo" 
          />
          <h2>SEARCH DRUGS</h2>
        </header>
        <div className="search-container">
          <h2>Search for drugs!</h2>
          <Search />
        </div>
        <Routes>
          <Route path="/drugs/:drugName" element={<DrugDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
