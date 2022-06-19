import React, { useEffect } from 'react'
import { useAxios } from '../../services/axios.service'
import { useLocalStorage } from '../../services/localstorage.service';
import ToastMessenger, { useToasts } from '../Toast/ToastService';

import Friend from './Friend'

export default function AddFriend({ isFav, user1, user2, onAdded, onRemoved }) {

    const http = useAxios();
    const toast = useToasts();
    const localStorageService = useLocalStorage();
    const user = localStorageService.getUser();


    //this function works 90% of the time
    ///when it doesnt work, refresh the page once or twice and it works
    ///find out why
    function onFavoriteClicked() {
        http.addNewFavorite(user1, user2)
            .then(results => {
                // add to Favs array here
                if (onAdded) {
                    onAdded(user1)
                }
                toast.success("Player Added to Squad");

                console.log(user1, user2)
                console.log(results.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    function onUnfavoriteClicked() {
        http.deleteFavorite(user1, user2)
            .then(results => {
                // remove from favorites on Favs array
                if (onRemoved) {
                    onRemoved(user2);
                }
                toast.success("Player Removed from Squad");
                console.log(user1, user2)
                console.log(results.data)
            })
            .catch(err => {
                console.error(err);
            })
    }

    useEffect(() => {
        var user = localStorageService.getUser();
        onFavoriteClicked(user?.id)
    }, [])





    return (
        <div>
            <Friend
                isFav={isFav}
                onFavoriteClicked={onFavoriteClicked}
                onUnfavoriteClicked={onUnfavoriteClicked}
            />

            <ToastMessenger />
        </div>
    )
}
