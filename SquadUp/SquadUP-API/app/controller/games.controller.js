const db = require("../index");


exports.getAllGames = (req, res) => {
  const query = `SELECT * FROM squadup.games;`;
  // tell the database to execute that script
  db.query(query, (err, results) => {
    // this code will execute when the db responds
    // return appropriate response to the client
    // 3 possilbe cases
    // 1 whole error
    // 2 404 not found
    // 3 success
    if (err) {
      res.status(500).send({
        message: "There was an error getting games.",
        error: err,
      });
    } else if (results.length == 0) {
      // case2
      res.status(404).send({
        message: "No games found :(",
      });
    } else {
      res.send({
        urls: results,
      });
    }
  });
};

exports.getGamesByName = (req, res) => {
  const name = req.params.name;
  //const {id} = req.params; also works
  const query = `
        SELECT * FROM squadup.games
             WHERE name = ?
             ;`;
  const placeholders = [name];
  // tell the daatabase to execute that script
  db.query(query, placeholders, (err, results) => {
    // this code will exectue when the database responds
    // 3 possible cases: 404 - Nothing Found
    //                       - whole error
    //                       - Success
    if (err) {
      res.status(500).send({
        message: "There was an error getting any games.",
        error: err,
      });
    } else if (results.length == 0) {
      res.status(404).send({
        message: "No games found.",
      });
    } else {
      res.send({
        message: "Here are your results",
        results: results,
      });
    }
  });
};