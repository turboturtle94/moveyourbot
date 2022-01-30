import React from 'react';
import './ScoreBoard.css';
import PropTypes from "prop-types"
function ScoreBoard(props) {
    const { score } = props;
    return <div className='score-board'><h1 className='score-board__h1'>{score}</h1></div>;
}

ScoreBoard.propTypes = {
    score: PropTypes.number.isRequired
}

export default ScoreBoard;
