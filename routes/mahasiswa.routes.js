import express from "express";
import {
    getAllMahasiswa,
    tambahmahasiswabaru,
    cariMahasiswaByNIM,
    updateMahasiswa,
    deleteMahasiswa
} from "../controllers/mahasiswa.controllers.js";

const router = express.Router();
router.get("/", getAllMahasiswa);
router.post("/", tambahmahasiswabaru);
router.get("/:id", cariMahasiswaByNIM);
router.patch("/:id", updateMahasiswa);
router.delete("/:id", deleteMahasiswa);

export default router;