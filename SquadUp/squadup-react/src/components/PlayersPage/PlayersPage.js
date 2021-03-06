import React, { useEffect, useState } from 'react'
import { useAxios } from '../../services/axios.service';
import { useParams } from 'react-router-dom'
import PlayerCard from '../PlayerCard/PlayerCard';
import SearchBar from '../SearchBar/SearchBar';
import logo from '../../images/logo.png';
import './PlayersPage.css'



export default function PlayersPage({ }) {

  const http = useAxios();
  const { id } = useParams();
  const [players, setPlayers] = useState([]);


  function getUsersAndImageByGame(game) {
    http.getUsersAndImageByGame(game)
      .then(res => {
        // console.log(res.data.results)
        setPlayers(res.data.results)
      })
      .catch(err => {
        console.error(err)
      })
  }


  useEffect(() => {
    getUsersAndImageByGame(id);
  })

  
  return (
    <div className='player-page-root'>
      {/* <Title /> */}
      <img className='logo1' src={logo} />

      <SearchBar />

      <div className='player-page-container'>
        {players.map((player, i) => (
          <PlayerCard
            key={i}
            username={player.username}
            logo={player.logo}
            skillLevel={player.skillLevel}
            {...players}
          />
        ))}
      </div>
    </div>
  )
}

