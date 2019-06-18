var passport = require("passport");
// var GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

const authenticate = auth => {
   passport.use(
      new GoogleStrategy(
         {
            clientID: auth.client_id,
            clientSecret: auth.client_secret,
            callbackURL: auth.redirect_uris[0],
            accessType: "offline",
            userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
         },
         (accessToken, refreshToken, profile, done) => {
            // console.log(profile);
            var userData = {
               profile,
               token: accessToken,
               refreshToken
            };
            done(null, userData);
         }
      )
   );
};
const oAuth = () => {
   const oAuth2Client = new OAuth2({
      client_secret: auth.client_secret,
      client_id: auth.client_id,
      redirect_uris: auth.redirect_uris[0]
   });
   oAuth2Client.setCredentials();
};
module.exports = authenticate;
