const express = require("express");
const mongoose = require("mongoose");
const axios = require("axios");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors());

// MongoDB Atlas connection string
const uri =
  "mongodb+srv://Bokantii:hQXZX9PtxdKFmHyv@alpha.czgrf.mongodb.net/kobotoolbox?retryWrites=true&w=majority&appName=Alpha";

// MongoDB schema for submissions
const submissionSchema = new mongoose.Schema({
  formhub_uuid: { type: String, required: true },
  start: { type: Date, required: true },
  end: { type: Date, required: true },
  today: { type: Date, required: true },
  state: { type: String, required: true },
  lga: { type: String, required: true },
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
  weight: { type: Number },
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

// Create a mongoose model for the submissions
const Submission = mongoose.model("Submission", submissionSchema);



// Function to fetch and insert data from API into MongoDB
const populateDatabase = async () => {
  try {
    const response = await axios.get(
      "https://eu.kobotoolbox.org/assets/a6arg9iDUcubfTc5FwQWsQ/submissions/?format=json"
    );
    const data = response.data;

    // Ensure data is an array
    if (!Array.isArray(data)) {
      console.error("Data from API is not in an array format.");
      return;
    }

    // Clean the data: Remove _id and filter entries missing required fields
    const cleanedData = data.map((entry) => {
      const { _id, ...rest } = entry;
      return rest;
    });

    // Insert cleaned data in batches
    const batchSize = 500;
    for (let i = 0; i < cleanedData.length; i += batchSize) {
      const batch = cleanedData.slice(i, i + batchSize);
      await Submission.insertMany(batch);
      console.log(`Inserted ${batch.length} documents successfully.`);
    }

    console.log("Database populated with all entries.");
  } catch (error) {
    console.error("Error populating the database:", error.message);
  }
};

// Connect to MongoDB Atlas
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Successfully connected to MongoDB Atlas.");

    // Endpoint to populate database from the API
    app.get("/populate", async (req, res) => {
      try {
        await populateDatabase();
        res.status(200).send("Database populated successfully.");
      } catch (error) {
        console.error("Error in /populate endpoint:", error);
        res.status(500).send("Error populating the database.");
      }
    });

    // Proxy endpoint to fetch and send data from the API
    app.get("/proxy", async (req, res) => {
      try {
        const response = await axios.get(
          "https://eu.kobotoolbox.org/assets/a6arg9iDUcubfTc5FwQWsQ/submissions/?format=json"
        );
        res.json(response.data); // Send the data back to the client
      } catch (error) {
        res.status(500).send("Error fetching data from API.");
      }
    });

    // Start the Express server
    app.listen(port, () => {
      console.log(`Server running on port ${port}.`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB Atlas:", error.message);
  });
