import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAxios } from '../../services/axios.service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import './SearchBar.css'


export default function SearchBar() {


    const GAMES = [
        'Warzone',
        'Apex Legends',
        'Fortnite'
    ]
    const [players, setPlayers] = useState("Warzone");
    const navigate = useNavigate();
    const http = useAxios();
    // const { favGame } = useParams();



    



    return (
        <form className='search-bar'
            onSubmit={e => {
                e.preventDefault();
                setPlayers(e.target.value)
                navigate(`/players/${players}`);
            }}
        >

                <div className='btn-group'>
                <Link to={`/players/1`}>
                <button className='game one'>WARZONE</button>
                </Link>
                <Link to={`/players/2`}>
                <button className='game two'>APEX LEGENDS</button>
                </Link>
                <Link to={`/players/3`}>
                <button className='game three'>FORTNITE</button>
                </Link>
                </div>
     
        </form>

    )
}
