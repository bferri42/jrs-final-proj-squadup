const db = require("../index");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { v4: uuid } = require('uuid');
const saltRounds = 10;


exports.getAllUsers = (req, res) => {
  const query = `SELECT * FROM squadup.user;`;
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


// exports.login = (req, res) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     res.status(400).send({
//       message: "Error logging in. Email or password was missing.",
//     });
//     return;
//   }

//   const query = `
//     SELECT * FROM users
//     WHERE email = ?;`;
//   const placeholders = [email];

//   db.query(query, placeholders, async (err, results) => {
//     if (err) {
//       res.status(500).send({
//         message: "There was an error logging in. Please try again.",
//         error: err,
//       });
//     } else if (results.length == 0) {
//       res.status(404).send({
//         message: "Email or password was incorrect. :(",
//       });
//     } else {
//       let encryptedPassword = results[0].password;
//       const passwordMatched = await bcrypt.compare(password, encryptedPassword);
//       if (passwordMatched) {
//         let user = results[0];
//         const token = jwt.sign(
//           {
//             userId: user.id,
//             email: user.email,
//           },
//           'abc123',

//           {
//             expiresIn: "2h",
//           }
//         );
//         user.token = token;

//         res.send({
//           message: "You have successfully logged in.",
//           user,
//         });
//       } else {
//         res.status(404).send({
//           message: "Email or password was incorrect",
//         });
//       }
//     }
//   });
// };


exports.createNewUser = async (req, res) => {
    let { username, email, password, firstName } = req.body;
    if (!username || !email || !password || !firstName) {
      res.status(400).send({
        message:
          "All required fields must be filled out.",
      });
      return;
    }
  
    const encryptedPassword = await bcrypt.hash(password, saltRounds);
  
    // console.log(req.body);
    const query = `
      INSERT INTO squadup.user (id, username, email, password, firstName)
      VALUES
          (?, ?, ?, ?, ?);
      `;
    const placeholders = [uuid(), username, email, encryptedPassword, firstName];
    // tell the daatabase to execute that script
    db.query(query, placeholders, (err, results) => {
    //   console.log(results);
      // this code will exectue when the database responds
      // 3 possible cases: 404 - Nothing Found
      //                       - whole error
      //                       - Success
      if (err) {
        res.status(500).send({
          message: "There was an error creating the user.",
          error: err,
        });
      } else {
        res.send({
          message: "Your User was Created Successfully",
        });
      }
    });
  };

// exports.deleteUserById = (req, res) => {
//   let { id } = req.params;
//   id = Number(id);
//   const query = `
//           DELETE FROM users
//                WHERE (id = ?)
//                `;
//   const placeholders = [id];
//   // tell the daatabase to execute that script
//   db.query(query, placeholders, (err, results) => {
//     // this code will exectue when the database responds
//     // 3 possible cases: 404 - Nothing Found
//     //                       - whole error
//     //                       - Success
//     if (err) {
//       res.status(500).send({
//         message: "There was an error deleting you.",
//         error: err,
//       });
//     } else if (results.affectedRows == 0) {
//       res.status(404).send({
//         message: "No Account found",
//       });
//     } else {
//       res.send({
//         message: "You have been successfully deleted!",
//       });
//     }
//   });
// };
