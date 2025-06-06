console.log("Loading .env file from:", __dirname + '/.env');
require('dotenv').config({ path: __dirname + '/.env' });
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const { startAgenda } = require("./services/emailService");
const emailRoutes = require("./routes/emailRoutes");
const campaignRoutes = require("./routes/campaignRoutes");
const config = require("./config");
const path = require('path');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });


const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
connectDB();

// Start Agenda
startAgenda();

// Routes
app.use("/", emailRoutes);
app.use("/", campaignRoutes);

const port = process.env.PORT || 10000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});