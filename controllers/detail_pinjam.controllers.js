import Detail_pinjams from "../models/detail_pinjam.model.js";
import { Sequelize } from "sequelize";
import Bukus from "../models/buku.model.js";

export const getAllDetailPinjam=async (req, res)=>{
    try {
        const data= await Detail_pinjams.findAll({
            include: { model: Bukus },
        });
        res.json(data);
    } catch (error) {
        res.json({message:error.message});
    }
};

export const tambahdetailpinjambaru=async (req, res)=>{
    try {
        const data= await Detail_pinjams.create(req.body);
        res.json({"message":"Data Detail Pinjam berhasil disimpan"});
    } catch (error) {
        res.json({message:error.message});
    }
};

export const cariDetailPinjamByID=async (req, res)=>{
    try {
        const data= await Detail_pinjams.findAll({
            where:{ 
                id:req.params.id
            }
        });
        res.json(data[0]);
    } catch (error) {
        res.json({message:error.message});
    }
};

export const updateDetailPinjam = async (req, res) => {
    try {
        await Detail_pinjams.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.json({ "message": "Data Detail Pinjam berhasil diupdate" });
    } catch (error) {
        res.json({ message: error.message });
    }
};

export const deleteDetailPinjam = async (req, res) => {
    try {
        await Detail_pinjams.destroy({
            where: {
                id: req.params.id
            }
        });
        res.json({ "message": "Data Detail Pinjam berhasil dihapus" });
    } catch (error) {
        res.json({ message: error.message });
    }
};