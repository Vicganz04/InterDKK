export function cekRentangSiklus(siklus) {
  // Rentang normal 21-35 hari
  return siklus >= 21 && siklus <= 35;
}

export function prediksiHaidBerikutnya(hariTerakhir, siklus) {
  // hariTerakhir: string tanggal (yyyy-mm-dd)
  // siklus: integer hari
  const nextDate = new Date(hariTerakhir);
  nextDate.setDate(nextDate.getDate() + siklus);
  return nextDate.toLocaleDateString();
}

export function pesanSiklus(siklus) {
  if (cekRentangSiklus(siklus)) {
    return "Siklus Anda normal.";
  }
  return "Siklus Anda tidak dalam rentang normal. Konsultasikan ke dokter jika sering mengalami ketidaknormalan.";
}
