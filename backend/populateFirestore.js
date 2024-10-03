const axios = require("axios");
const firestore = require("./firebaseConfig");

const populateFirestore = async () => {
  try {
    // Fetch the data from the API
    const response = await axios.get(
      "https://eu.kobotoolbox.org/assets/a6arg9iDUcubfTc5FwQWsQ/submissions/?format=json"
    );
    const data = response.data;
    console.log(`Fetched ${data.length} entries from the API`);

    // Insert data into Firestore
    const batchSize = 500; 
    let batch = firestore.batch();
    let counter = 0;

    for (let i = 0; i < data.length; i++) {
      let entry = data[i];

      
      entry = Object.fromEntries(
        Object.entries(entry).filter(([key, value]) => !key.startsWith("__"))
      );

      const docRef = firestore.collection("submissions").doc(); 
      batch.set(docRef, entry);
      counter++;

      // Commit the batch every 500 documents or at the end
      if (counter === batchSize || i === data.length - 1) {
        console.log(`Committing batch of ${counter} entries`);
        await batch.commit();
        batch = firestore.batch(); 
        counter = 0; 
      }
    }

    console.log("Firestore populated with all entries successfully");
  } catch (error) {
    console.error("Error populating Firestore:", error.message);
  }
};

// Run the function to populate Firestore
populateFirestore();
