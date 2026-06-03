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

const router = express.Router();
router.get("/", getAllPinjam);
router.post("/", insertPinjam);
router.get("/dipinjam/:nim", getBukuDipinjam);
router.post("/kembali/", pengembalianBuku);
router.get("/laporan", laporanPengembalian);
router.post("/", tambahpinjambaru);
router.get("/caripinjam/:id", cariPinjamByID);
router.patch("/:id", updatePinjam);
router.delete("/:id", deletePinjam);

export default router;