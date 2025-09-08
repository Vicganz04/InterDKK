class PuskePresenter {
  constructor({ view, container }) {
    this._view = view;
    this._container = container;

    if (!this._view || typeof this._view.displayContent !== "function") {
      throw new Error("Presenter membutuhkan View dengan metode displayContent!");
    }
    if (!this._container) {
      throw new Error("Presenter membutuhkan elemen container!");
    }
  }

  async showPuskesmasData() {
    const dataPuskesmas = [
      { nama: "Puskesmas Bulu Lor", telepon: "(024) 3548550", kecamatan: "Semarang Utara", alamat: "Jl. Bulu Lor No.1, Semarang Utara" },
      { nama: "Puskesmas Telogosari Wetan", telepon: "(024) 8713083", kecamatan: "Pedurungan", alamat: "Jl. Telogosari Wetan No.2, Pedurungan" },
      { nama: "Puskesmas Pandanaran", telepon: "(024) 8311470", kecamatan: "Semarang Selatan", alamat: "Jl. Pandanaran No.3, Semarang Selatan" },
      { nama: "Puskesmas Lamper Tengah", telepon: "(024) 8444808", kecamatan: "Semarang Selatan", alamat: "Jl. Lamper Tengah No.4, Semarang Selatan" },
      { nama: "Puskesmas Genuk", telepon: "(024) 6584188", kecamatan: "Genuk", alamat: "Jl. Genuk No.5, Genuk" },
      { nama: "Puskesmas Rowosari", telepon: "(024) 76414169", kecamatan: "Tembalang", alamat: "Jl. Rowosari No.6, Tembalang" },
      { nama: "Puskesmas Poncol", telepon: "(024) 3546053", kecamatan: "Semarang Tengah", alamat: "Jl. Poncol No.7, Semarang Tengah" },
      { nama: "Puskesmas Ngaliyan", telepon: "(024) 7608795", kecamatan: "Ngaliyan", alamat: "Jl. Ngaliyan No.8, Ngaliyan" },
      { nama: "Puskesmas Sekaran", telepon: "(024) 8508322", kecamatan: "Gunung Pati", alamat: "Jl. Sekaran No.9, Gunung Pati" },
      { nama: "Puskesmas Ngemplak Simongan", telepon: "(024) 7610212", kecamatan: "Semarang Barat", alamat: "Jl. Ngemplak Simongan No.10, Semarang Barat" },
      { nama: "Puskesmas Srondol", telepon: "(024) 7472852", kecamatan: "Banyumanik", alamat: "Jl. Srondol No.11, Banyumanik" },
      { nama: "Puskesmas Bangetayu", telepon: "(024) 6584353", kecamatan: "Genuk", alamat: "Jl. Bangetayu No.12, Genuk" },
      { nama: "Puskesmas Candilama", telepon: "(024) 8310515", kecamatan: "Candisari", alamat: "Jl. Candilama No.13, Candisari" },
      { nama: "Puskesmas Gunungpati", telepon: "(024) 6932140", kecamatan: "Gunung Pati", alamat: "Jl. Gunungpati No.14, Gunung Pati" },
      { nama: "Puskesmas Gayamsari", telepon: "(024) 6711855", kecamatan: "Gayamsari", alamat: "Jl. Gayamsari No.15, Gayamsari" },
      { nama: "Puskesmas Ngesrep", telepon: "(024) 7474113", kecamatan: "Banyumanik", alamat: "Jl. Ngesrep No.16, Banyumanik" },
      { nama: "Puskesmas Kedungmundu", telepon: "(024) 6717053", kecamatan: "Tembalang", alamat: "Jl. Kedungmundu No.17, Tembalang" },
      { nama: "Puskesmas Halmahera", telepon: "(024) 8414894", kecamatan: "Semarang Timur", alamat: "Jl. Halmahera No.18, Semarang Timur" },
      { nama: "Puskesmas Lebdosari", telepon: "(024) 7610207", kecamatan: "Semarang Barat", alamat: "Jl. Lebdosari No.19, Semarang Barat" },
      { nama: "Puskesmas Manyaran", telepon: "(024) 7601883", kecamatan: "Semarang Barat", alamat: "Jl. Manyaran No.20, Semarang Barat" },
      { nama: "Puskesmas Mangkang", telepon: "(024) 8660675", kecamatan: "Tugu", alamat: "Jl. Mangkang No.21, Tugu" },
      { nama: "Puskesmas Bugangan", telepon: "(024) 3546061", kecamatan: "Semarang Timur", alamat: "Jl. Bugangan No.22, Semarang Timur" },
      { nama: "Puskesmas Padangsari", telepon: "(024) 7472460", kecamatan: "Banyumanik", alamat: "Jl. Padangsari No.23, Banyumanik" },
      { nama: "Puskesmas Pegandan", telepon: "(024) 8445809", kecamatan: "Gajah Mungkur", alamat: "Jl. Pegandan No.24, Gajah Mungkur" },
      { nama: "Puskesmas Pudakpayung", telepon: "(024) 7462711", kecamatan: "Banyumanik", alamat: "Jl. Pudakpayung No.25, Banyumanik" },
      { nama: "Puskesmas Tambakaji", telepon: "(024) 8661743", kecamatan: "Ngaliyan", alamat: "Jl. Tambakaji No.26, Ngaliyan" },
      { nama: "Puskesmas Karangmalang", telepon: "(024) 70783410", kecamatan: "Ngaliyan", alamat: "Jl. Karangmalang No.27, Ngaliyan" },
      { nama: "Puskesmas Purwoyoso", telepon: "(024) 7612927", kecamatan: "Ngaliyan", alamat: "Jl. Purwoyoso No.28, Ngaliyan" },
      { nama: "Puskesmas Telogosari Kulon", telepon: "(024) 6717051", kecamatan: "Pedurungan", alamat: "Jl. Telogosari Kulon No.29, Pedurungan" },
      { nama: "Puskesmas Kagok", telepon: "(024) 8312573", kecamatan: "Candisari", alamat: "Jl. Kagok No.30, Candisari" },
      { nama: "Puskesmas Karangdoro", telepon: "(024) 3540035", kecamatan: "Semarang Timur", alamat: "Jl. Karangdoro No.31, Semarang Timur" },
      { nama: "Puskesmas Miroto", telepon: "(024) 3552542", kecamatan: "Semarang Tengah", alamat: "Jl. Miroto No.32, Semarang Tengah" },
      { nama: "Puskesmas Mijen", telepon: "(024) 7711083", kecamatan: "Mijen", alamat: "Jl. Mijen No.33, Mijen" },
      { nama: "Puskesmas Bandarharjo", telepon: "(024) 3564787", kecamatan: "Semarang Utara", alamat: "Jl. Bandarharjo No.34, Semarang Utara" },
      { nama: "Puskesmas Karangayu", telepon: "(024) 7606065", kecamatan: "Semarang Barat", alamat: "Jl. Karangayu No.35, Semarang Barat" },
      { nama: "Puskesmas Krobokan", telepon: "(024) 7610084", kecamatan: "Semarang Barat", alamat: "Jl. Krobokan No.36, Semarang Barat" },
      { nama: "Puskesmas Karanganyar", telepon: "(024) 8662080", kecamatan: "Tugu", alamat: "Jl. Karanganyar No.37, Tugu" }
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