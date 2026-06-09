import express from "express";
import {
    getAllPinjam,
    insertPinjam,
    tambahpinjambaru,
    cariPinjamByID,
    updatePinjam,
    deletePinjam,
    getBukuDipinjam,
    laporanPengembalian,
    pengembalianBuku
} from "../controllers/pinjam.controllers.js";
import { authenticateToken } from "../middleware/VerifyTokens.js";

const router = express.Router();
router.get("/", authenticateToken, getAllPinjam);
router.post("/", authenticateToken, insertPinjam);
router.get("/dipinjam/:nim", authenticateToken, getBukuDipinjam);
router.post("/kembali/", authenticateToken, pengembalianBuku);
router.get("/laporan", authenticateToken, laporanPengembalian);
router.post("/", authenticateToken, tambahpinjambaru);
router.get("/caripinjam/:id", authenticateToken, cariPinjamByID);
router.patch("/:id", authenticateToken, updatePinjam);
router.delete("/:id", authenticateToken, deletePinjam);

export default router;