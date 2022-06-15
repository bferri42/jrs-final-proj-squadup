const db = require("../index");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { v4: uuid } = require('uuid');
const saltRounds = 10;

exports.getFriendRequests = (req, res) => {
    const { user1 } = req.params;

    const query = `
    SELECT users.username, users.DOB, users.id, users.skillLevel, users.mainGameID, matches.user1, games.logo, games.name
    FROM squadup.users
    INNER JOIN squadup.matches
      ON matches.user1=users.id
    INNER JOIN squadup.games
      ON games.id=users.favGameId
        WHERE user2 = ?
        ORDER BY skillLevel`;
    const placeholders = [user1];
    // tell the daatabase to execute that script
    db.query(query, placeholders, (err, results) => {
        // this code will exectue when the database responds
        // 3 possible cases: 404 - Nothing Found
        //                       - whole error
        //                       - Success
        if (err) {
            res.status(500).send({
                message: "There was an error getting any users.",
                error: err,
            });
        } else if (results.length == 0) {
            res.status(404).send({
                message: "No squad members found.",
            });
        } else {
            res.send({
                message: "Here are your results.",
                results: results,
            });
        }
    });
};





exports.deleteRequest = (req, res) => {
    let { user1, user2 } = req.params;

    const query = `  
    DELETE FROM squadup.matches
        WHERE user1 = ?
        AND user2 = ?;
    `
    const placeholders = [user1, user2];

    db.query(query, placeholders, (err, results) => {
        if (err) {
            res.status(500)
                .send({
                    message: 'There was an error deleting this user from your squad.',
                    error: err
                });
        } else if (results.affectedRows == 0) {
            res.status(404)
                .send({
                    message: "Could not complete delete request."
                })
        } else {
            res.send({
                message: 'User was successfully deleted from your squad!'
            });
        }
    });
}
