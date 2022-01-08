import express from "express";
import { connectDB } from "*/config/mongodb";
import { env } from "*/config/env";
import { apiV1 } from "*/routes/v1";

const host = env.APP_HOST || "localhost";
const port = env.APP_PORT || 8017;

connectDB()
  .then(() => console.log("Connect db successfull"))
  .then(() => bootServer())
  .catch((error) => {
    console.log(error);
    process.exit(1); // stop app
  });

const bootServer = () => {
  const app = express();

  app.use(express.json());

  app.use("/v1", apiV1);

  app.get("/test", async (req, res) => {
    res.send("Welcome to Api Trello");
  });
  app.listen(port, host, () => {
    console.log("Server api Trello start on port:" + port);
  });
};
