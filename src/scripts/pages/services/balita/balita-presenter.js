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
      if (zScoreTBU < -3) statusTBU = "Tinggi Badan Kurang";
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

    // Prepare chart series for BB/U (weight-for-age) across ages 0..60
    const seriesBBU = [];
    // use standard z-values for SD lines (-3 .. +3) and labels
    const zValues = [-3, -2, -1, 0, 1, 2, 3];
    const zLabels = {
      "-3": "Sangat di bawah normal",
      "-2": "Di bawah rata-rata",
      "-1": "Di bawah rata-rata",
      0: "Rata-rata anak normal",
      1: "Di atas rata-rata",
      2: "Di atas rata-rata",
      3: "Sangat di atas normal",
    };

    try {
      // collect M values (median) per month for the child's sex from wazlms
      const sexKey = jenisKelamin; // 'L' or 'P'
      if (wazlms && wazlms[sexKey]) {
        const months = Object.keys(wazlms[sexKey])
          .map((m) => parseInt(m, 10))
          .filter((m) => !Number.isNaN(m))
          .sort((a, b) => a - b)
          .filter((m) => m <= 60);

        zValues.forEach((z) => {
          const data = months.map((m) => {
            const lms = wazlms[sexKey][String(m)];
            if (!lms) return [m, null];
            const L = lms.L;
            const M = lms.M;
            const S = lms.S;
            // back-calculate x from z using LMS formula
            let x;
            if (L === 0) x = M * Math.exp(S * z);
            else x = M * Math.pow(1 + L * S * z, 1 / L);
            return [m, Number.isFinite(x) ? Number(x.toFixed(2)) : null];
          });
          seriesBBU.push({ name: zLabels[String(z)], data, z, sd: z });
        });
      }
    } catch (err) {
      // ignore chart generation errors
    }

    // Prepare TBU series (height-for-age) using hazlms
    const seriesTBU = [];
    try {
      if (hazlms && hazlms[jenisKelamin]) {
        const monthsT = Object.keys(hazlms[jenisKelamin])
          .map((m) => parseInt(m, 10))
          .filter((m) => !Number.isNaN(m))
          .sort((a, b) => a - b)
          .filter((m) => m <= 60);

        zValues.forEach((z) => {
          const data = monthsT.map((m) => {
            const lms = hazlms[jenisKelamin][String(m)];
            if (!lms) return [m, null];
            const L = lms.L;
            const M = lms.M;
            const S = lms.S;
            let x;
            if (L === 0) x = M * Math.exp(S * z);
            else x = M * Math.pow(1 + L * S * z, 1 / L);
            return [m, Number.isFinite(x) ? Number(x.toFixed(2)) : null];
          });
          seriesTBU.push({ name: zLabels[String(z)], data, z, sd: z });
        });
      }
    } catch (err) {
      // ignore
    }

    const chart = {
      seriesBBU,
      // child's point to plot on BB/U chart
      pointBBU: { x: umur, y: Number.isFinite(bb) ? Number(bb) : null },
      // TBU: height-for-age series and point
      seriesTBU,
      pointTBU: { x: umur, y: Number.isFinite(tb) ? Number(tb) : null },
    };

    // save last chart data so view can re-draw if needed
    this._lastChartData = chart;

    // compute recommendation ranges (±10% of median M) where available
    const makeRange = (m) => {
      const n = Number(m);
      if (!Number.isFinite(n)) return "-";
      const min = Number((n * 0.9).toFixed(1));
      const max = Number((n * 1.1).toFixed(1));
      return { min, max };
    };

    const rekomBBURange = lmsBBU && lmsBBU.M ? makeRange(lmsBBU.M) : "-";
    const rekomTBURange = lmsTBU && lmsTBU.M ? makeRange(lmsTBU.M) : "-";
    const rekomBBTBRange = lmsBBTB && lmsBBTB.M ? makeRange(lmsBBTB.M) : "-";
    const rekomIMTVal = lmsIMTU && lmsIMTU.M ? lmsIMTU.M : "-";

    this._tampilan.tampilkanHasilZScore({
      jk,
      umur,
      bb,
      tb,
      imt,
      zScoreBBU,
      statusBBU,
      rekomBBU: rekomBBURange,
      bbIdealBBU: rekomBBURange,
      zScoreTBU,
      statusTBU,
      rekomTBU: rekomTBURange,
      tbIdealTBU: rekomTBURange,
      zScoreBBTB,
      statusBBTB,
      rekomBBTB: rekomBBTBRange,
      bbIdealBBTB: rekomBBTBRange,
      zScoreIMTU,
      statusIMTU,
      rekomIMTU: rekomIMTVal,
      chart,
    });
  }
}

export default BalitaPresenter;
