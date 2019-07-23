const express = require("express");
const app = express();
const { auth, server } = require("./config");
const { authenticate, oAuth } = require("./lib/auth");
const routes = require("./routes");

/**
 * Authentication strategy
 */
authenticate(auth);
// oAuth(auth);

/**
 * Routes for login
 */
app.use("/", routes);

/**
 * Server config
 *
 */

app.listen(server.PORT, () =>
   console.log(`Server is running on ${server.PORT}`)
);
