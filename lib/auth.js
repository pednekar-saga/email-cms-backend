var passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { google } = require("googleapis");
const { listEmails } = require("./emails");

const OAuth2 = google.auth.OAuth2;

const authenticate = auth => {
   passport.use(
      new GoogleStrategy(
         {
            clientID: auth.client_id,
            clientSecret: auth.client_secret,
            callbackURL: auth.redirect_uris[0]
         },
         (accessToken, refreshToken, profile, done) => {
            console.log("RES", refreshToken);
            var userData = {
               token: accessToken,
               refreshToken,
               scope: auth.scope,
               token_type: "Bearer"
            };
            console.log(accessToken, refreshToken, profile);
            done(null, userData);
         }
      )
   );
};
const oAuth = async (auth, credentials) => {
   console.log(`
   ${JSON.stringify(auth)}
   `);
   const {
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uris: redirectUri
   } = auth;
   console.log(clientId, clientSecret, redirectUri);
   const oAuth2Client = await new OAuth2({
      clientId,
      clientSecret,
      redirectUri
   });
   // console.log(oAuth2Client);
   await oAuth2Client.setCredentials(credentials);
   await listEmails(oAuth2Client);
   return oAuth2Client;
};

module.exports = { authenticate, oAuth };
