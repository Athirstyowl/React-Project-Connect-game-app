import React from 'react'
import { GAME_STATE_PLAYING } from '../constants'


const Footer = ({onNewGameClick,onSuggestClick,gameState}) => {

  const renderFunction = () => {
    if(gameState === GAME_STATE_PLAYING){
      return <button onClick={onSuggestClick}>Suggest</button> 
    }
    else { return <button onClick={onNewGameClick}>New Game</button>} 
  }

  return (
    <div className='panel footer'>
      { renderFunction() }
    </div>
  )
}

export default Footer