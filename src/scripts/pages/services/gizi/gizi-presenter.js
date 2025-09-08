export function hitungIMT(berat, tinggi) {
  // Berat (kg) / (Tinggi (m))^2
  const tinggiM = tinggi / 100;
  return berat / (tinggiM * tinggiM);
}

export function statusGizi(imt) {
  if (imt < 18.5) return "Kurang";
  if (imt < 25) return "Normal";
  if (imt < 27) return "Kelebihan";
  return "Obesitas";
}

export function kebutuhanKalori({
  usia,
  jenisKelamin,
  tinggi,
  berat,
  aktivitas,
}) {
  // Rumus Mifflin-St Jeor
  let bmr;
  if (jenisKelamin === "Pria") {
    bmr = 10 * berat + 6.25 * tinggi - 5 * usia + 5;
  } else {
    bmr = 10 * berat + 6.25 * tinggi - 5 * usia - 161;
  }

  let faktorAktivitas = 1.2;
  if (aktivitas === "Sedang") faktorAktivitas = 1.55;
  if (aktivitas === "Berat") faktorAktivitas = 1.725;

  return Math.round(bmr * faktorAktivitas);
}

export function saran(status) {
  switch (status) {
    case "Kurang":
      return "Perlu meningkatkan asupan kalori.";
    case "Normal":
      return "Pertahankan pola makan sehat.";
    case "Kelebihan":
      return "Perlu mengurangi asupan kalori.";
    case "Obesitas":
      return "Konsultasikan dengan ahli gizi.";
    default:
      return;
  }
}
