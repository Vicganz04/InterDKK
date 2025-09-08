import IMTPresenter from "./IMT-presenter";

class IMTPage {
  constructor() {
    this._presenter = null;
  }

  async render() {
    return `
      <div class="container py-5">
        <h2 class="section-title mb-4">Cek Kesehatan Anak</h2>
        <form id="zscore-form" class="mb-4">
          <div class="mb-3">
            <label for="nama-anak" class="form-label">Nama Anak</label>
            <input type="text" class="form-control" id="nama-anak" required />
          </div>
          <div class="mb-3">
            <label for="umur-anak" class="form-label">Umur (bulan)</label>
            <input type="number" class="form-control" id="umur-anak" required min="0" />
          </div>
          <div class="mb-3">
            <label for="jenis-kelamin" class="form-label">Jenis Kelamin</label>
            <select class="form-select" id="jenis-kelamin" required>
              <option value="">Pilih...</option>
              <option value="L">Laki-laki</option>
              <option value="P">Perempuan</option>
            </select>
          </div>
          <div class="mb-3">
            <label for="bb-anak" class="form-label">Berat Badan (kg)</label>
            <input type="number" class="form-control" id="bb-anak" required min="1" step="any" />
          </div>
          <div class="mb-3">
            <label for="tb-anak" class="form-label">Tinggi/Panjang Badan (cm)</label>
            <input type="number" class="form-control" id="tb-anak" required min="1" step="any" />
          </div>
          <div class="mb-3">
            <label for="cara-ukur" class="form-label">Cara Ukur Tinggi</label>
            <select class="form-select" id="cara-ukur" required>
              <option value="">Pilih...</option>
              <option value="terentang">&lt; 2 tahun (Terentang)</option>
              <option value="berdiri">&ge; 2 tahun (Berdiri)</option>
            </select>
          </div>
          <div class="mb-3">
            <label for="tgl-pengukuran" class="form-label">Tanggal Pengukuran Terakhir</label>
            <input type="date" class="form-control" id="tgl-pengukuran" required />
          </div>
          <button type="submit" class="btn btn-primary">Hitung Z-Score</button>
        </form>
        <div id="zscore-result"></div>
      </div>
    `;
  }

  async afterRender() {
    const zscoreForm = document.getElementById("zscore-form");
    const zscoreResultDiv = document.getElementById("zscore-result");

    zscoreForm.addEventListener("submit", (e) => {
      e.preventDefault();
      // Ambil data input
      const nama = document.getElementById("nama-anak").value;
      const umur = parseInt(document.getElementById("umur-anak").value, 10);
      const jk = document.getElementById("jenis-kelamin").value;
      const bb = parseFloat(document.getElementById("bb-anak").value);
      const tb = parseFloat(document.getElementById("tb-anak").value);
      const caraUkur = document.getElementById("cara-ukur").value;
      const tgl = document.getElementById("tgl-pengukuran").value;

      // Simulasi perhitungan Z-Score (dummy, ganti dengan standar WHO jika ada)
      const medianBB = 10; // contoh median berat badan ideal
      const sdBB = 2; // contoh SD
      const medianTB = 80; // contoh median tinggi badan ideal
      const zScore = (bb - medianBB) / sdBB;

      let status = "";
      let warna = "#6ebe77";
      let saran = "";
      if (zScore < -3) {
        status = "Gizi Buruk";
        warna = "#e74c3c";
        saran =
          "Segera konsultasikan ke tenaga kesehatan dan perbaiki pola makan anak dengan gizi seimbang.";
      } else if (zScore < -2) {
        status = "Gizi Kurang";
        warna = "#f39c12";
        saran =
          "Perbaiki asupan gizi anak dan pantau pertumbuhan secara rutin.";
      } else if (zScore > 2) {
        status = "Gizi Lebih/Obesitas";
        warna = "#3498db";
        saran =
          "Batasi makanan tinggi gula/lemak dan ajak anak beraktivitas fisik.";
      } else {
        status = "Normal";
        warna = "#6ebe77";
        saran =
          "Pertahankan pola makan bergizi seimbang dan pantau pertumbuhan anak secara berkala.";
      }

      zscoreResultDiv.innerHTML = `
        <div class="card card-result mt-3" style="background:${warna}; color:#fff;">
          <div class="card-body">
            <h5 class="card-title">Hasil Z-Score Anak</h5>
            <p class="mb-1"><strong>Nama:</strong> ${nama}</p>
            <p class="mb-1"><strong>Status:</strong> ${status}</p>
            <p class="mb-1"><strong>Berat Badan Ideal:</strong> ${medianBB} kg</p>
            <p class="mb-1"><strong>Tinggi Badan Ideal:</strong> ${medianTB} cm</p>
            <p class="mb-1"><strong>Saran:</strong> ${saran}</p>
          </div>
        </div>
      `;
    });
  }
}

export default IMTPage;
