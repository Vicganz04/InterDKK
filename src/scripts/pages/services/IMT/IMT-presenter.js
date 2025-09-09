import wazlms from "../../../data/wazlms.json";
import hazlms from "../../../data/hazlms.json";
import wfllms from "../../../data/wfllms.json";
import wfhlms from "../../../data/wfhlms.json";
import bmilms from "../../../data/bmilms.json";

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

    const tinggiMeter = tinggi / 100;
    const imt = berat / (tinggiMeter * tinggiMeter);

    let status = "";
    let saran = "";
    let warna = "";

    if (imt < 18.5) {
      status = "Kurus";
      saran =
        "Anda termasuk kurus. Perbanyak makan makanan bergizi, konsultasikan ke faskes terdekat untuk pemeriksaan lebih lanjut.";
      warna = "#7FB3D5";
    } else if (imt >= 18.5 && imt < 25) {
      status = "Normal";
      saran =
        "IMT Anda normal. Pertahankan pola makan sehat dan rutin berolahraga.";
      warna = "#82E0AA";
    } else if (imt >= 25 && imt < 30) {
      status = "Gemuk";
      saran =
        "Anda termasuk gemuk. Kurangi makanan tinggi kalori, perbanyak aktivitas fisik, dan konsultasikan ke faskes jika perlu.";
      warna = "#F8C471";
    } else {
      status = "Obesitas";
      saran =
        "Anda termasuk obesitas. Segera konsultasikan ke faskes untuk penanganan lebih lanjut, perbaiki pola makan dan tingkatkan aktivitas fisik.";
      warna = "#F1948A";
    }

    this._view.tampilkanHasilIMT({ imt, status, saran, warna });
  }

  hitungZScoreAnak({ jk, umur, bb, tb, caraUkur }) {
    // Konversi jenis kelamin ke angka sesuai data
    const sex = jk === "L" ? 1 : 2;

    // Fungsi cari LMS di array JSON
    function getLMS(json, key, sex, keyName = "HEIGHT2") {
      return json.find(
        (item) =>
          Number(item[keyName]) === Number(key) &&
          Number(item.SEX) === Number(sex)
      );
    }

    function calculateZScore(x, L, M, S) {
      if (L === 0) {
        return Math.log(x / M) / S;
      } else {
        return (Math.pow(x / M, L) - 1) / (L * S);
      }
    }

    // BB/U
    const lmsBBU = getLMS(wazlms, umur, sex, "HEIGHT2");
    // TB/U
    const lmsTBU = getLMS(hazlms, umur, sex, "HEIGHT2");
    // BB/PB atau BB/TB
    let lmsBBTB;
    if (caraUkur.includes("Terentang")) {
      lmsBBTB = getLMS(wfllms, tb, sex, "LENGTH2");
    } else {
      lmsBBTB = getLMS(wfhlms, tb, sex, "LENGTH2");
    }
    // IMT/U
    const imt = bb / Math.pow(tb / 100, 2);
    const lmsIMTU = getLMS(bmilms, umur, sex, "HEIGHT2");

    // Hitung Z-score jika data tersedia
    const zScoreBBU = lmsBBU
      ? calculateZScore(bb, lmsBBU.L, lmsBBU.M, lmsBBU.S)
      : null;
    const zScoreTBU = lmsTBU
      ? calculateZScore(tb, lmsTBU.L, lmsTBU.M, lmsTBU.S)
      : null;
    const zScoreBBTB = lmsBBTB
      ? calculateZScore(bb, lmsBBTB.L, lmsBBTB.M, lmsBBTB.S)
      : null;
    const zScoreIMTU = lmsIMTU
      ? calculateZScore(imt, lmsIMTU.L, lmsIMTU.M, lmsIMTU.S)
      : null;

    // Interpretasi status BB/U
    let statusBBU = "-";
    if (zScoreBBU !== null) {
      if (zScoreBBU < -3) statusBBU = "Sangat Kurang";
      else if (zScoreBBU >= -3 && zScoreBBU < -2) statusBBU = "Kurang";
      else if (zScoreBBU > 2) statusBBU = "Risiko Berat Badan Lebih";
      else statusBBU = "Normal";
    }

    // Interpretasi status TB/U
    let statusTBU = "-";
    if (zScoreTBU !== null) {
      if (zScoreTBU < -3) statusTBU = "Sangat Pendek";
      else if (zScoreTBU >= -3 && zScoreTBU < -2) statusTBU = "Pendek";
      else if (zScoreTBU > 3) statusTBU = "Tinggi";
      else statusTBU = "Normal";
    }

    // Interpretasi status BB/TB
    let statusBBTB = "-";
    if (zScoreBBTB !== null) {
      if (zScoreBBTB < -3) statusBBTB = "Gizi Buruk";
      else if (zScoreBBTB >= -3 && zScoreBBTB < -2) statusBBTB = "Gizi Kurang";
      else if (zScoreBBTB >= -2 && zScoreBBTB <= 1) statusBBTB = "Gizi Baik";
      else if (zScoreBBTB > 1 && zScoreBBTB <= 2)
        statusBBTB = "Risiko Gizi Lebih";
      else if (zScoreBBTB > 2 && zScoreBBTB <= 3) statusBBTB = "Gizi Lebih";
      else if (zScoreBBTB > 3) statusBBTB = "Obesitas";
    }

    // Interpretasi status IMT/U
    let statusIMTU = "-";
    if (zScoreIMTU !== null) {
      if (zScoreIMTU < -3) statusIMTU = "Gizi Buruk";
      else if (zScoreIMTU >= -3 && zScoreIMTU < -2) statusIMTU = "Gizi Kurang";
      else if (zScoreIMTU >= -2 && zScoreIMTU <= 1) statusIMTU = "Gizi Baik";
      else if (zScoreIMTU > 1 && zScoreIMTU <= 2)
        statusIMTU = "Risiko Gizi Lebih";
      else if (zScoreIMTU > 2 && zScoreIMTU <= 3) statusIMTU = "Gizi Lebih";
      else if (zScoreIMTU > 3) statusIMTU = "Obesitas";
    }

    // Kirim hasil ke view
    this._view.tampilkanHasilZScore({
      bb,
      tb,
      imt,
      zScoreBBU,
      statusBBU,
      rekomBBU: lmsBBU ? lmsBBU.M : "-",
      zScoreTBU,
      statusTBU,
      rekomTBU: lmsTBU ? lmsTBU.M : "-",
      zScoreBBTB,
      statusBBTB,
      rekomBBTB: lmsBBTB ? lmsBBTB.M : "-",
      zScoreIMTU,
      statusIMTU,
      rekomIMTU: lmsIMTU ? lmsIMTU.M : "-",
    });
  }
}

export default IMTPresenter;
