import React, { useEffect, useRef, useState, useMemo, createRef } from 'react';
import './GameBoard.css';
import PropTypes from "prop-types"
import gameBoardConstants from "./constants.json";
import robotIcon from "./assets/robot.png"
function GameBoard(props) {
    const { difficulty, startingIndex, endIndex } = props;
    const boardContainer = useRef(null);
    const [boardLayout, setBoardLayout] = useState("");
    const [currentPosition, setCurrentPosition] = useState({
        xCoord: startingIndex,
        yCoord: endIndex
    })
    const classNames = useMemo(() => ["game-board", "game-board--" + difficulty].join(" "), [])
    useEffect(() => {
        if (boardContainer.current)
        {
            let layout = [];
            let count = 0;
            let gameCell = null;
            for (let i = 0; i < gameBoardConstants[difficulty]; i++)
            {
                for (let j = 0; j < gameBoardConstants[difficulty]; j++)
                {
                    gameCell = i === startingIndex && j === endIndex ? React.createElement("div", {
                        key: ++count,
                        className: "game-cell"
                    }, <img src={robotIcon} className='bot' />) : React.createElement("div", {
                        key: ++count,
                        className: "game-cell"
                    }, <img src={robotIcon} className='bot' style={{ display: "none" }} />);
                    layout.push(gameCell);
                }
            }
            setBoardLayout(layout);
        }
    }, [boardContainer]);
    const positionBot = (xCoord, yCoord) => {
        let newBotIndex = (xCoord * gameBoardConstants[difficulty]) + yCoord;
        let currentBotIndex = (currentPosition.xCoord * gameBoardConstants[difficulty]) + currentPosition.yCoord;
        if (boardContainer.current && boardContainer.current.children)
        {
            let newBot = boardContainer.current.children[newBotIndex].firstElementChild;
            newBot.style.display = "block";
            newBot.className += " bot--animate--in";
            let currentBot = boardContainer.current.children[currentBotIndex].firstElementChild;
            currentBot.className += " bot--animate--out";
            currentBot.style.display = "none";
        }
    }
    return (<div ref={boardContainer} className={classNames} >{boardLayout}</div>)
}


GameBoard.propTypes = {
    difficulty: PropTypes.string.isRequired,
    startingIndex: PropTypes.number.isRequired,
    endIndex: PropTypes.number.isRequired

}

export default GameBoard;
