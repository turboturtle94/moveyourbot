import React, { useEffect, useRef, useState, useMemo } from 'react';
import './GameBoard.css';
import PropTypes from "prop-types"
import gameBoardConstants from "./constants.json";
import robotIcon from "./assets/robot.png";
import Bot from "../Bot/Bot"
import PubSub from '../EventPubSub/PubSub';
function GameBoard(props) {
    const { difficulty, startingIndex, endIndex, pubSub } = props;
    const boardContainer = useRef(null);
    const [boardLayout, setBoardLayout] = useState("");
    const bot = useMemo(() => {
        return new Bot(startingIndex, endIndex);
    }, [])
    const classNames = useMemo(() => ["game-board", "game-board--" + difficulty].join(" "), []);

    const positionBot = (currentCoords, prevCoords) => {
        let newBotIndex = (currentCoords.xCoord * gameBoardConstants[difficulty]) + currentCoords.yCoord;
        let currentBotIndex = (prevCoords.xCoord * gameBoardConstants[difficulty]) + prevCoords.yCoord;
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

    const moveBot = (event) => {
        bot.moveBot(event.direction);
        positionBot(bot.getCurrentPosition(), bot.getPrevPosition())
    }

    useEffect(() => {
        const unSub = pubSub.subscribe("MOVE_BOT", moveBot);
        return () => {
            unSub.unsubscribe();
        }
    }, [])
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





    return (<div ref={boardContainer} className={classNames} >{boardLayout}</div>)
}


GameBoard.propTypes = {
    difficulty: PropTypes.string.isRequired,
    startingIndex: PropTypes.number.isRequired,
    endIndex: PropTypes.number.isRequired,
    pubSub: PropTypes.instanceOf(PubSub)
}

export default GameBoard;
