import IMTPresenter from "./IMT-presenter";

class IMTPage {
  constructor() {
    this._presenter = null;
  }

  async render() {
    return `
      <div class="container py-5">
        <h2 class="section-title mb-4">Kalkulator Indeks Massa Tubuh (IMT)</h2>
        <form id="imt-form" class="mb-4">
          <div class="mb-3">
            <label for="berat" class="form-label">Berat Badan (kg)</label>
            <input type="number" class="form-control" id="berat" required min="1" step="any" />
          </div>
          <div class="mb-3">
            <label for="tinggi" class="form-label">Tinggi Badan (cm)</label>
            <input type="number" class="form-control" id="tinggi" required min="1" step="any" />
          </div>
          <button type="submit" class="btn btn-success">Hitung IMT</button>
        </form>
        <div id="imt-result"></div>
      </div>
    `;
  }

  async afterRender() {
    const form = document.getElementById("imt-form");
    const resultDiv = document.getElementById("imt-result");

    this._presenter = new IMTPresenter({
      view: this,
      resultContainer: resultDiv,
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const berat = parseFloat(document.getElementById("berat").value);
      const tinggi = parseFloat(document.getElementById("tinggi").value);
      this._presenter.hitungIMT(berat, tinggi);
    });
  }

  tampilkanHasilIMT({ imt, status, saran, warna }) {
    document.getElementById("imt-result").innerHTML = `
      <div class="card card-result mt-3" style="background:${warna}; color:#fff;">
        <div class="card-body">
          <h5 class="card-title">Hasil Perhitungan IMT</h5>
          <p class="mb-1"><strong>IMT Anda:</strong> ${imt.toFixed(2)}</p>
          <p class="mb-1"><strong>Status:</strong> ${status}</p>
          <p class="mb-0"><strong>Saran:</strong> ${saran}</p>
        </div>
      </div>
    `;
  }
}

export default IMTPage;