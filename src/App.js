import React from 'react';
import { hot } from 'react-hot-loader';
import './App.css';
import ScoreBoard from './ScoreBoard/ScoreBoard';
import GameBoard from './GameBoard/GameBoard';
function App() {
  return (
    <div className='App'>
      <div className="app-header">
        <ScoreBoard score={1000} />
      </div>
      <div className='app-body'>
        <div className="app-body__board">
          <GameBoard difficulty="easy" />
        </div>
        <div className="app-body__controls">
          Controls
        </div>
      </div>
    </div>
  );
}

export default hot(module)(App);
