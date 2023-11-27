const express = require("express");
const mongoose = require("mongoose");
const StartServer = require("./controllers/serverController");
const cors = require("cors");

const app = express();
app.use(
  cors({
    origin: "*",
  })
); // Use cors middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Route Files
const authRoute = require("./routes/authRoute");
const userRoute = require("./routes/userRoute");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api", authRoute);
app.use("/api", userRoute);

StartServer(app);
