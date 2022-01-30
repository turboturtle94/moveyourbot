import React from 'react';
import './GameBoard.css';
import PropTypes from "prop-types"
function GameBoard(props) {
    const { difficulty } = props;
    return <div className='game-board' />
}

GameBoard.propTypes = {
    difficulty: PropTypes.string.isRequired
}

export default GameBoard;
