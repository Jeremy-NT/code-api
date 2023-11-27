// const express = require("express");

// const app = express();

const mongoose = require("mongoose");

async function StartServer(app) {
  try {
    const uri = `mongodb+srv://Yramm:Fafajay11@hughesapi.hnrn2xr.mongodb.net/OPC-BLOG-API?retryWrites=true&w=majority`;

    await mongoose.connect(uri);
    console.log("Connected to database");

    app.listen(9000, () => {
      console.log("Blog API app is running on port 9000");
    });
  } catch (err) {
    console.log(err);
  }
}

module.exports = StartServer;
