import { Sequelize } from "sequelize";
import mysql2 from "mysql2";
const db = new Sequelize ('defaultdb', 'avnadmin', 'AVNS_Jd5Bx5Bgsk56hHoW9kf', {
    host: "mysql-7793bcc-web-lanjut.h.aivencloud.com",
    dialect: "mysql",
    port: "16602",
    dialectOptions: { ssl: { rejectUnauthorized: false } }, 
    "define": {
        "timestamps": false
    }
});
export default db;

// (async()=>{
//     await db.sync();
// }) ();
