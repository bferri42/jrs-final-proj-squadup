import React, { useEffect, useState } from 'react'
import { useAxios } from '../../services/axios.service';
import { useLocalStorage } from '../../services/localstorage.service';
import PlayerCard from '../PlayerCard/PlayerCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFaceFrown } from '@fortawesome/free-solid-svg-icons'
import { faArrowsDownToPeople } from '@fortawesome/free-solid-svg-icons'
import './MySquad.css'
import Title from '../Title/Title';

export default function MySquad() {

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

    if (favPlayers.length > 0) {
        return (
            <div className="mysquad-root">
                <div className='title-container'>
                    <div className='my-squad'>My Squad! <FontAwesomeIcon icon={faArrowsDownToPeople} size="2x" /></div>
                </div>
                <div className='mysquad-cards-container'>
                    {favPlayers.map((player, i) => (
                        <PlayerCard key={i}
                            {...player}
                            isFav={true}
                            favPlayers={favPlayers}
                            setFavPlayers={setFavPlayers}
                        />
                    ))}
                </div>
            </div>
        )
    } else {
        return (
            <div className='no-squad-container'>
                <h1>No Squad Members Yet!
                    <br />
                    <br />
                    <FontAwesomeIcon icon={faFaceFrown} size="2x" />
                </h1>
            </div>
        )
    }
}





