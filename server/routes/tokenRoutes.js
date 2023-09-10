import express from "express";
import { authToken } from "../middlewares/authToken.js";
import { setRefreshToken } from "../controllers/tokenControllers.js";

const tokenRoutes = express.Router();

tokenRoutes.route("/").post(authToken, setRefreshToken);

export default tokenRoutes;
