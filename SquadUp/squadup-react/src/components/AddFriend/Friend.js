import React from 'react'
import './Friend.css';

export default function Friend({ isFav, onFavoriteClicked, onUnfavoriteClicked }) {


    const outlinedAddFriend = (
        <div className='friend-container empty'
            onClick={onFavoriteClicked} >
           <button className='friend-button add'>Add Friend</button>
        </div>)

    const solidAddFriend = (
        <div className='friend-container solid'
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
