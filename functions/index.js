// Example (make sure to remove unused variables)
const functions = require("firebase-functions");
// const { onRequest } = require('firebase-functions/v2/https'); // Unused
// const { logger } = require('firebase-functions'); // Unused

exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase!");
});
