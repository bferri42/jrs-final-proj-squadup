import React from 'react'
import { useAxios } from '../../services/axios.service'
import Friend from './Friend'

import './AddFriend.css'

export default function AddFriend({ id, isFav, user1, user2, onHearted, onUnhearted }) {

    const http = useAxios();

    function onFavoriteClicked() {
        http.addNewFavorite(user1, user2)
            .then(results => {
                // add to Favs array here
                if (onHearted) {
                    onHearted(user1)
                }

                console.log(user1, user2)
                console.log(results.data)
            })
            .catch(err => {
                console.error(err)
                // show toast of an error
            })
    }

    function onUnfavoriteClicked() {
        // remove heart from fav list in D.B.

        http.deleteFavorite(user1, user2)
            .then(results => {
                // remove from favorites on Favs array
                if (onUnhearted) {
                    onUnhearted(user2);
                }
                console.log(user1, user2)
                console.log(results.data)
            })
            .catch(err => {
                console.error(err);
                // show error toast message
            })
    }

    return (

        <Friend
            isFav={isFav}
            onFavoriteClicked={onFavoriteClicked}
            onUnfavoriteClicked={onUnfavoriteClicked}
        />

    )
}