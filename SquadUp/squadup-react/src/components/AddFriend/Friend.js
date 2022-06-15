import React from 'react'
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
