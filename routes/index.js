const express = require("express");
const router = express.Router();
var passport = require("passport");
const { client } = require("../config");

/* GET Google Authentication API. */

// login route
router.get(
   "/auth/google",
   passport.authenticate("google", {
      /**
       * Mention all access scopes here
       */
      scope: [
         "profile",
         "https://www.googleapis.com/auth/plus.profile.emails.read",
         "https://mail.google.com/",
         "https://www.googleapis.com/auth/gmail.modify",
         "https://www.googleapis.com/auth/gmail.readonly",
         "https://www.googleapis.com/auth/gmail.metadata"
      ]
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
      console.log(req.user);
      var token = req.user.token;
      res.redirect("http://127.0.0.1:3000?token=" + token);
   }
);

// get list of messages

router.get("/list", (req, res) => {});

module.exports = router;
