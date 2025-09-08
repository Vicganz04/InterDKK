import CaloriesPresenter from "./calories-presenter";

class CaloriesPage {
  constructor() {
    this._presenter = null;
  }

  async render() {
    return `
      <div class="container py-5 section-bg">
        <h2 class="section-title mb-4">Kalkulator Kebutuhan Kalori Harian</h2>
        <form id="calories-form" class="mb-4">
          <div class="mb-3">
            <label for="gender" class="form-label">Jenis Kelamin</label>
            <select class="form-control" id="gender" required>
              <option value="">Pilih</option>
              <option value="male">Pria</option>
              <option value="female">Wanita</option>
            </select>
          </div>
          <div class="mb-3">
            <label for="weight" class="form-label">Berat Badan (kg)</label>
            <input type="number" class="form-control" id="weight" required min="1" step="any" />
          </div>
          <div class="mb-3">
            <label for="height" class="form-label">Tinggi Badan (cm)</label>
            <input type="number" class="form-control" id="height" required min="1" step="any" />
          </div>
          <div class="mb-3">
            <label for="age" class="form-label">Usia (tahun)</label>
            <input type="number" class="form-control" id="age" required min="1" step="1" />
          </div>
          <div class="mb-3">
            <label for="activity" class="form-label">Aktivitas</label>
            <select class="form-control" id="activity" required>
              <option value="">Pilih</option>
              <option value="1.2">Sangat ringan (tidak olahraga)</option>
              <option value="1.375">Ringan (olahraga ringan 1-3 hari/minggu)</option>
              <option value="1.55">Sedang (olahraga sedang 3-5 hari/minggu)</option>
              <option value="1.725">Berat (olahraga berat 6-7 hari/minggu)</option>
              <option value="1.9">Sangat berat (kerja fisik/latihan sangat berat)</option>
            </select>
          </div>
          <button type="submit" class="btn btn-success">Hitung Kalori</button>
        </form>
        <div id="calories-result"></div>
      </div>
    `;
  }

  async afterRender() {
    const form = document.getElementById("calories-form");
    const resultDiv = document.getElementById("calories-result");

    this._presenter = new CaloriesPresenter({
      view: this,
      resultContainer: resultDiv,
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const gender = document.getElementById("gender").value;
      const weight = parseFloat(document.getElementById("weight").value);
      const height = parseFloat(document.getElementById("height").value);
      const age = parseInt(document.getElementById("age").value, 10);
      const activity = parseFloat(document.getElementById("activity").value);

      this._presenter.hitungKalori({ gender, weight, height, age, activity });
    });
  }

  tampilkanHasilKalori({ kalori, pesan }) {
    document.getElementById("calories-result").innerHTML = `
      <div class="card card-result mt-3">
        <div class="card-body">
          <h5 class="card-title">Kebutuhan Kalori Harian Anda</h5>
          <p class="mb-1"><strong>Kalori harian:</strong> ${kalori ? kalori.toFixed(0) : '-'} kkal</p>
          <p class="mb-0">${pesan}</p>
        </div>
      </div>
    `;
  }
}

export default CaloriesPage;