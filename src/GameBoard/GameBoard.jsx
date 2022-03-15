import React, { useEffect, useRef, useState, useMemo } from 'react';
import './GameBoard.css';
import PropTypes from "prop-types"
import gameBoardConstants from "./constants.json";
import robotIcon from "./assets/robot.png";
import finishIcon from "./assets/finish.png";
import Bot from "../Bot/Bot"
import PubSub from '../EventPubSub/PubSub';
function GameBoard(props) {
    const { difficulty, startingCoords, endingCoords, pubSub } = props;
    const boardContainer = useRef(null);
    const [boardLayout, setBoardLayout] = useState("");
    const bot = useMemo(() => {
        return new Bot(startingCoords[0], startingCoords[1]);
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
            let currentWeight = boardContainer.current.children[currentBotIndex].lastElementChild;
            currentBot.className += " bot--animate--out";
            currentBot.style.display = "none";
            currentWeight.style.display = "none";
        }
    }

    const moveBot = (event) => {
        bot.moveBot(event.direction);
        positionBot(bot.getCurrentPosition(), bot.getPrevPosition())
    }

    const getCellWeight = () => {
        const operators = ["+", "-", "*"];
        const opIndex = Math.floor(Math.random() * operators.length);
        const weight = Math.ceil(Math.random() * 10);
        return operators[opIndex] + "" + weight;
    }

    const getCellLayout = (xCoord, yCoord, id) => {
        if (xCoord === startingCoords[0] && yCoord === startingCoords[1])
        {
            return React.createElement("div", {
                key: id,
                className: "game-cell"
            }, <React.Fragment>
                <img src={robotIcon} className='bot' />
                <label className="game-cell__label" style={{ display: "none" }}>
                    {getCellWeight()}
                </label>
            </React.Fragment>)
        } else if (xCoord === endingCoords[0] && yCoord === endingCoords[1])
        {
            return React.createElement("div", {
                key: id,
                className: "game-cell"
            }, <React.Fragment>
                <img src={finishIcon} className='finish-cell' />
            </React.Fragment>);
        } else
        {
            return React.createElement("div", {
                key: id,
                className: "game-cell"
            }, <React.Fragment>
                <img src={robotIcon} className='bot' style={{ display: "none" }} />
                <label className="game-cell__label">{getCellWeight()}</label>
            </React.Fragment>);
        }
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
            for (let i = 0; i < gameBoardConstants[difficulty]; i++)
            {
                for (let j = 0; j < gameBoardConstants[difficulty]; j++)
                {
                    layout.push(getCellLayout(i, j, ++count));
                }
            }
            setBoardLayout(layout);
        }
    }, [boardContainer]);





    return (<div ref={boardContainer} className={classNames} >{boardLayout}</div>)
}


GameBoard.propTypes = {
    difficulty: PropTypes.string.isRequired,
    startingCoords: PropTypes.arrayOf(Number),
    endingCoords: PropTypes.arrayOf(Number),
    pubSub: PropTypes.instanceOf(PubSub)
}

export default GameBoard;
