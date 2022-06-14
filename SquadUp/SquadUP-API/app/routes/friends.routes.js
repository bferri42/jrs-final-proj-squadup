module.exports = (app) => {
    const friends = require("../controller/friends.controller");

    app.get("/api/friends/requests/:user1", friends.getFriendRequests);

    app.post("/api/friends/favorite", users.sendRequest);

    app.delete("/api/friends/requests/:user1/:user2", friends.deleteRequest);
}