import express from "express";
import {
    tambahuser, login, getAllUser,
} from "../controllers/user.controllers.js";
import { authenticateToken } from "../middleware/VerifyTokens.js";
const routerUser = express.Router();
routerUser.post("/", tambahuser);
routerUser.get("/", getAllUser);
routerUser.post("/login", login);
routerUser.get("/dashboard", authenticateToken, (req, res) => {
    res.send("Welcome to the dashboard!");
});
export default routerUser;
