class IMTPresenter {
  constructor({ view, resultContainer }) {
    this._view = view;
    this._resultContainer = resultContainer;
  }

  hitungIMT(berat, tinggi) {
    if (!berat || !tinggi || berat <= 0 || tinggi <= 0) {
      this._view.tampilkanHasilIMT({
        imt: 0,
        status: "Data tidak valid",
        saran: "Masukkan berat dan tinggi badan yang benar.",
      });
      return;
    }

    // Konversi tinggi dari cm ke meter
    const tinggiMeter = tinggi / 100;
    const imt = berat / (tinggiMeter * tinggiMeter);

    let status = "";
    let saran = "";
    let warna = "";

    if (imt < 18.5) {
      status = "Kurus";
      saran =
        "Anda termasuk kurus. Perbanyak makan makanan bergizi, konsultasikan ke faskes terdekat untuk pemeriksaan lebih lanjut (misal: cacingan, malnutrisi).";
      warna = "#7FB3D5"; // Biru pastel
    } else if (imt >= 18.5 && imt < 25) {
      status = "Normal";
      saran =
        "IMT Anda normal. Pertahankan pola makan sehat dan rutin berolahraga.";
      warna = "#82E0AA"; // Hijau pastel
    } else if (imt >= 25 && imt < 30) {
      status = "Gemuk";
      saran =
        "Anda termasuk gemuk. Kurangi makanan tinggi kalori, perbanyak aktivitas fisik, dan konsultasikan ke faskes jika perlu.";
      warna = "#F8C471"; // Oranye pastel
    } else {
      status = "Obesitas";
      saran =
        "Anda termasuk obesitas. Segera konsultasikan ke faskes untuk penanganan lebih lanjut, perbaiki pola makan dan tingkatkan aktivitas fisik.";
      warna = "#F1948A"; // Merah muda/salmon
    }

    this._view.tampilkanHasilIMT({ imt, status, saran, warna });
  }
}

export default IMTPresenter;