const { google } = require("googleapis");
const getStringFromBuffer = require("../helpers");

/**
 *
 * @param {*} auth
 */
const listEmails = async auth => {
   const list = [];
   const gmail = google.gmail({
      version: "v1",
      auth
   });
   gmail.users.messages.list(
      {
         userId: "me",
         maxResults: "10"
      },
      (err, res) => {
         if (err) return console.log("The API returned an error: " + err);
         const { messages } = res.data;

         messages.forEach((message, index) => {
            console.log(`Reading ${index}th message `);
            const data = gmail.users.messages
               .get({
                  userId: "me",
                  id: message.id
               })
               .then(result => {
                  const response = {};
                  // console.log("--->", result.data.payload);
                  /**
                   * Get Subject , to, and From
                   *
                   */

                  result.data.payload.headers.forEach(item => {
                     if (
                        item.name === "From" ||
                        item.name === "Subject" ||
                        item.name === "To"
                     ) {
                        response[item.name] = item.value;
                     }
                  });

                  const { id, threadId, snippet } = result.data;
                  response.id = id;
                  response.threadId = threadId;
                  response.snippet = snippet;
                  if (!result.data.payload.parts) {
                     console.log("====================================");
                     console.log("RES", result.data.payload);
                     console.log("====================================");
                  }
                  // console.log("RES", result.data.payload.parts.length);
                  // const [first, { body }] = result.data.payload.parts;
                  // const result1 = getStringFromBuffer(body.data);
                  // console.log(result1);
                  // var buf = Buffer.from(body.data, "base64"); // Ta-da
                  // console.log(buf.toString("utf-8"));
                  list.push(response);
               })
               .catch(err => {
                  console.error(err);
               });
         });
      }
   );
   // console.log(list);
};
module.exports = { listEmails };
