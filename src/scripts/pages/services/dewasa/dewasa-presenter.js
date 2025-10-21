class DewasaPresenter {
  constructor({ view, resultContainer }) {
    this._view = view;
    this._resultContainer = resultContainer;
  }

  hitungIMTDewasa({ nama, age, gender, weight, height }) {
    // Validasi input wajib
    if (!weight || !height || weight <= 0 || height <= 0) {
      this._view.tampilkanHasilIMT({
        nama: nama || "",
        age: age || "",
        gender: gender || "",
        imt: "-",
        status: "Data tidak valid",
        saran: "Masukkan berat dan tinggi badan dengan benar.",
        warna: "#f5f5f5",
      });
      return;
    }

    // Hitung IMT
    const tinggiMeter = height / 100;
    const imtValue = weight / (tinggiMeter * tinggiMeter);
    const imt = imtValue.toFixed(2);

    let status = "";
    let warna = "";
    let saran = "";

    if (imtValue < 18.5) {
      status = "Berat Badan Kurang";
      warna = "#E74C3C";
      saran =
        "Perbanyak asupan kalori dan protein (nasi, roti, daging, ikan, telur, susu). Makan lebih sering dengan porsi kecil tapi bergizi. Hindari stres berlebih dan pastikan cukup tidur. Konsultasi dengan ahli gizi bila penurunan berat badan signifikan.";
    } else if (imtValue >= 18.5 && imtValue < 25) {
      status = "Normal";
      warna = "#2ECC71";
      saran =
        "Pertahankan pola makan gizi seimbang. Olahraga teratur (150 menit/minggu aktivitas sedang). Jaga kualitas tidur & hidrasi cukup. Lakukan cek kesehatan rutin setahun sekali.";
    } else if (imtValue >= 25 && imtValue < 30) {
      status = "Berat Badan Lebih";
      warna = "#F1C40F";
      saran =
        "Kurangi makanan tinggi lemak, gula, dan garam. Tingkatkan aktivitas fisik (jalan cepat, bersepeda, renang). Atur porsi makan dan kurangi camilan berkalori tinggi. Pantau berat badan secara berkala.";
    } else if (imtValue >= 30 && imtValue < 35) {
      status = "Obesitas I";
      warna = "#E67E22";
      saran =
        "Terapkan diet rendah kalori namun tetap seimbang (lebih banyak sayur & buah). Rutin olahraga minimal 30 menit setiap hari. Batasi screen time & aktivitas sedentari. Konsultasi dengan dokter/ahli gizi untuk program penurunan berat badan.";
    } else if (imtValue >= 35) {
      status = "Obesitas II";
      warna = "#9fba08ff";
      saran =
        "Segera konsultasi dengan dokter untuk intervensi medis/gizi. Lakukan program diet ketat dengan pengawasan tenaga kesehatan. Tingkatkan aktivitas fisik sesuai kemampuan. Hindari makanan cepat saji, minuman manis, dan gorengan. Cek kesehatan secara rutin (gula darah, tekanan darah, kolesterol).";
    }

    this._view.tampilkanHasilIMT({
      nama: nama || "",
      age: age || "",
      gender: gender || "",
      imt,
      status,
      saran,
      warna,
    });
  }
}

export default DewasaPresenter;
