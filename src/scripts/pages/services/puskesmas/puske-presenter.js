class PuskePresenter {
  constructor({ view, container }) {
    this._view = view;
    this._container = container;

    if (!this._view || typeof this._view.displayContent !== "function") {
      throw new Error(
        "Presenter membutuhkan View dengan metode displayContent!"
      );
    }
    if (!this._container) {
      throw new Error("Presenter membutuhkan elemen container!");
    }
  }

  async showPuskesmasData() {
    const dataPuskesmas = [
      {
        nama: "Puskesmas Bandarharjo",
        telepon: "(024) 3564787",
        kecamatan: "Semarang Utara",
        alamat: "Jln.Layur No. 93",
      },
      {
        nama: "Puskesmas Bugangan",
        telepon: "(024) 3546061",
        kecamatan: "Semarang Timur",
        alamat: "Jln. Cilosari No. 1; Semarang Timur",
      },
      {
        nama: "Puskesmas Bulu Lor",
        telepon: "(024) 3548550",
        kecamatan: "Semarang Utara",
        alamat: "Jl. Banowati Selatan II; Semarang Utara",
      },
      {
        nama: "Puskesmas Candilama",
        telepon: "(024) 8310515",
        kecamatan: "Semarang Selatan",
        alamat: "Jl. Wahidin No. 22; Semarang Selatan",
      },
      {
        nama: "Puskesmas Gayamsari",
        telepon: "(024) 6711855",
        kecamatan: "Gayamsari",
        alamat: "Jl. Slamet Riyadi; Kecamatan Gayamsari",
      },
      {
        nama: "Puskesmas Genuk",
        telepon: "(024) 6584188",
        kecamatan: "Genuk",
        alamat: "Jl. Genuksari; Kecamatan Genuk",
      },
      {
        nama: "Puskesmas Kagok",
        telepon: "(024) 8312573",
        kecamatan: "Candisari",
        alamat: "Jl. Telomoyo No. 3; Kecamatan Candisari",
      },
      {
        nama: "Puskesmas Karanganyar",
        telepon: "(024) 8662080",
        kecamatan: "Tugu",
        alamat: "Jl. Karanganyar; Kecamatan Tugu",
      },
      {
        nama: "Puskesmas Karangayu",
        telepon: "(024) 7606065",
        kecamatan: "Semarang Barat",
        alamat: "Jl. Kenconowungu III No. 28; Semarang Barat",
      },
      {
        nama: "Puskesmas Kedungmundu",
        telepon: "(024) 6717053",
        kecamatan: "Tembalang",
        alamat: "Jl. Sambiroto; Semarang Barat",
      },
      {
        nama: "Puskesmas Krobokan",
        telepon: "(024) 7610084",
        kecamatan: "Semarang Barat",
        alamat: "Jl. Ari Buana I/XIII; Semarang Barat",
      },
      {
        nama: "Puskesmas Lamper Tengah",
        telepon: "(024) 8444808",
        kecamatan: "Semarang Selatan",
        alamat: "Jl. Kel. Lamper Tgh Gg. VII; Semarang Selatan",
      },
      {
        nama: "Puskesmas Lebdosari",
        telepon: "(024) 7610207",
        kecamatan: "Semarang Barat",
        alamat: "Jl. Taman Lebdosari; Semarang Barat",
      },
      {
        nama: "Puskesmas Manyaran",
        telepon: "(024) 7601883",
        kecamatan: "Semarang Barat",
        alamat: "Jl. Abdul Rahman Saleh No. 267; Semarang Barat",
      },
      {
        nama: "Puskesmas Miroto",
        telepon: "(024) 3552542",
        kecamatan: "Semarang Tengah",
        alamat: "Jl. Taman Seteran Barat No. 3; Semarang Tengah",
      },
      {
        nama: "Puskesmas Ngemplak Simongan",
        telepon: "(024) 7610212",
        kecamatan: "Semarang Barat",
        alamat: "Jl. Srinindito 48/II; Semarang Barat",
      },
      {
        nama: "Puskesmas Padangsari",
        telepon: "(024) 7472460",
        kecamatan: "Banyumanik",
        alamat: "Jl. Meranti Raya No. 389; Banyumanik",
      },
      {
        nama: "Puskesmas Pandanaran",
        telepon: "(024) 8311470",
        kecamatan: "Semarang Selatan",
        alamat: "Jl. Pandanaran No. 79; Semarang Selatan",
      },
      {
        nama: "Puskesmas Pegandan",
        telepon: "(024) 8445809",
        kecamatan: "Gajah Mungkur",
        alamat: "Jl. Kendeng Barat III/2; Gajah Mungkur",
      },
      {
        nama: "Puskesmas Poncol",
        telepon: "(024) 3546053",
        kecamatan: "Semarang Tengah",
        alamat: "Jl. Imam Bonjol No. 114; Semarang Tengah",
      },
      {
        nama: "Puskesmas Pudakpayung",
        telepon: "(024) 7462711",
        kecamatan: "Banyumanik",
        alamat: "Jl. Perintis Kemerdekaan; Banyumanik",
      },
      {
        nama: "Puskesmas Purwoyoso",
        telepon: "(024) 7612927",
        kecamatan: "Ngaliyan",
        alamat: "Jl. Jend. Sudirman; Ngaliyan",
      },
      {
        nama: "Puskesmas Rowosari",
        telepon: "(024) 76414169",
        kecamatan: "Tembalang",
        alamat: "Jl. Rowosari; Semarang Barat",
      },
      {
        nama: "Puskesmas Sekaran",
        telepon: "(024) 8508322",
        kecamatan: "Gunung Pati",
        alamat: "Jl. Raya Sekaran; Gunung Pati",
      },
      {
        nama: "Puskesmas Tambakaji",
        telepon: "(024) 8661743",
        kecamatan: "Ngaliyan",
        alamat: "Jl. Raya Walisongo; Ngaliyan",
      },
      {
        nama: "Puskesmas Telogosari Wetan",
        telepon: "(024) 8713083",
        kecamatan: "Pedurungan",
        alamat: "Jl. Tlogosari; Semarang Timur",
      },
      {
        nama: "Puskesmas Bangetayu",
        telepon: "(024) 6584353",
        kecamatan: "Genuk",
        alamat: "Jl. Bangetayu Genuk; Genuk",
      },
      {
        nama: "Puskesmas Gunungpati",
        telepon: "(024) 6932140",
        kecamatan: "Gunung Pati",
        alamat: "Jl. Raya Gunung Pati; Gunungpati",
      },
      {
        nama: "Puskesmas Halmahera",
        telepon: "(024) 8414894",
        kecamatan: "Semarang Timur",
        alamat: "Jl. Halmahera Raya No. 38; Semarang Timur",
      },
      {
        nama: "Puskesmas Karangdoro",
        telepon: "(024) 3540035",
        kecamatan: "Semarang Timur",
        alamat: "Jl. Raden Patah No. 178; Semarang Timur",
      },
      {
        nama: "Puskesmas Karangmalang",
        telepon: "(024) 70783410",
        kecamatan: "Ngaliyan",
        alamat: "Jl. Karang Malang; Mijen",
      },
      {
        nama: "Puskesmas Mangkang",
        telepon: "(024) 8660675",
        kecamatan: "Tugu",
        alamat: "Jl. Raya Mangkang; Mangkang",
      },
      {
        nama: "Puskesmas Mijen",
        telepon: "(024) 7711083",
        kecamatan: "Mijen",
        alamat: "Jl. Raya Mijen; Mijen",
      },
      {
        nama: "Puskesmas Ngesrep",
        telepon: "(024) 7474113",
        kecamatan: "Banyumanik",
        alamat: "Jl. Teuku Umar No. 271; Banyumanik",
      },
      {
        nama: "Puskesmas Ngaliyan",
        telepon: "(024) 7608795",
        kecamatan: "Ngaliyan",
        alamat: "Jl. Wismasari; Ngaliyan",
      },
      {
        nama: "Puskesmas Srondol",
        telepon: "(024) 7472852",
        kecamatan: "Banyumanik",
        alamat: "Jl. Setia Budi No. 209; Banyumanik",
      },
      {
        nama: "Puskesmas Telogosari Kulon",
        telepon: "(024) 6717051",
        kecamatan: "Pedurungan",
        alamat: "Jl. Tmn Satrio Manah No. 2; Semarang Timur",
      },
    ];

    try {
      this._view.displayContent(this._container, dataPuskesmas);
    } catch (error) {
      console.error("Gagal menampilkan data puskesmas:", error);
      this._container.innerHTML =
        '<p class="text-danger text-center">Terjadi kesalahan saat memuat data puskesmas.</p>';
    }
  }
}

export default PuskePresenter;
