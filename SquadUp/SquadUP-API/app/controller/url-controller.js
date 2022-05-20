const db = require("../index");

// exports.getRouteById = (req, res) => {
//   const id = req.params.id;
//   //const {id} = req.params; also works
//   const query = `
//         SELECT id, url
//         FROM url.urls
//              WHERE id = ?
//              ;`;
//   const placeholders = [id];
//   // tell the daatabase to execute that script
//   db.query(query, placeholders, (err, results) => {
//     // this code will exectue when the database responds
//     // 3 possible cases: 404 - Nothing Found
//     //                       - whole error
//     //                       - Success
//     if (err) {
//       res.status(500).send({
//         message: "There was an error getting your route.",
//         error: err,
//       });
//     } else if (results.length == 0) {
//       res.status(404).send({
//         message: "No route found",
//       });
//     } else {
//       res.send({
//         message: "Here are your results",
//         url: results[0],
//       });
//     }
//   });
// };

// exports.getAllRoutes = (req, res) => {
//   const query = `SELECT * FROM url.urls;`;
//   // tell the database to execute that script
//   db.query(query, (err, results) => {
//     // this code will execute when the db responds
//     // return appropriate response to the client
//     // 3 possilbe cases
//     // 1 whole error
//     // 2 404 not found
//     // 3 success
//     if (err) {
//       res.status(500).send({
//         message: "There was an error getting routes.",
//         error: err,
//       });
//     } else if (results.length == 0) {
//       // case2
//       res.status(404).send({
//         message: "No routes found :(",
//       });
//     } else {
//       res.send({
//         urls: results,
//       });
//     }
//   });
// };

// exports.createNewRoute = (req, res) => {
//   const { id, url } = req.body;
//   if (!id || !url) {
//     res.status(400).send({
//       message: "Must Provide: 'id' and 'url', could not create route.",
//     });
//     return;
//   }
//   console.log(req.body);
//   const query = `
//       INSERT INTO url.urls (id, url)
//       VALUES
//           (?, ?);
//       `;
//   const placeholders = [id, url];
//   db.query(query, placeholders, (err, results) => {
//     console.log(results);
//     if (err) {
//       res.status(500).send({
//         message: "There was an error creating a new route.",
//         error: err,
//       });
//     } else {
//       res.send({
//         message: "Your Route was Created Successfully",
//       });
//     }
//   });
// };
