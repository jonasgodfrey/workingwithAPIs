const admin = require("firebase-admin");

// Replace this path with the actual path to your Firebase Admin SDK key JSON file
const serviceAccount = require("./owujupe-api-demo-firebase-adminsdk-ix5f1-6d5d61e0ef.json");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const firestore = admin.firestore();

module.exports = firestore;
