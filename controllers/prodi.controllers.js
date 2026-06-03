import Prodis from "../models/prodi.model.js";
import { Sequelize } from "sequelize";

export const getAllProdi=async (req, res)=>{
    try {
        const data= await Prodis.findAll();
        res.json(data);
    } catch (error) {
        res.json({message:error.message});
    }
};

export const tambahprodisbaru=async (req, res)=>{
    try {
        const data= await Prodis.create(req.body);
        res.json({"message":"Data Prodi berhasil disimpan"});
    } catch (error) {
        res.json({message:error.message});
    }
};

export const cariProdiByID=async (req, res)=>{
    try {
        const data= await Prodis.findAll({
            where:{ 
                kode_prodi:req.params.id
            }
        });
        res.json(data[0]);
    } catch (error) {
        res.json({message:error.message});
    }
};

export const updateProdi = async (req, res) => {
    try {
        await Prodis.update(req.body, {
            where: {
                kode_prodi: req.params.id
            }
        });
        res.json({ "message": "Data Prodi berhasil diupdate" });
    } catch (error) {
        res.json({ message: error.message });
    }
};

export const deleteProdi = async (req, res) => {
    try {
        await Prodis.destroy({
            where: {
                kode_prodi: req.params.id
            }
        });
        res.json({ "message": "Data Prodi berhasil dihapus" });
    } catch (error) {
        res.json({ message: error.message });
    }
};