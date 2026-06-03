import express from "express";

import {
    getAllDetailPinjam,
    tambahdetailpinjambaru,
    cariDetailPinjamByID,
    updateDetailPinjam,
    deleteDetailPinjam
} from "../controllers/detail_pinjam.controllers.js";
import { authenticateToken } from "../middleware/VerifyTokens.js";

const router = express.Router();
router.get("/", authenticateToken, getAllDetailPinjam);
router.post("/", tambahdetailpinjambaru);
router.get("/:id", cariDetailPinjamByID);
router.patch("/:id", updateDetailPinjam);
router.delete("/:id", deleteDetailPinjam);


export default router;