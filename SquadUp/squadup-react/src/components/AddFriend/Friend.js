import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquarePlus as faSquareRegular } from '@fortawesome/free-regular-svg-icons'
import { faSquarePlus as faSquareSolid } from '@fortawesome/free-solid-svg-icons'
import './Friend.css';

export default function Friend({ isFav, onFavoriteClicked, onUnfavoriteClicked }) {


    const outlinedAddFriend = (
        <div className='heart-container empty'
            onClick={onFavoriteClicked} >
            <FontAwesomeIcon
                icon={faSquareRegular}
                size="lg"
            />
        </div>)

    const solidAddFriend = (
        <div className='heart-container solid'
            onClick={onUnfavoriteClicked} >
            <FontAwesomeIcon
                icon={faSquareSolid}
                size="lg"
            />
        </div>
    )

    return (
        <div className="icon-container">
            {!isFav ?
                outlinedAddFriend
                : solidAddFriend}
        </div>
    )
}
