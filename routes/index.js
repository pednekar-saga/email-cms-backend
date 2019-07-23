const express = require("express");
const router = express.Router();
var passport = require("passport");
const { auth } = require("../config");
const { listLabels } = require("../lib/auth");
const { oAuth } = require("../lib/auth");

/* GET Google Authentication API. */

// login route
router.get(
   "/auth/google",
   passport.authenticate("google", {
      /**
       * Mention all access scopes here
       */
      scope: auth.scope,
      accessType: "offline",
      approvalPrompt: "force"
   })
);

//callback handler route
router.get(
   "/auth/google/callback",
   passport.authenticate(
      "google",

      { failureRedirect: "/failure", session: false }
   ),
   (req, res) => {
      var { token, refreshToken, scope, token_type } = req.user;
      console.log(req.user);
      const result = oAuth(auth, {
         token,
         refresh_token: refreshToken,
         scope,
         token_type
      });
      res.redirect("http://127.0.0.1:3000?token=" + token);
   }
);

// get list of messages

router.get("/list", (req, res) => {
   listLabels();
});

module.exports = router;
