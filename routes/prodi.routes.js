import express from "express";
import {
    getAllProdi,
    tambahprodisbaru,
    cariProdiByID,
    updateProdi,
    deleteProdi
} from "../controllers/prodi.controllers.js";
import { authenticateToken } from "../middleware/VerifyTokens.js";

const router = express.Router();
router.get("/", authenticateToken, getAllProdi);
router.post("/", authenticateToken, tambahprodisbaru);
router.get("/:id", authenticateToken, cariProdiByID);
router.patch("/:id", authenticateToken, updateProdi);
router.delete("/:id", authenticateToken, deleteProdi);

export default router;