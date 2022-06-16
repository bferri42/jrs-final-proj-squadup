module.exports = (app) => {
  const games = require("../controller/games.controller");

  
  app.get("/api/games", games.getAllGames);
  app.get("/api/games/:name", games.getGamesByName)

};