const mongoose = require("mongoose");
const axios = require("axios");
const cors = require("cors");
const express = require("express")
const app = express();
const port = 3000;

app.use(cors()); // Enable CORS for all requests

// Define your schema based on the API structure
const submissionSchema = new mongoose.Schema({
  formhub_uuid: { type: String },
  start: { type: Date },
  end: { type: Date },
  today: { type: Date },
  state: { type: String },
  lga: { type: String },
  afp: { type: String },
  email: { type: String },
  ward: { type: String },
  community: { type: String },
  hf: { type: String },
  semester: { type: String },
  oic: { type: String },
  designation: { type: String },
  client: { type: String },
  client_number: { type: String },
  clientcat: { type: String },
  sex: { type: String },
  age: { type: String },
  weight: { type: String },
  complaints: { type: String },
  lab_investigation: { type: String },
  diagnosis: { type: String },
  malaria: { type: String },
  treatment: { type: String },
  itn: { type: String },
  anaemia: { type: String },
  outcome_visit: { type: String },
  store_gps: { type: String },
  meta_instanceID: { type: String },
  _xform_id_string: { type: String },
  _uuid: { type: String },
  _attachments: { type: [String], default: [] },
  _status: { type: String },
  _geolocation: { type: [Number] },
  _submission_time: { type: Date },
  _validation_status: { type: Object, default: {} },
  _submitted_by: { type: String, default: null },
});

// API route to fetch submissions data
app.get("/api/submissions", async (req, res) => {
    try {
      const response = await axios.get(
        "https://eu.kobotoolbox.org/assets/a6arg9iDUcubfTc5FwQWsQ/submissions/?format=json"
      );
      res.json(response.data); // Send the data to the frontend
    } catch (error) {
      console.error("Error fetching data from KoboToolbox", error);
      res.status(500).send("Error fetching data");
    }
  });



// Create a Mongoose model
const Submission = mongoose.model("Submission", submissionSchema);

// MongoDB connection
mongoose
  .connect("mongodb://localhost:27017/OwujubeDB")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
  });

// Function to populate the database
const populateDatabase = async () => {
  try {
    // Fetch the data from the API
    const response = await axios.get(
      "https://eu.kobotoolbox.org/assets/a6arg9iDUcubfTc5FwQWsQ/submissions/?format=json"
    );

    const data = response.data;
    console.log(`Fetched ${data.length} entries from KoboToolbox`);

    // Clean the data: handle _id
    const cleanedData = data
      .filter((entry) => entry._id) // Or another field that is consistently present
      .map((entry) => {
        let cleanedEntry = { ...entry };

        // Handle _id correctly
        if (entry._id && mongoose.isValidObjectId(entry._id)) {
          cleanedEntry._id = new mongoose.Types.ObjectId(entry._id); // Use 'new' keyword here
        } else {
          delete cleanedEntry._id; // Remove invalid _id to let MongoDB generate one
        }

        return cleanedEntry;
      });

    console.log(`Inserting ${cleanedData.length} valid entries into the database`);

    // Insert the cleaned data into MongoDB
    await Submission.insertMany(cleanedData);
    console.log("Database populated with all entries successfully");
  } catch (error) {
    console.error("Error populating the database:", error.message);
  }
};

// Run the populate function
populateDatabase();

// Start the Express server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });