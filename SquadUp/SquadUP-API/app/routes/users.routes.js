module.exports = (app) => {
    const users = require("../controller/users.controller");
  
    
    app.get("/api/users/", users.getAllUsers);
    app.get("/api/users/id/:id", users.getUserById);
    app.get("/api/users/favGame/:favGame", users.getUsersByGame);
    app.get("/api/users/game/:favGameId", users.getUsersAndImageByGame);
    app.get("/api/users/:username", users.getUserByUsername);
    app.get("/api/users/rank/:favGameId/:skillLevel", users.getUsersByskillLevelAndGame);
    app.get("/api/users/platform/:platform", users.getUsersByPlatform);
    app.get("/api/users/favorites/:id", users.getUserFavoritesById);
    app.get("/api/users/favorites/squad/:user1", users.getSquadMembersByUserId);
    app.get("/api/users/favorites/mysquad/:user2", users.getPlayerInfoFromSquadList);
    app.get("/api/users/games/:username", users.getImageFromGamesTable);

  
    app.post("/api/users/signup", users.createNewUser);
    app.post("/api/users/login", users.login);
    app.post("/api/users/favorite", users.addNewFavorite);

    app.put("/api/users/", users.editUserInfo)


    app.delete("/api/users/:username", users.deleteUserByUsername);
    app.delete("/api/users/favorite/:user1/:user2", users.deleteFavorite);
};

