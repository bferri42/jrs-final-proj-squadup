module.exports = (app) => {
    const users = require("../controller/users.controller");
  
    
    app.get("/api/users/", users.getAllUsers);
    app.get("/api/users/id/:id", users.getUserById);
    app.get("/api/users/favGame/:favGame", users.getUsersByFavGame);
    // app.get("/api/users/game/:id", users.getUsersByFavGameId);
    app.get("/api/users/:username", users.getUserByUsername);
    app.get("/api/users/rank/:skillLevel", users.getUsersByskillLevel);
    app.get("/api/users/platform/:platform", users.getUsersByPlatform);
    app.get("/api/users/favorites/:id", users.getUserFavoritesById);
    app.get("/api/users/favorites/squad/:user1", users.getSquadMembersByUserId);
    app.get("/api/users/favorites/mysquad/:user2", users.getPlayerInfoFromSquadList);
    app.get("/api/users/games/:username", users.getImageFromGamesTable);

  
    app.post("/api/users/signup", users.createNewUser);
    app.post("/api/users/login", users.login);
    app.post("/api/users/favorite", users.addNewFavorite);


    app.delete("/api/users/:username", users.deleteUserByUsername);
    app.delete("/api/users/favorite/:user1/:user2", users.deleteFavorite);
};

////search bar not staying highlighted
////have to hit refresh to go to different buttons on search bar
////no images on my squad or player card
////ind player card has image but sometimes needs a refresh