import express from "express";

import {
    getAllProducts,
    tambahbukubaru,
    cariBukuByID,
    updateBuku,
    deleteBuku
} from "../controllers/buku.controllers.js";
import { authenticateToken } from "../middleware/VerifyTokens.js";

const router = express.Router();
router.get("/", authenticateToken, getAllProducts);
router.post("/", authenticateToken, tambahbukubaru);
router.get("/:id", authenticateToken, cariBukuByID);
router.patch("/:id", authenticateToken, updateBuku);
router.delete("/:id", authenticateToken, deleteBuku);


export default router;