import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useAxios } from '../../services/axios.service';
import { useLocalStorage } from '../../services/localstorage.service';
import AddFriend from '../AddFriend/AddFriend';
import './IndividualPlayersPage.css'

export default function IndividualPlayersPage() {

  const http = useAxios();
  const localStorageService = useLocalStorage();
  const user = localStorageService.getUser();
  const { username } = useParams();
  const [player, setPlayer] = useState({})
  const [favPlayers, setFavPlayers] = useState([]);
  const [isFav, setIsFav] = useState(false);


  function getUserByUserName(username) {
    http.getUserbyUsername(username)
      .then((results) => {
        console.log(results.data.results[0])
        setPlayer(results.data.results[0]);
      })
      .catch(err => console.error(err))
  }

  function getSquadMembersByUserId(user1) {
    http.getSquadMembersByUserId(user1)
      .then((results) => {
        console.log(results.data.results)
        setFavPlayers(results.data.results)
      })
      .catch(err => console.error(err))
  }

  function getImageFromGamesTable(username) {
    http.getImageFromGamesTable(username)
      .then((results) => {
        console.log(results.data.results[0])
        setPlayer(results.data.results[0])
      })
  }
  


  function isPlayerInSquad(id) {
    for (let i = 0; i < favPlayers.length; i++) {
      if (id === favPlayers[i].user2) {
        console.log(favPlayers)
        return true;
      }
    }
    return false;
  }



  useEffect(() => {
    getUserByUserName(username);
    getImageFromGamesTable(username)
    var user = localStorageService.getUser();
    getSquadMembersByUserId(user?.id);
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});

  },[])



  useEffect(() => {

    setIsFav(isPlayerInSquad(player.id))
  }, [favPlayers])



  return (
    <div className='ind-player-card-root'>
      <div className='ind-player-card-container'>

        {user &&
          <div className='ind-player-add'>

            {isPlayerInSquad(player.id)
              ? <AddFriend
                isFav={isFav}
                user1={user.id}
                user2={player.id}
                onAdded={() => {
                  setIsFav(true)
                }}
                onRemoved={() => {
                  setIsFav(false);
                }}
              />
              : (
                <AddFriend
                  isFav={isFav}
                  user1={user.id}
                  user2={player.id}
                  onAdded={() => {
                    setIsFav(true)
                  }}
                  onRemoved={() => {
                    setIsFav(false);
                  }}
                />
              )
            }
          </div>
}
        <img className='ind-player-img' src={player.logo}></img>
        <h1 className='player-name'>{player.username}</h1>
        <p className='ind-player-info'>Time zone: {player.timeZone}</p>
        <p className='ind-player-info'>Date of birth: {player.DOB}</p>
        <p className='ind-player-info'>Rank: {player.skillLevel}</p>
        <p className='ind-player-info'>Main Game: {player.name}</p>
        <p className='ind-player-info'>Game ID: {player.mainGameID}</p>
      </div>
    </div>
  )
}