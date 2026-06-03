import { Sequelize } from "sequelize";
import db from "../config/db.config.js";
import ref_pinjam from "./pinjam.model.js";
import Pinjams from "./pinjam.model.js";
import Buku from "./buku.model.js";

const { DataTypes } = Sequelize;

const Detail_pinjams = db.define(
    "detail_pinjams", 
{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    pinjam_id: {
        type: DataTypes.INTEGER,
    },
    buku_id: {
        type: DataTypes.INTEGER,
    },
    jml_pinjam: {
        type: DataTypes.INTEGER,
    },
    status: {
        type: DataTypes.INTEGER,
    },
    created_at: {
        type: DataTypes.DATE,
    },
    updated_at: {
        type: DataTypes.DATE,
    },
}, {
    freezeTableName: true,
});

Buku.hasMany(Detail_pinjams, { foreignKey: "buku_id" });
Detail_pinjams.belongsTo(Buku, { foreignKey: "buku_id" });

Pinjams.hasMany(Detail_pinjams, { foreignKey: "pinjam_id" });
Detail_pinjams.belongsTo(Pinjams, { foreignKey: "pinjam_id" });

export default Detail_pinjams;