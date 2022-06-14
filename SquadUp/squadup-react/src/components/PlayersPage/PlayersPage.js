import React, { useEffect, useState } from 'react'
import { useAxios } from '../../services/axios.service';
import { useParams } from 'react-router-dom'
import './PlayersPage.css'
import PlayerCard from '../PlayerCard/PlayerCard';
import SearchBar from '../SearchBar/SearchBar';
import Title from '../Title/Title';


export default function PlayersPage({}) {

  const http = useAxios();
  const { id } = useParams();
  const [players, setPlayers] = useState([]);
  const [favPlayers, setFavPlayers] = useState([]);


  function getUsersByGame(game) {
    http.getUsersByGame(game)
      .then(res => {
        // console.log(res.data.results)
        setPlayers(res.data.results)
      })
      .catch(err => {
        console.error(err)
      })
  }
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
  
  function getImageFromGamesTable(username) {
    http.getImageFromGamesTable(username)
      .then((results) => {
        console.log(results.data.results[0])
        setPlayers(results.data.results[0])
      })
  }

  // function addPlayerToFavList(player) {
  //   setFavPlayers([...favPlayers, player])
  // }

  // function removePlayerFromFavList(id) {
  //   setFavPlayers(favPlayers.filter(userId => userId !== id));
  // }

  // function isPlayerInFavorteList(id) {
  //   return favPlayers.includes(id);
  // }


  useEffect(() => {
    getUsersAndImageByGame(id);
    })


  return (
    <div className='player-page-root'>
      <Title />
      <SearchBar />
      <div className='player-page-container'>

        {players.map((player, i) => (
          <PlayerCard
           key={i}
            username={player.username}
            logo={player.logo}
            skillLevel={player.skillLevel}
            // mainGameID={player.mainGameID}
            {...players}
            // isFav={isPlayerInFavorteList(player.id)}
            // setIsNotFav={removePlayerFromFavList}
            // setIsFav={addPlayerToFavList} 
            />
        ))}

      </div>

    </div>
  )
}

