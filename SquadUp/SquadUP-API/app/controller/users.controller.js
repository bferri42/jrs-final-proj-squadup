const db = require("../index");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { v4: uuid } = require('uuid');
const saltRounds = 10;

//------------ALL USER GET REQUESTS------------//

exports.getAllUsers = (req, res) => {
  const query = `SELECT * FROM squadup.users;`;
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
        message: "There was an error getting users.",
        error: err,
      });
    } else if (results.length == 0) {
      // case2
      res.status(404).send({
        message: "No users found :(",
      });
    } else {
      res.send({
        users: results,
      });
    }
  });
};

exports.getUserById = (req, res) => {
  const id = req.params.id;
  const query = `
        SELECT * FROM squadup.users
             WHERE id = ?
             ;`;
  const placeholders = [id];
  db.query(query, placeholders, (err, results) => {
    if (err) {
      res.status(500).send({
        message: "There was an error getting any users.",
        error: err,
      });
    } else if (results.length == 0) {
      res.status(404).send({
        message: "No users found...",
      });
    } else {
      res.send({
        message: "Here are your results",
        results: results,
      });
    }
  });
};

exports.getUsersByGame = (req, res) => {
  const favGame = req.params.favGame;
  const query = `
        SELECT * FROM squadup.users
             WHERE favGame = ?
             ;`;
  const placeholders = [favGame];
  db.query(query, placeholders, (err, results) => {
    if (err) {
      res.status(500).send({
        message: "There was an error getting any users with that favorite game.",
        error: err,
      });
    } else if (results.length == 0) {
      res.status(404).send({
        message: "No users by favorite game found",
      });
    } else {
      res.send({
        message: "Here are your results",
        results: results,
      });
    }
  });
};

exports.getUsersAndImageByGame = (req, res) => {
  const { favGameId } = req.params;
  const query = `
        SELECT * FROM squadup.users
        INNER JOIN squadup.games ON users.favGameId=games.id
             WHERE favGameId = ?
             ORDER BY FIELD (skillLevel, 'Bronze', 'Silver', 'Gold')
             ;`;
  const placeholders = [favGameId];
  db.query(query, placeholders, (err, results) => {
    if (err) {
      res.status(500).send({
        message: "There was an error getting any users with that favorite game.",
        error: err,
      });
    } else if (results.length == 0) {
      res.status(404).send({
        message: "No users by favorite game found",
      });
    } else {
      res.send({
        message: "Here are your results",
        results: results,
      });
    }
  });
};


exports.getUserByUsername = (req, res) => {
  const username = req.params.username;
  const query = `
        SELECT users.username, users.DOB, users.favGameId, users.mainGameID, users.skillLevel, users.timeZone, games.name, games.logo FROM squadup.users
        INNER JOIN squadup.games ON users.favGameId=games.id
             WHERE username = ?
             ORDER BY FIELD (skillLevel, 'Bronze', 'Silver', 'Gold')
             ;`;

  const placeholders = [username];
  db.query(query, placeholders, (err, results) => {
    if (err) {
      res.status(500).send({
        message: "There was an error getting any users.",
        error: err,
      });
    } else if (results.length == 0) {
      res.status(404).send({
        message: "No users found",
      });
    } else {
      res.send({
        message: "Here are your results",
        results: results,
      });
    }
  });
};

exports.getUsersByskillLevelAndGame = (req, res) => {
  const { skillLevel, favGameId } = req.params;
  // const query = `
  // SELECT users.id, users.username, users.DOB, users.skillLevel, users.timeZone, users.mainGameID, games.logo, games.name FROM squadup.users
  // INNER JOIN squadup.games ON users.favGameId=games.id
  //       WHERE username = ?
  //       ORDER BY FIELD (skillLevel, 'Bronze', 'Silver', 'Gold')
  //       ;`;
  const query = `
        SELECT * FROM squadup.users
             WHERE skillLevel = ?
             AND favGameId = ?
             ;`;
  const placeholders = [skillLevel, favGameId];
  db.query(query, placeholders, (err, results) => {
    if (err) {
      res.status(500).send({
        message: "There was an error getting any users.",
        error: err,
      });
    } else if (results.length == 0) {
      res.status(404).send({
        message: "No users found",
      });
    } else {
      res.send({
        message: "Here are your results",
        results: results,
      });
    }
  });
};

exports.getUsersByPlatform = (req, res) => {
  const platform = req.params.platform;
  const query = `
        SELECT * FROM squadup.played_games
             WHERE platform = ?
             ;`;
  const placeholders = [platform];
  db.query(query, placeholders, (err, results) => {
    if (err) {
      res.status(500).send({
        message: "There was an error getting any users.",
        error: err,
      });
    } else if (results.length == 0) {
      res.status(404).send({
        message: "No users found",
      });
    } else {
      res.send({
        message: "Here are your results",
        results: results,
      });
    }
  });
};

exports.getUserFavoritesById = (req, res) => {
  const id = req.params.id;
  const query = `
        SELECT * FROM squadup.matches
             WHERE id = ?
             ;`;
  const placeholders = [id];
  db.query(query, placeholders, (err, results) => {
    if (err) {
      res.status(500).send({
        message: "There was an error getting any users.",
        error: err,
      });
    } else if (results.length == 0) {
      res.status(404).send({
        message: "No users found",
      });
    } else {
      res.send({
        message: "Here are your results",
        results: results,
      });
    }
  });
};

exports.getSquadMembersByUserId = (req, res) => {
  const user1 = req.params.user1;
  const query = `
        SELECT user2 FROM squadup.matches
             WHERE user1 = ?
             ;`;
  const placeholders = [user1];
  db.query(query, placeholders, (err, results) => {
    if (err) {
      res.status(500).send({
        message: "There was an error getting any squad members.",
        error: err,
      });
    } else if (results.length == 0) {
      res.status(404).send({
        message: "No squad members found",
      });
    } else {
      res.send({
        message: "Here are your results",
        results: results,
      });
    }
  });
};

exports.getPlayerInfoFromSquadList = (req, res) => {
  const user2 = req.params.user2;

  const query = `
  SELECT users.username, users.DOB, users.id, users.skillLevel, users.mainGameID, matches.user2, games.logo, games.name
  FROM squadup.users
  INNER JOIN squadup.matches
    ON matches.user2=users.id
  INNER JOIN squadup.games
    ON games.id=users.favGameId
      WHERE user1 = ?
      ORDER BY FIELD (skillLevel, 'Bronze', 'Silver', 'Gold')`
    ;
  const placeholders = [user2];
  db.query(query, placeholders, (err, results) => {
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

exports.getImageFromGamesTable = (req, res) => {
  const username = req.params.username;

  const query = `
        SELECT users.id, users.username, users.DOB, users.skillLevel, users.timeZone, users.mainGameID, games.logo, games.name FROM squadup.users
        INNER JOIN squadup.games ON users.favGameId=games.id
              WHERE username = ?
              ORDER BY FIELD (skillLevel, 'Bronze', 'Silver', 'Gold')
              ;`;
  const placeholders = [username];
  db.query(query, placeholders, (err, results) => {
    if (err) {
      res.status(500).send({
        message: "There was an error getting any images.",
        error: err,
      });
    } else if (results.length == 0) {
      res.status(404).send({
        message: "No images found.",
      });
    } else {
      res.send({
        message: "Here are your results.",
        results: results,
      });
    }
  });
};

//-----------ALL POST REQUESTS------------//

exports.createNewUser = async (req, res) => {

  let { username, password, DOB, timeZone, skillLevel, favGameId, mainGameID } = req.body;

  if (!username || !password || !DOB || !timeZone || !skillLevel || !favGameId || !mainGameID) {
    res.status(400).send({
      message: "All fields required to create account"
    });
    return
  }
  const encryptedPassword = await bcrypt.hash(password, saltRounds)

  const query = `
  INSERT INTO squadup.users (id, username, password, DOB, timeZone, skillLevel, favGameId, mainGameID)
  VALUES
  (?, ?, ?, ?, ?, ?, ?, ?);
  `;
  const placeholders = [uuid(), username, encryptedPassword, DOB, timeZone, skillLevel, favGameId, mainGameID];

  db.query(query, placeholders, (err, results) => {
    if (err) {
      if (err.errno === 1062) {
        res.status(400).send({
          message: "username already taken",
          error: err
        })
      } else {
        res.status(500).send({
          message: "There was an error creating your account. Please try again later.",
          error: err
        });
      }
    }
    else {
      // success  --> calls log in function to immediately log in
      this.login(req, res);
    }
  })
}

exports.login = (req, res) => {

  let { username, password } = req.body;
  if (!username || !password) {
    res.status(400).send({
      message: 'Must include both username and password'
    })
    return;
  }
  const query = `
            SELECT * FROM squadup.users
            WHERE username = ?;        
        `;
  const placeholders = [username];

  db.query(query, placeholders, async (err, results) => {

    if (err) {
      res.status(500)
        .send({
          message: 'There was an error logging in. Try again later.',
          error: err
        });
    } else if (results.length == 0) {
      res.status(404)
        .send({
          message: 'Account not found.',
          error: err
        })
    } else {

      const passwordMatched = await bcrypt.compare(password, results[0].password)
      if (!passwordMatched) {
        res.status(400).send({
          message: "Password incorrect"
        })
      } else {

        res.send({
          message: "Login successful! 🤗",
          user: results[0]
        })
      }
    }
  });
}

exports.addNewFavorite = (req, res) => {

  let { user1, user2 } = req.body;

  if (!user1 || !user2) {
    res.status(400).send({
      message: 'Must include user1 and user2.'
    })
    return;
  }

  const query = `
      INSERT INTO squadup.matches (user1, user2)
      VALUES
      (?, ?);
  `;

  const placeholders = [user1, user2];

  db.query(query, placeholders, (err, results) => {
    if (err) {
      res.status(500)
        .send({
          message: 'There was an error adding the squad member to your favorites list.',
          error: err
        });
    } else {
      res.send({
        message: "Squad member added."
      })
    }
  });
}

exports.editUserInfo = (req, res) => {

  let { id, timeZone, skillLevel, favGameId, mainGameID } = req.body;

  const query = `
    UPDATE squadup.users
    SET
    timeZone = ?,
    skillLevel = ?,
    favGameId = ?,
    mainGameID = ?
    WHERE (id = ?);
    `;

  const placeholders = [timeZone, skillLevel, favGameId, mainGameID, id];

  db.query(query, placeholders, (err, results) => {
    if (err) {
      res.status(500).send({
        message: "There was an error editing this user's info.",
        error: err,
      });
    } else if (results.affectedRows == 0) {
      res.status(404).send({
        message: "Error 404",
      });
    } else {
      res.send({
        message: "Your information has been updated successfully!",
      });
    }
  });
};

exports.deleteUserByUsername = (req, res) => {
  let { username } = req.params;
  const query = `
          DELETE FROM squadup.users
               WHERE (username = ?)
               `;
  const placeholders = [username];
  db.query(query, placeholders, (err, results) => {
    if (err) {
      res.status(500).send({
        message: "There was an error deleting this soldier.",
        error: err,
      });
    } else if (results.affectedRows == 0) {
      res.status(404).send({
        message: "No soldier found",
      });
    } else {
      res.send({
        message: "You have been successfully deleted!",
      });
    }
  });
};

exports.deleteFavorite = (req, res) => {
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