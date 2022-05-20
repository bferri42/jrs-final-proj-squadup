module.exports = (app) => {
  const game = require("../controller/game.controller");

  app.get("/api/games/:favGame", game.getUsersByfavGame);
  
  // app.get("/api/games/", url.getAllRoutes);

  // app.post("/api/games", url.createNewRoute);

};
