const express = require("express");
const mongoose = require("mongoose");
const axios = require("axios");

const app = express();
const PORT = 3000;

// Setting EJS
app.set("view engine", "ejs");

// MongoDB URI
const mongoURI =
  "mongodb+srv://Bokantii:hQXZX9PtxdKFmHyv@alpha.czgrf.mongodb.net/kobotoolbox?retryWrites=true&w=majority&appName=Alpha";

const connectToDatabase = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
};

// model for the fetched data
const DataSchema = new mongoose.Schema({
  _id: Number,
  "formhub/uuid": String,
  start: Date,
  end: Date,
  today: Date,
  state: String,
  lga: String,
  afp: String,
  email: String,
  ward: String,
  community: String,
  hf: String,
  semester: String,
  oic: String,
  designation: String,
  client: String,
  client_number: String,
  clientcat: String,
  sex: String,
  pregnant: String,
  age: String,
  weight: String,
  complaints: String,
  lab_investigation: String,
  diagnosis: String,
  malaria: String,
  treatment: String,
  sp_preggy: String,
  sp_specificmedicine: String,
  itn: String,
  anaemia: String,
  outcome_visit: String,
  store_gps: String,
  __version__: String,
  "meta/instanceID": String,
  _xform_id_string: String,
  _uuid: String,
  _attachments: Array,
  _status: String,
  _geolocation: Array,
  _submission_time: Date,
  _tags: Array,
  _notes: Array,
  _validation_status: Object,
  _submitted_by: String,
  act_treatment: String,
  act3_treatment: String,
});

const DataModel = mongoose.model("Data", DataSchema);

// a route to fetch data from the API
app.get("/fetch-data", async (req, res) => {
  try {
    const url =
      "https://eu.kobotoolbox.org/assets/a6arg9iDUcubfTc5FwQWsQ/submissions/?format=json";

    // Fetch data using axios
    const response = await axios.get(url);
    const data = response.data; // Extract the data from the response

    res.json(data); // raw data fetch and display it in browser

    // iterate and save or update it in MongoDB
    const promises = data.map(async (item) => {
      try {
        // findOneAndUpdate to update an document exist or insert if itss not found
        await DataModel.findOneAndUpdate(
          { _id: item._id }, // find it by the id
          item,
          { upsert: true, new: true, setDefaultsOnInsert: true } // Options to insert if the document wasnt found
        );
      } catch (err) {
        console.error(
          `Error updating or inserting document with _id ${item._id}:`,
          err
        );
      }
    });

    //all data to be saved
    await Promise.all(promises);
    res.send("Data has been fetched and uploaded to MongoDB");
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("An error occurred");
  }
});
// a route to display data in a table
app.get("/display-data", async (req, res) => {
  try {
    const allData = await DataModel.find(); // Fetch all data from the MongoDB collection
    res.render("data", { data: allData }); // Render the 'data.ejs' file in the view folder
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("An error occurred while fetching data");
  }
});
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  connectToDatabase();
});
