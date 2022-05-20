const db = require("../index");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { v4: uuid } = require('uuid');
const saltRounds = 10;


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

// exports.createNewUser = async (req, res) => {
//   let { email, password } = req.body;
//   if (!email || !password) {
//     //client error
//     res.status(400).send({
//       message: "Email or password was not defined",
//     });
//     return;
//   }
//   const encryptedPassword = await bcrypt.hash(password, saltRounds);

//   const query = `
//   INSERT INTO users (id, email, password)
//   VALUES (?, ?, ?);`;
//   const placeholders = [uuid(), email, encryptedPassword];
//   db.query(query, placeholders, (err, results) => {
//     if (err) {
//       if (err.errno === 1062) {
//         res.status(400).send({
//           error: err,
//           message: "That email already exists.",
//         });
//       } else {
//         res.status(500).send({
//           message:
//             "There was an error creating your account. Please try again later.",
//           error: err,
//         });
//       }
//     } else {
//       // success
//       this.login(req, res);
//     }
//   });
// };

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
