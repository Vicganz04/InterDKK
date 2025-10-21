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
        alamat: "Jln. Layur no. 93",
        instagram: "puskesmas_bandarharjo",
      },
      {
        nama: "Puskesmas Bugangan",
        telepon: "(024) 3546061",
        kecamatan: "Semarang Timur",
        alamat: "Jl. Musi Raya No.22, Bugangan",
        instagram: "puskesmasbugangan",
      },
      {
        nama: "Puskesmas Bulu Lor",
        telepon: "(024) 3548550",
        kecamatan: "Semarang Utara",
        alamat: "Jl. Banowati Selatan II No. 14, Semarang Utara",
        instagram: "puskesmas_bululor",
      },
      {
        nama: "Puskesmas Candilama",
        telepon: "(024) 8310515",
        kecamatan: "Semarang Selatan",
        alamat: "Jl. Wahidin No. 22, Jombang, Semarang Selatan",
        instagram: "pkmcandilama",
      },
      {
        nama: "Puskesmas Gayamsari",
        telepon: "(024) 6711855",
        kecamatan: "Gayamsari",
        alamat: "Jl. Slamet Riyadi No.4A, Gayamsari",
        instagram: "puskesmasgayamsari",
      },
      {
        nama: "Puskesmas Genuk",
        telepon: "(024) 6584188",
        kecamatan: "Genuk",
        alamat: "Jl. Genuksari, Genuk",
        instagram: "puskesmasgenuk",
      },
      {
        nama: "Puskesmas Kagok",
        telepon: "(024) 8312573",
        kecamatan: "Candisari",
        alamat: "Jl. Telomoyo No. 3, Wonotinggal",
        instagram: "puskesmaskagok",
      },
      {
        nama: "Puskesmas Karanganyar",
        telepon: "(024) 8662080",
        kecamatan: "Tugu",
        alamat: "Jalan Tirto No. 29E, Karanganyar",
        instagram: "puskesmaskaranganyar",
      },
      {
        nama: "Puskesmas Karangayu",
        telepon: "(024) 7606065",
        kecamatan: "Semarang Barat",
        alamat: "Jl. Kenconowungu III No. 28, Karangayu",
        instagram: "pkmkarangayu",
      },
      {
        nama: "Puskesmas Kedungmundu",
        telepon: "(024) 6717053",
        kecamatan: "Tembalang",
        alamat: "Jl. Sambiroto, RT.01/RW.01,Sambiroto",
        instagram: "puskesmaskedungmundu",
      },
      {
        nama: "Puskesmas Krobokan",
        telepon: "(024) 7610084",
        kecamatan: "Semarang Barat",
        alamat: "Jl. Ari Buana I/XIII, Krobokan",
        instagram: "puskesmas_krobokan",
      },
      {
        nama: "Puskesmas Lamper Tengah",
        telepon: "(024) 8444808",
        kecamatan: "Semarang Selatan",
        alamat: "Jl. Lamper Tengah Gg XV, Lamper Tengah",
        instagram: "puskesmas.lampertengah",
      },
      {
        nama: "Puskesmas Lebdosari",
        telepon: "(024) 7610207",
        kecamatan: "Semarang Barat",
        alamat: "Jl. Taman Lebdosari, Semarang Barat",
        instagram: "pkmlebdosari",
      },
      {
        nama: "Puskesmas Manyaran",
        telepon: "(024) 7601883",
        kecamatan: "Semarang Barat",
        alamat: "Jl. Abdul Rahman Saleh No. 267, Kembangarum",
        instagram: "puskesmas_manyaran",
      },
      {
        nama: "Puskesmas Miroto",
        telepon: "(024) 3552542",
        kecamatan: "Semarang Tengah",
        alamat: "Jl. Taman Seteran Barat No. 3, Miroto",
        instagram: "puskesmasmiroto",
      },
      {
        nama: "Puskesmas Ngemplak Simongan",
        telepon: "(024) 7610212",
        kecamatan: "Semarang Barat",
        alamat: "Jl. Srinindito IV RT 08/ RW 01, Ngemplak Simongan",
        instagram: "pkm_ngemplaksmg",
      },
      {
        nama: "Puskesmas Padangsari",
        telepon: "(024) 7472460",
        kecamatan: "Banyumanik",
        alamat: "Jl. Meranti Raya No. 389, Padangsari",
        instagram: "puskesmaspadangsari",
      },
      {
        nama: "Puskesmas Pandanaran",
        telepon: "(024) 8311470",
        kecamatan: "Semarang Selatan",
        alamat: "Jl. Pandanaran No. 79, Mugassari",
        instagram: "puskesmaspandanaran",
      },
      {
        nama: "Puskesmas Pegandan",
        telepon: "(024) 8445809",
        kecamatan: "Gajah Mungkur",
        alamat: "Jl. Lamongan Raya No. 02, Sampangan",
        instagram: "pegandanpuskesmas",
      },
      {
        nama: "Puskesmas Poncol",
        telepon: "(024) 3546053",
        kecamatan: "Semarang Tengah",
        alamat: "Jl. Imam Bonjol No. 114, Sekayu",
        instagram: "puskesmasponcol",
      },
      {
        nama: "Puskesmas Pudakpayung",
        telepon: "(024) 7462711",
        kecamatan: "Banyumanik",
        alamat: "Jl. Payung Mas Raya, Pudakpayung",
        instagram: "puskesmaspudakpayung",
      },
      {
        nama: "Puskesmas Purwoyoso",
        telepon: "(024) 7612927",
        kecamatan: "Ngaliyan",
        alamat: "Jl. Siliwangi No.572, Purwoyoso",
        instagram: "puskesmaspurwoyoso",
      },
      {
        nama: "Puskesmas Rowosari",
        telepon: "(024) 76414169",
        kecamatan: "Tembalang",
        alamat: "Jalan Tunggu Raya, Rowosari",
        instagram: "puskesmasrowosari_semarang",
      },
      {
        nama: "Puskesmas Sekaran",
        telepon: "(024) 8508322",
        kecamatan: "Gunung Pati",
        alamat: "Jl. Sekaran Raya Gang Rambutan No. 44 Gunungpati",
        instagram: "puskesmassekaran",
      },
      {
        nama: "Puskesmas Tambakaji",
        telepon: "(024) 8661743",
        kecamatan: "Ngaliyan",
        alamat: "Jl.Raya Walisongo, KM.9 Tambakaji",
        instagram: "puskesmastambakaji",
      },
      {
        nama: "Puskesmas Tlogosari Wetan",
        telepon: "(024) 8713083",
        kecamatan: "Pedurungan",
        alamat: "Jl. Soekarno Hatta No.6, Tlogosari Kulon",
        instagram: "puskesmas_tlogosariwetan",
      },
      {
        nama: "Puskesmas Bangetayu",
        telepon: "(024) 6584353",
        kecamatan: "Genuk",
        alamat: "Jl. Bangetayu, Genuk",
        instagram: "puskesmasbangetayu",
      },
      {
        nama: "Puskesmas Gunungpati",
        telepon: "(024) 6932140",
        kecamatan: "Gunung Pati",
        alamat: "Jl. Mr. Wuryanto No.38, Plalangan",
        instagram: "puskesmasgunungpati",
      },
      {
        nama: "Puskesmas Halmahera",
        telepon: "(024) 8414894",
        kecamatan: "Semarang Timur",
        alamat: "Jl. Halmahera Raya No. 38, Semarang Timur",
        instagram: "pkmhalmahera",
      },
      {
        nama: "Puskesmas Karangdoro",
        telepon: "(024) 3540035",
        kecamatan: "Semarang Timur",
        alamat: "Jl. Raden Patah No. 178, Rejomulyo",
        instagram: "pkmkarangdoro",
      },
      {
        nama: "Puskesmas Karangmalang",
        telepon: "(024) 76671710",
        kecamatan: "Mijen",
        alamat: "Jl. RM. Soebagiono Tjondro Koesoemo,",
        instagram: "puskesmas_karangmalangsmg",
      },
      {
        nama: "Puskesmas Mangkang",
        telepon: "(024) 8660675",
        kecamatan: "Tugu",
        alamat: "Jl. Jend. Urip Sumoharjo KM 16, Mangkang Kulon",
        instagram: "puskesmas.mangkang",
      },
      {
        nama: "Puskesmas Mijen",
        telepon: "(024) 7711083",
        kecamatan: "Mijen",
        alamat: "JL. RM. Hadisoebono. No 5, Tambangan",
        instagram: "puskesmasmijensemarang",
      },
      {
        nama: "Puskesmas Ngesrep",
        telepon: "(024) 7474113",
        kecamatan: "Banyumanik",
        alamat: "Jl. Teuku Umar No. 271, Ngesrep",
        instagram: "puskesmas_ngesrep",
      },
      {
        nama: "Puskesmas Ngaliyan",
        telepon: "(024) 7608795",
        kecamatan: "Ngaliyan",
        alamat: "JJl. Wismasari Raya No.18D, Ngaliyan",
        instagram: "puskesmas_ngaliyan",
      },
      {
        nama: "Puskesmas Srondol",
        telepon: "(024) 7472852",
        kecamatan: "Banyumanik",
        alamat: "Jl. Setia Budi No. 209, Srondol Kulon",
        instagram: "puskesmassrondol27",
      },
      {
        nama: "Puskesmas Tlogosari Kulon",
        telepon: "(024) 6717051",
        kecamatan: "Pedurungan",
        alamat: "Jl. Tmn Satrio Manah No. 2, Tlogosari Kulon",
        instagram: "pkm_tlogosarikulon",
      },
      {
        nama: "Puskesmas Bulusan",
        telepon: "(024) 76482502",
        kecamatan: "Tembalang",
        alamat: "Jl. Timoho Raya, Bulusan",
        instagram: "puskesmasbulusan",
      },
      {
        nama: "Puskesmas PlamonganSari",
        telepon: "(024) 6716013",
        kecamatan: "Pedurungan",
        alamat: "Jl. Plamongansari V No.57, Plamongan Sari",
        instagram: "puskesmasplamongansari",
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
