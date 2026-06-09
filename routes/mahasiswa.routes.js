import express from "express";
import {
    getAllMahasiswa,
    tambahmahasiswabaru,
    cariMahasiswaByNIM,
    updateMahasiswa,
    deleteMahasiswa
} from "../controllers/mahasiswa.controllers.js";
import { authenticateToken } from "../middleware/VerifyTokens.js";

const router = express.Router();
router.get("/", authenticateToken, getAllMahasiswa);
router.post("/", authenticateToken, tambahmahasiswabaru);
router.get("/:id", authenticateToken, cariMahasiswaByNIM);
router.patch("/:id", authenticateToken, updateMahasiswa);
router.delete("/:id", authenticateToken, deleteMahasiswa);

export default router;