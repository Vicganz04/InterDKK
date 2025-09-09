import wazlms from "../../../data/wazlms.json";
import hazlms from "../../../data/hazlms.json";
import wfllms from "../../../data/wfllms.json";
import wfhlms from "../../../data/wfhlms.json";
import bmilms from "../../../data/bmilms.json";

class BalitaPresenter {
  constructor({ tampilan, wadahHasil }) {
    this._tampilan = tampilan;
    this._wadahHasil = wadahHasil;
  }

  hitungIMT(berat, tinggi) {
    if (!berat || !tinggi || berat <= 0 || tinggi <= 0) {
      this._tampilan.tampilkanHasilIMT({
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
    this._tampilan.tampilkanHasilIMT({ imt, status, saran, warna });
  }

  hitungZScoreAnak({ jk, umur, bb, tb, caraUkur }) {
    const jenisKelamin = jk === "L" ? "L" : "P";
    function dapatkanLMSObj(json, kunci, jenisKelamin) {
      const keyStr = String(kunci);
      if (json && json[jenisKelamin] && json[jenisKelamin][keyStr]) {
        return json[jenisKelamin][keyStr];
      }
      return null;
    }
    function dapatkanLMSArray(json, tb, jenisKelamin) {
      // SEX: 1 = Laki-laki, 2 = Perempuan
      const sexNum = jenisKelamin === "L" ? 1 : 2;
      // Cari entry dengan LENGTH2 paling mendekati tb (toleransi 0.1 cm)
      return (
        json.find(
          (item) => item.SEX === sexNum && Math.abs(item.LENGTH2 - tb) < 0.11
        ) || null
      );
    }
    function hitungZScore(x, L, M, S) {
      if (L === 0) {
        return Math.log(x / M) / S;
      } else {
        return (Math.pow(x / M, L) - 1) / (L * S);
      }
    }
    // BB/U
    const lmsBBU = dapatkanLMSObj(wazlms, umur, jenisKelamin);
    // TB/U
    const lmsTBU = dapatkanLMSObj(hazlms, umur, jenisKelamin);
    // BB/PB atau BB/TB
    let lmsBBTB;
    if (caraUkur.includes("Terentang")) {
      lmsBBTB = dapatkanLMSArray(wfllms, tb, jenisKelamin);
    } else {
      lmsBBTB = dapatkanLMSArray(wfhlms, tb, jenisKelamin);
    }
    // IMT/U
    const imt = bb / Math.pow(tb / 100, 2);
    const lmsIMTU = dapatkanLMSObj(bmilms, umur, jenisKelamin);
    const zScoreBBU = lmsBBU
      ? hitungZScore(bb, lmsBBU.L, lmsBBU.M, lmsBBU.S)
      : null;
    const zScoreTBU = lmsTBU
      ? hitungZScore(tb, lmsTBU.L, lmsTBU.M, lmsTBU.S)
      : null;
    const zScoreBBTB = lmsBBTB
      ? hitungZScore(bb, lmsBBTB.L, lmsBBTB.M, lmsBBTB.S)
      : null;
    const zScoreIMTU = lmsIMTU
      ? hitungZScore(imt, lmsIMTU.L, lmsIMTU.M, lmsIMTU.S)
      : null;
    let statusBBU = "-";
    if (zScoreBBU !== null) {
      if (zScoreBBU < -3) statusBBU = "Sangat Kurang";
      else if (zScoreBBU >= -3 && zScoreBBU < -2) statusBBU = "Kurang";
      else if (zScoreBBU > 2) statusBBU = "Risiko Berat Badan Lebih";
      else statusBBU = "Normal";
    }
    let statusTBU = "-";
    if (zScoreTBU !== null) {
      if (zScoreTBU < -3) statusTBU = "Sangat Pendek";
      else if (zScoreTBU >= -3 && zScoreTBU < -2) statusTBU = "Pendek";
      else if (zScoreTBU > 3) statusTBU = "Tinggi";
      else statusTBU = "Normal";
    }
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

    let rekomBBTB = "-";
    let bbIdealBBTB = "-";
    if (lmsBBTB && lmsBBTB.M) {
      rekomBBTB = lmsBBTB.M;
      bbIdealBBTB = lmsBBTB.M;
    }

    this._tampilan.tampilkanHasilZScore({
      jk,
      umur,
      bb,
      tb,
      imt,
      zScoreBBU,
      statusBBU,
      rekomBBU: lmsBBU && lmsBBU.M ? lmsBBU.M : "-",
      bbIdealBBU: lmsBBU && lmsBBU.M ? lmsBBU.M : "-",
      zScoreTBU,
      statusTBU,
      rekomTBU: lmsTBU && lmsTBU.M ? lmsTBU.M : "-",
      tbIdealTBU: lmsTBU && lmsTBU.M ? lmsTBU.M : "-",
      zScoreBBTB,
      statusBBTB,
      rekomBBTB,
      bbIdealBBTB,
      zScoreIMTU,
      statusIMTU,
      rekomIMTU: lmsIMTU && lmsIMTU.M ? lmsIMTU.M : "-",
    });
  }
  hitungZScoreAnak({ jk, umur, bb, tb, caraUkur }) {
    // Key pada JSON adalah "L"/"P", bukan 1/2
    const jenisKelamin = jk === "L" ? "L" : "P";
    function dapatkanLMS(json, kunci, jenisKelamin) {
      // Untuk file LMS WHO: json[sex][umur/tinggi] (key harus string)
      const keyStr = String(kunci);
      if (json && json[jenisKelamin] && json[jenisKelamin][keyStr]) {
        return json[jenisKelamin][keyStr];
      }
      return null;
    }
    function hitungZScore(x, L, M, S) {
      if (L === 0) {
        return Math.log(x / M) / S;
      } else {
        return (Math.pow(x / M, L) - 1) / (L * S);
      }
    }
    // BB/U
    const lmsBBU = dapatkanLMS(wazlms, umur, jenisKelamin);
    // TB/U
    const lmsTBU = dapatkanLMS(hazlms, umur, jenisKelamin);
    // BB/PB atau BB/TB
    let lmsBBTB;
    if (caraUkur.includes("Terentang")) {
      lmsBBTB = dapatkanLMS(wfllms, tb, jenisKelamin);
    } else {
      lmsBBTB = dapatkanLMS(wfhlms, tb, jenisKelamin);
    }
    // IMT/U
    const imt = bb / Math.pow(tb / 100, 2);
    const lmsIMTU = dapatkanLMS(bmilms, umur, jenisKelamin);
    const zScoreBBU = lmsBBU
      ? hitungZScore(bb, lmsBBU.L, lmsBBU.M, lmsBBU.S)
      : null;
    const zScoreTBU = lmsTBU
      ? hitungZScore(tb, lmsTBU.L, lmsTBU.M, lmsTBU.S)
      : null;
    const zScoreBBTB = lmsBBTB
      ? hitungZScore(bb, lmsBBTB.L, lmsBBTB.M, lmsBBTB.S)
      : null;
    const zScoreIMTU = lmsIMTU
      ? hitungZScore(imt, lmsIMTU.L, lmsIMTU.M, lmsIMTU.S)
      : null;
    let statusBBU = "-";
    if (zScoreBBU !== null) {
      if (zScoreBBU < -3) statusBBU = "Sangat Kurang";
      else if (zScoreBBU >= -3 && zScoreBBU < -2) statusBBU = "Kurang";
      else if (zScoreBBU > 2) statusBBU = "Risiko Berat Badan Lebih";
      else statusBBU = "Normal";
    }
    let statusTBU = "-";
    if (zScoreTBU !== null) {
      if (zScoreTBU < -3) statusTBU = "Sangat Pendek";
      else if (zScoreTBU >= -3 && zScoreTBU < -2) statusTBU = "Pendek";
      else if (zScoreTBU > 3) statusTBU = "Tinggi";
      else statusTBU = "Normal";
    }
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
    this._tampilan.tampilkanHasilZScore({
      jk,
      umur,
      bb,
      tb,
      imt,
      zScoreBBU,
      statusBBU,
      rekomBBU: lmsBBU ? lmsBBU.M : "-",
      bbIdealBBU: lmsBBU ? lmsBBU.M : "-",
      zScoreTBU,
      statusTBU,
      rekomTBU: lmsTBU ? lmsTBU.M : "-",
      tbIdealTBU: lmsTBU ? lmsTBU.M : "-",
      zScoreBBTB,
      statusBBTB,
      rekomBBTB: lmsBBTB ? lmsBBTB.M : "-",
      bbIdealBBTB: lmsBBTB ? lmsBBTB.M : "-",
      zScoreIMTU,
      statusIMTU,
      rekomIMTU: lmsIMTU ? lmsIMTU.M : "-",
    });
  }
}

export default BalitaPresenter;
