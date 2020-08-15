import React from 'react';
import './App.css';
import Dashboard from './components/Dashboard/Dashboard';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import {
  faHeadSideVirus,
  faHeadSideMask,
  faHeadSideCough,
  faHeadSideCoughSlash,
  faRedo,
  faArrowAltCircleUp,
  faVirus,
  faProcedures,
  faBan,
} from '@fortawesome/free-solid-svg-icons';

library.add(
  fab,
  faRedo,
  faHeadSideVirus,
  faHeadSideMask,
  faHeadSideCough,
  faHeadSideCoughSlash,
  faVirus,
  faArrowAltCircleUp,
  faProcedures,
  faBan
);
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className={'body-bg-color'}>
          <Dashboard />
          <br />
        </div>
      </header>
    </div>
  );
}

export default App;
