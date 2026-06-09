import multer from 'multer';
import express from "express";
import db from "./config/db.config.js";
import router from "./routes/buku.routes.js";
import mahasiswas from "./routes/mahasiswa.routes.js";
import prodis from "./routes/prodi.routes.js";
import pinjams from "./routes/pinjam.routes.js";
import detail_pinjams from "./routes/detail_pinjam.routes.js";
import cors from "cors";
import User from './routes/user.router.js';

const app = express();
try {
    await db.authenticate();
    console.log("Database connected");
    await db.sync();
    console.log("Database synced");
} catch (error) {
    console.log("belum konek", error);
}
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/',(req,res)=>{
res.json({message:"Hello coba backend untuk vercel"});
});
app.use('/api/buku', router);
app.use('/api/mahasiswa',mahasiswas);
app.use('/api/prodi',prodis);
app.use('/api/pinjam',pinjams);
app.use('/api/detail_pinjam',detail_pinjams);
app.use('/api/user',User);

app.listen(5000);
