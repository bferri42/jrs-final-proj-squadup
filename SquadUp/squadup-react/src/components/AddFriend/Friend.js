import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquarePlus as faSquareRegular } from '@fortawesome/free-regular-svg-icons'
import { faSquarePlus as faSquareSolid } from '@fortawesome/free-solid-svg-icons'
import './Friend.css';

export default function Friend({ isFav, onFavoriteClicked, onUnfavoriteClicked }) {


    const outlinedAddFriend = (
        <div className='heart-container empty'
            onClick={onFavoriteClicked} >
           <button className='friend-button add'>Add Friend</button>
        </div>)

    const solidAddFriend = (
        <div className='heart-container solid'
            onClick={onUnfavoriteClicked} >
                  <button className='friend-button undo'>Remove</button>

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
