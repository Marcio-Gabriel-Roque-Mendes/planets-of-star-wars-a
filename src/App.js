import React from 'react';
import './App.css';
import ProviderStarWars from './context/ProviderStarWars';
import TablePlanets from './pages/TablePlanets';

function App() {
  return (
    <ProviderStarWars>
      <TablePlanets />
    </ProviderStarWars>
  );
}

export default App;
