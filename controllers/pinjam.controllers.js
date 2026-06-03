import Mahasiswas from "../models/mahasiswa.model.js";
import Pinjams from "../models/pinjam.model.js";
import Detail_pinjams from "../models/detail_pinjam.model.js";
import Bukus from "../models/buku.model.js";
import { Sequelize } from "sequelize";

export const insertPinjam = async (req, res) => {
    try {
        const data = await Pinjams.create(
            {
                tanggal_kembali: req.body.tanggal_kembali,
                tanggal_pinjam: req.body.tanggal_pinjam,
                nim: req.body.nim,
                pegawai_id: req.body.pegawai_id,
                detail_pinjams: req.body.detail_pinjams
            },
            {
                include: Detail_pinjams
            }
        );

        if (Pinjams && req.body.detail_pinjams) {

            for (let i = 0; i < req.body.detail_pinjams.length; i++) {
                Bukus.decrement(
                    { jumlah: req.body.detail_pinjams[i].jml_pinjam },
                    { where: { kode_buku: req.body.detail_pinjams[i].buku_id } }
                );
            }
        }

        res.json(data);
    } catch (error) {
        res.json({ message: error.message });
    }
};

export const getBukuDipinjam = async (req, res) => {
  try {
    const data = await Pinjams.findAll({
      attributes: [],

      where: {
        nim: req.params.nim,
      },

      include: [
        {
          model: Mahasiswas,
          attributes: ["nama"],
        },

        {
          model: Detail_pinjams,
          attributes: ["id", "jml_pinjam", "status"],

          where: {
            status: 1,
          },

          include: [
            {
              model: Bukus,
              attributes: ["judul"],
            },
          ],
        },
      ],
    });

    res.json(data);
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
};

export const pengembalianBuku = async (req, res) => {
    try {
        const { detail_kembali } = req.body;

        if (detail_kembali && detail_kembali.length > 0) {
            for (let i = 0; i < detail_kembali.length; i++) {
                const item = detail_kembali[i];
                const detailLama = await Detail_pinjams.findByPk(item.id);

                if (detailLama) {
                    // ini kalo jumlah kembali kelebihan
                    if (item.jml_kembali > detailLama.jml_pinjam) {
                        return res.status(400).json({ 
                            message: `Gagal! Buku ${detailLama.buku_id} hanya dipinjam ${detailLama.jml_pinjam}, tidak bisa dikembalikan ${item.jml_kembali}` 
                        });
                    }

                    if (item.jml_kembali === detailLama.jml_pinjam) {
                        // apabila Kembali Semua
                        await detailLama.update({ status: 2 });
                    } else {
                        // kalo ini Utk Kembali Sebagian 
                        await Detail_pinjams.create({
                            pinjam_id: detailLama.pinjam_id,
                            buku_id: detailLama.buku_id,
                            jml_pinjam: item.jml_kembali,
                            status: 2
                        });

                        await detailLama.update({
                            jml_pinjam: detailLama.jml_pinjam - item.jml_kembali
                        });
                    }

                    // 3. Sinkronisasi Stok pada Database
                    await Bukus.increment(
                        { jumlah: item.jml_kembali },
                        { where: { kode_buku: detailLama.buku_id } }
                    );
                }
            }
        }

        res.json({ message: "Pengembalian berhasil diproses!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const laporanPengembalian = async (req, res) => {
    try {
        const data = await Detail_pinjams.findAll({
            where: { status: 2 },
            attributes: ["jml_pinjam"],
            include: [
                {
                    model: Pinjams,
                    attributes: ["tanggal_kembali"],
                    include: [
                        {
                            model: Mahasiswas,
                            attributes: ["nim", "nama"]
                        }
                    ]
                },
                {
                    model: Bukus,
                    attributes: ["judul"]
                }
            ]
        });
        // Utk menghitung hari terlambat
        const hasilLaporan = data.map((item) => {
            // tanggal seharusnya kembali dari data DB
            const tglSeharusnya = new Date(item.pinjam.tanggal_kembali);
            
            // Ambil tanggal pengembalian (kita misalkan apor dibuat)
            const tglSekarang = new Date();

            // Ini utk htung selisih hariny
            const selisihWaktu = tglSekarang.getTime() - tglSeharusnya.getTime();
            const selisihHari = Math.ceil(selisihWaktu / (1000 * 3600 * 24 * 30));

            // Msl selisihHari negatif atau 0, berarti tidak ad kterlambatan
            const keterlambatan = selisihHari > 0 ? selisihHari : 0;

            return {
                nim: item.pinjam.mahasiswa.nim,
                nama: item.pinjam.mahasiswa.nama,
                judul_buku: item.buku.judul,
                jumlah_pinjam: item.jml_pinjam,
                tanggal_harus_kembali: item.pinjam.tanggal_kembali,
                hari_terlambat: keterlambatan + " Bulan"
            };
        });
        res.json(hasilLaporan);
    } catch (error) {
        res.json({ message: error.message });
    }
};

export const getAllPinjam = async (req, res) => {
    try {
        const data = await Pinjams.findAll({
            include: { model: Mahasiswas, attributes: ["nama", "nim"] },
        });
        res.json(data);
    } catch (error) {
        res.json({ message: error.message });
    }
};

export const tambahpinjambaru = async (req, res) => {
    try {
        const data = await Pinjams.create(req.body);
        res.json({ "message": "Data Pinjam berhasil disimpan" });
    } catch (error) {
        res.json({ message: error.message });
    }
};

export const cariPinjamByID = async (req, res) => {
    try {
        const data = await Pinjams.findAll({
            include: { model: Mahasiswas },
            where: {
                nim: req.params.id
            }
        });
        res.json(data[0]);
    } catch (error) {
        res.json({ message: error.message });
    }
};

export const updatePinjam = async (req, res) => {
    try {
        await Pinjams.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.json({ "message": "Data Pinjam berhasil diupdate" });
    } catch (error) {
        res.json({ message: error.message });
    }
};

export const deletePinjam = async (req, res) => {
    try {
        await Pinjams.destroy({
            where: {
                id: req.params.id
            }
        });
        res.json({ "message": "Data Pinjam berhasil dihapus" });
    } catch (error) {
        res.json({ message: error.message });
    }
};