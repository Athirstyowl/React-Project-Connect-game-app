import React, { useEffect, useState } from "react";
import GameCircle from "./GameCircle";
import Header from "../header";
import "../Game.css"
import Footer from "./footer";
import { isDraw, isWinner, getComputerMove} from "../helper";
import {
    CIRCLES_NO,
    NO_PLAYER,
    PLAYER_1,
    PLAYER_2,
    GAME_STATE_PLAYING,
    GAME_STATE_WON,
    GAME_STATE_DRAW
} from "../constants";
//constant states
const GameBoard = () => {
    const [gameBoard, setGameBoard] = useState(Array(CIRCLES_NO).fill(NO_PLAYER));
    const [currentPlayer, setCurrentPlayer] = useState(PLAYER_1);
    const [gameState, setGameState] = useState(GAME_STATE_PLAYING);
    const [winPlayer, setWinPlayer] = useState(NO_PLAYER);
    console.log(gameBoard);

    useEffect(() => {
        initGame();
    }, [])
    // initiate new game function
    const initGame = () => {
        console.log('init game');
        setGameBoard(Array(CIRCLES_NO).fill(NO_PLAYER));
        setCurrentPlayer(PLAYER_1);
        setGameState(GAME_STATE_PLAYING);
    }
    //Suggest next move function
    const suggestMove = () => {
        circleClicked(getComputerMove(gameBoard));
    }

    //initial function
    const initBoard = () => {
        const circles = [];

        for (let i = 0; i < CIRCLES_NO; i++) {
            circles.push(renderCircle(i));
        }
        return circles;
    }
    //circle clicked function
    const circleClicked = (id) => {

        console.log("circle clicked : " + id);

        if (gameBoard[id] !== NO_PLAYER) return;
        if (gameState !== GAME_STATE_PLAYING) return;

        if (isWinner(gameBoard, id, currentPlayer)) {
            setGameState(GAME_STATE_WON);
            setWinPlayer(currentPlayer);
        }
        if (isDraw(gameBoard, id, currentPlayer)) {
            setGameState(GAME_STATE_DRAW);
            setWinPlayer(NO_PLAYER);
        }
        setGameBoard(prev => {
            return prev.map((circle, pos) => {
                if (pos === id) return currentPlayer;
                return circle;
            })
        })

        setCurrentPlayer(currentPlayer === PLAYER_1 ? PLAYER_2 : PLAYER_1);
        console.log(gameBoard);
        console.log(currentPlayer);
        console.log("gamestateg " + gameState);
    }
    const renderCircle = id => {
        return (
            <GameCircle key={id} id={id} className={`player_${gameBoard[id]}`} onCircleClicked={circleClicked}></GameCircle>
        )
    }

    return (
        <>
            <Header gameState={gameState} currentPlayer={currentPlayer} winPlayer={winPlayer} />
            <div className="gameBoard">
                {initBoard()}
            </div>
            <Footer onNewGameClick={initGame} onSuggestClick={suggestMove} gameState={gameState}/>
        </>
    )
}

export default GameBoard;
