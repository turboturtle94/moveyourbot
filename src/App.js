import React, { useMemo } from 'react';
import { hot } from 'react-hot-loader';
import './App.css';
import ScoreBoard from './ScoreBoard/ScoreBoard';
import GameBoard from './GameBoard/GameBoard';
import PubSub from './EventPubSub/PubSub';
function App() {
  const pubSub = useMemo(() => {
    return new PubSub();
  }, [])
  return (
    <div className='App'>
      <div className="app-header">
        <ScoreBoard score={1000} />
      </div>
      <div className='app-body'>
        <div className="app-body__board">
          <GameBoard difficulty="easy" startingCoords={[0, 3]} endingCoords={[4, 4]} pubSub={pubSub} />
        </div>
        <div className="app-body__controls">
          Controls
        </div>
      </div>
    </div>
  );
}

export default hot(module)(App);
