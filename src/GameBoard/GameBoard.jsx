import React, { useEffect, useRef, useState, useMemo } from 'react';
import './GameBoard.css';
import PropTypes from "prop-types"
import gameBoardConstants from "./constants.json";
import robotIcon from "./assets/robot.png"
function GameBoard(props) {
    const { difficulty } = props;
    const boardContainer = useRef(null);
    const [boardLayout, setBoardLayout] = useState("");
    const classNames = useMemo(() => ["game-board", "game-board--" + difficulty].join(" "), [])
    useEffect(() => {
        if (boardContainer.current)
        {
            let layout = [];
            let count = 0;
            for (let i = 0; i < gameBoardConstants[difficulty]; i++)
            {
                for (let j = 0; j < gameBoardConstants[difficulty]; j++)
                {

                    layout.push(React.createElement("div", {
                        key: ++count,
                        className: "game-cell"
                    }, <img src={robotIcon} className='bot' />));
                }
            }
            setBoardLayout(layout);
        }
    }, [boardContainer])

    return (<div ref={boardContainer} className={classNames} >{boardLayout}</div>)
}

GameBoard.propTypes = {
    difficulty: PropTypes.string.isRequired
}

export default GameBoard;
