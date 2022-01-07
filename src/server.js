import express from "express";
import { connectDB } from "*/config/mongodb";
import { env } from "*/config/env";
const app = express();

const host = env.HOST || "localhost";
const port = env.PORT || 8017;

connectDB().catch(console.log);
app.get("/", (req, res) => {
  res.send("Welcome to Api Trello");
});
app.listen(port, host, () => {
  console.log("Server api Trello start on port:" + port);
});
