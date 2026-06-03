import express from "express";
import {
    getAllProdi,
    tambahprodisbaru,
    cariProdiByID,
    updateProdi,
    deleteProdi
} from "../controllers/prodi.controllers.js";

const router = express.Router();
router.get("/", getAllProdi);
router.post("/", tambahprodisbaru);
router.get("/:id", cariProdiByID);
router.patch("/:id", updateProdi);
router.delete("/:id", deleteProdi);

export default router;