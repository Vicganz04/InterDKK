class CaloriesPresenter {
  constructor({ view, resultContainer }) {
    this._view = view;
    this._resultContainer = resultContainer;
  }

  hitungKalori({ gender, weight, height, age, activity }) {
    let kalori = 0;
    let pesan = "";

    if (
      !gender ||
      !weight ||
      !height ||
      !age ||
      !activity ||
      weight <= 0 ||
      height <= 0 ||
      age <= 0
    ) {
      this._view.tampilkanHasilKalori({
        kalori: 0,
        pesan: "Masukkan semua data dengan benar.",
      });
      return;
    }

    // Rumus Harris-Benedict
    if (gender === "male") {
      kalori =
        88.362 +
        13.397 * weight +
        4.799 * height -
        5.677 * age;
    } else if (gender === "female") {
      kalori =
        447.593 +
        9.247 * weight +
        3.098 * height -
        4.330 * age;
    }

    kalori = kalori * activity;

    pesan =
      "Ini adalah estimasi kebutuhan kalori harian Anda berdasarkan data yang diinput. Untuk hasil lebih akurat, konsultasikan ke ahli gizi atau tenaga kesehatan.";

    this._view.tampilkanHasilKalori({ kalori, pesan });
  }
}

export default CaloriesPresenter;