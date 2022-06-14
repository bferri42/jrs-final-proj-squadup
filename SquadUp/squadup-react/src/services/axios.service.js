const axios = require('axios');
const URL = `http://localhost:8080/api`

// -------ALL USERS ROUTES--------------//
function getAllUsers() {
    return axios.get(`${URL}/users/`)
}

function getUserById(id) {
    return axios.get(`${URL}/users/id/${id}`)
}

function getUsersByGame(favGame) {
    return axios.get(`${URL}/users/favgame/${favGame}`)
}

function getUsersAndImageByGame(game) {
    return axios.get(`${URL}/users/game/${game}`)
}

function getUserbyUsername(username) {
    return axios.get(`${URL}/users/${username}`)
}

function getUsersByskillLevel(skillLevel) {
    return axios.get(`${URL}/users/rank/${skillLevel}`)
}

function getUsersByPlatform(platform) {
    return axios.get(`${URL}/users/platform/${platform}`)
}

function getUserFavoritesById(id) {
    return axios.get(`${URL}/users/favorites/${id}`)
}

function getAllUserFavorites() {
    return axios.get(`${URL}/users/favorites/`)
}

function getSquadMembersByUserId(user1) {
    return axios.get(`${URL}/users/favorites/squad/${user1}`)
}

function getPlayerInfoFromSquadList(user2) {
    return axios.get(`${URL}/users/favorites/mysquad/${user2}`)
}

function getImageFromGamesTable(username) {
    return axios.get(`${URL}/users/games/${username}`)
}

function createNewUser({ username, password, DOB, firstName, timeZone, skillLevel, favGameId, mainGameID }) {
    return axios.post(`${URL}/users/signup`, { username, password, DOB, firstName, timeZone, skillLevel, favGameId, mainGameID })
}

function login({ username, password }) {
    return axios.post(`${URL}/users/login`, { username, password })
}

function addNewFavorite(user1, user2) {
    return axios.post(`${URL}/users/favorite`, {user1, user2})
}

// function getFriendRequests(user1) {
//     return axios.get(`${URL}/users/requests/${user1}`)
// }

// NOTE -> CHANGED PARAMS TO BE OUT OF AN OBJECT 


function deletebyUserUsername(username) {
    return axios.delete(`${URL}/users/${username}`)
}

function deleteFavorite(user1, user2) {
    return axios.delete(`${URL}/users/favorite/${user1}/${user2}`)
}



// -------ALL GAMES ROUTES----------------
function getAllGames() {
    return axios.get(`${URL}/games/`)
}

function getGamesByName(name) {
    return axios.get(`${URL}/games/${name}`)
}


//--------ALL FRIENDS ROUTES-------------
function getFriendRequests(user1) {
    return axios.get(`${URL}/friends/requests/${user1}`)
}

function deleteRequest(user1, user2) {
    return axios.delete(`${URL}/friends/requests/${user1}/${user2}`)
}



const api = {
    getAllUsers,
    getUserById,
    getUsersByGame,
    getUsersAndImageByGame,
    getUserbyUsername,
    getUsersByskillLevel,
    getUsersByPlatform,
    getUserFavoritesById,
    getAllUserFavorites,
    getSquadMembersByUserId,
    createNewUser,
    login,
    addNewFavorite,
    deletebyUserUsername,
    deleteFavorite,
    getAllGames,
    getGamesByName,
    getPlayerInfoFromSquadList,
    getImageFromGamesTable,
    getFriendRequests,
    deleteRequest
}

function useAxios() {
    return api;
}

export { useAxios };
