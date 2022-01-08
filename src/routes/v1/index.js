import express from "express";
import { HttpStatusCode } from "*/utilities/constants";
import { BoardRoute } from "./board.route";
const router = express.Router();

router.get("/status", (req, res) => {
  res.status(HttpStatusCode.OK).json({ status: "OK" });
});
router.use("/boards", BoardRoute);
export const apiV1 = router;
