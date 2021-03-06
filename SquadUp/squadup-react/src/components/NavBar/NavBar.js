import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAxios } from '../../services/axios.service';
import { useLocalStorage } from '../../services/localstorage.service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faPeopleGroup, faUser, faUserPlus, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import './NavBar.css'

export default function NavBar() {

    const http = useAxios();
    const navigate = useNavigate();
    const ls = useLocalStorage();
    const user = ls.getUser();

    const loginButton = (
        <button onClick={() => {
            navigate('/login')
        }}>
            Log In <FontAwesomeIcon icon={faUser} />
        </button>
    )

    function onLogoutClicked() {
        ls.removeUser()
        navigate('/')
    }

    const logoutButton = (
        <button className='nav-buttons' onClick={onLogoutClicked}>
            Log out
            <span className='fa-icon'><FontAwesomeIcon icon={faArrowRightFromBracket} /></span>
        </button>

    )

    const signUpButton = (
        <button onClick={() => {
            navigate('/signup')
        }}>
            Sign up<span className='fa-icon'><FontAwesomeIcon icon={faUserPlus} /></span>
        </button>
    )

    const mySquadButton = (
        <Link to={"/mysquad"}>
            <button type='button'>My Squad<span className='fa-icon'><FontAwesomeIcon icon={faPeopleGroup} /></span></button>
        </Link>
    )

    const editButton = (
        <Link to={"/editinfo"}>
        <button type='button'>Edit Profile<span className='fa-icon'><FontAwesomeIcon icon={faPeopleGroup} /></span></button>
    </Link>
        
    )


    return (

        <nav className="nav-bar-root">
            <div className='nav-bar-left'>
                <Link to={"/"}>
                    <button type='button'>Home<span className='fa-icon'><FontAwesomeIcon icon={faHouse} /></span></button>
                </Link>
                {user ? <span>|</span> : ''}
                {user ? mySquadButton : ''}


            </div>
            <div className='nav-bar-right'>
                {user ? editButton : ''}
                {user ? <span>|</span> : ''}
                {user ? '' : signUpButton}
                {user ? '' : <span>|</span>}
                {user ? logoutButton : loginButton}
            </div>
        </nav>

    )
}
