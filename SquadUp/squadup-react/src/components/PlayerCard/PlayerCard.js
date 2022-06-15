import React from 'react'
import { Link } from 'react-router-dom';
import AddFriend from '../AddFriend/AddFriend';
import { useLocalStorage } from '../../services/localstorage.service'

import './PlayerCard.css'

export default function PlayerCard({ id, username, img, skillLevel, logo }) {


  return (
    <div className='player-card-container'>
      <Link className='link-card' to={`/player/${username}`}>
        <div className='player-card-root'>
          <img className='player-card-img' src={logo}></img>
          <h2 className='player-name'>{username}</h2>
          <p className='player-name'>{skillLevel}</p>
        </div>
      </Link>
    </div>
  )
}

        




