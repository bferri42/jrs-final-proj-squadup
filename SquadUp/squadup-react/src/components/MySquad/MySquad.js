import React, { useEffect, useState } from 'react'
import { useAxios } from '../../services/axios.service';
import { useLocalStorage } from '../../services/localstorage.service';
import PlayerCard from '../PlayerCard/PlayerCard';
import './MySquad.css'

export default function MySquad({ }) {

    const localStorageService = useLocalStorage();
    const http = useAxios();

    const [favPlayers, setFavPlayers] = useState([]);


    function getPlayerInfoFromSquadList(user1) {
        http.getPlayerInfoFromSquadList(user1)
            .then((response => {
                console.log(response.data)
                setFavPlayers(response.data.results)
            }))
            .catch(err => console.error(err))
    }
    



    useEffect(() => {
        var user = localStorageService.getUser();
        getPlayerInfoFromSquadList(user?.id)
    }, [])



    return (
        <div className="mysquad-root">

            <h1 className='squad-title'>Temp Header</h1>
            <div className='mysquad-cards-container'>
                {favPlayers.map((player, id) => (
                    <PlayerCard key={player.id}
                        {...player}
                        isFav={true}
                        // squad={squad}
                        favPlayers={favPlayers}
                        setFavPlayers={setFavPlayers}
                    />
                ))}
            </div>

        </div>
    )
}

