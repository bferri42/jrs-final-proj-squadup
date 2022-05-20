module.exports = (app) => {
    const users = require("../controller/user.controller");
  
    // app.get("/api/users/:id", users.getUserById);
    
    app.get("/api/users/", users.getAllUsers);
  
    app.post("/api/users", users.createNewUser);
  
  };