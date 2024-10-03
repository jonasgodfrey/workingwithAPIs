const admin = require("firebase-admin");
const axios = require("axios");

// Initialize Firebase Admin SDK
const serviceAccount = require("./owujupe-api-demo-firebase-adminsdk-ix5f1-6d5d61e0ef.json"); // Ensure you have the correct path

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const firestore = admin.firestore();

// Function to fetch and insert data into Firestore
const populateFirestore = async () => {
  try {
    // Fetch the data from the API
    const response = await axios.get(
      "https://eu.kobotoolbox.org/assets/a6arg9iDUcubfTc5FwQWsQ/submissions/?format=json"
    );
    const data = response.data;
    console.log(`Fetched ${data.length} entries from the API`);

    // Insert data into Firestore's "users" collection
    const batchSize = 500;
    for (let i = 0; i < data.length; i += batchSize) {
      const batch = firestore.batch(); // For batch writes
      const entries = data.slice(i, i + batchSize);

      entries.forEach((entry) => {
        const docRef = firestore.collection("users").doc(); // Reference to the "users" collection
        batch.set(docRef, entry); // Add entry to the batch
      });

      await batch.commit(); // Commit the batch every 500 entries
      console.log(`Committed a batch of ${entries.length} entries`);
    }

    console.log("Firestore populated with all entries successfully");
  } catch (error) {
    console.error("Error populating Firestore:", error.message);
  }
};

// Run the function to populate Firestore
populateFirestore();
