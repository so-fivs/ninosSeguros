const express = require("express");
const cors = require("cors");
const app = express();
const mysql = require("mysql");

require("dotenv").config();

const port = process.env.PORT || 5000;

app.get("/", (req,res) => {
   res.send("Mensaje");
});

app.listen(port, () => {
   console.log(`Server is running  in port: ${port}`);
});