const getStringFromBuffer = data => {
   if (data) {
      return Buffer.from(data, "base64").toString("utf-8"); // Ta-da
   }
   return null;
};
module.exports = getStringFromBuffer;
