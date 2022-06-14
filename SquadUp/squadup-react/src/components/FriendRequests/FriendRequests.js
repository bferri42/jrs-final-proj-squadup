import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useAxios } from '../../services/axios.service';
import { useLocalStorage } from '../../services/localstorage.service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquareCheck, faSquareXmark } from '@fortawesome/free-solid-svg-icons'
import PlayerCard from '../PlayerCard/PlayerCard';
import './FriendRequests.css'



export default function FriendRequests({ user1, user2 }) {

    const localStorageService = useLocalStorage();
    const http = useAxios();
    const { username } = useParams();
    const [requested, setRequested] = useState([]);




    function getFriendRequests(user1) {
        http.getFriendRequests(user1)
            .then((response => {
                console.log(response.data)
                setRequested(response.data.results)
            }))
            .catch(err => console.error(err))
    }

    function deleteRequest() {
        http.deleteRequest(user1, user2)
            .then((response => {
                console.log(response.data)

            }))
            .catch(err => console.error(err))
    }

    function deleteRequest() {
        http.deleteRequest(user1, user2)
            .then((response => {
                console.log(response.data)

            }))
            .catch(err => console.error(err))
    }

    useEffect(() => {
        var user = localStorageService.getUser();
        getFriendRequests(user?.id)
    }, [])



    return (
        <div className="friends-root">
            <h1 className='friends-title'>MY SQUAD</h1>
            <div className='friends-cards-container'>
                {requested.map((player, i) => (
                    <PlayerCard key={i}

                        {...player}
                        isFav={true}
                        requested={requested}
                        setRequested={setRequested}
                    />
                ))}
                <div className='friend-buttons'>
                    <button className='accept'>Accept</button>
                    <button className='decline' onClick={deleteRequest}>Decline</button>
                </div>
            </div>

        </div>)
}
