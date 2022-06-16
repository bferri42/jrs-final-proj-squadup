import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import './SearchBar.css'


export default function SearchBar() {


    const GAMES = [
        'Warzone',
        'Apex Legends',
        'Fortnite'
    ]
    const [players, setPlayers] = useState("Warzone");
    const navigate = useNavigate();


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
