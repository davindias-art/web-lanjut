import express from "express";

import {
    getAllProducts,
    tambahbukubaru,
    cariBukuByID,
    updateBuku,
    deleteBuku
} from "../controllers/buku.controllers.js";


const router = express.Router();
router.get("/", getAllProducts);
router.post("/", tambahbukubaru);
router.get("/:id", cariBukuByID);
router.patch("/:id", updateBuku);
router.delete("/:id", deleteBuku);


export default router;