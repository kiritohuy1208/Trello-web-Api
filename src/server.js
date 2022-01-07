import express from "express";
import { mapOrder } from "*/utilities/sort.js";
const app = express();

const hostname = "localhost";
const port = 8017;
app.get("/", (req, res) => {
  res.send("Welcome to Api Trello");
});
app.listen(port, hostname, () => {
  console.log("Server api Trello start on port:" + port);
});
