import {
  hitungIMT,
  statusGizi,
  kebutuhanKalori,
  saran,
} from "./gizi-presenter.js";

class GiziPage {
  render() {
    return `
      <div class="container py-5">
        <h2 class="mb-4" style="color: #145c2c; font-weight: bold;">Kalkulator Cek Gizi</h2>
        <form id="giziForm" class="mb-4">
          <div class="mb-3">
            <label for="jenisKelamin" class="form-label">Jenis Kelamin</label>
            <select id="jenisKelamin" class="form-select" required>
              <option value="" disabled selected>Pilih</option>
              <option value="Pria">Pria</option>
              <option value="Wanita">Wanita</option>
            </select>
          </div>
          <div class="mb-3">
            <label for="berat" class="form-label">Berat Badan (kg)</label>
            <input type="number" id="berat" class="form-control" required min="1">
          </div>
          <div class="mb-3">
            <label for="tinggi" class="form-label">Tinggi Badan (cm)</label>
            <input type="number" id="tinggi" class="form-control" required min="1">
          </div>
          <div class="mb-3">
            <label for="usia" class="form-label">Usia (tahun)</label>
            <input type="number" id="usia" class="form-control" required min="1">
          </div>
          <div class="mb-3">
            <label for="aktivitas" class="form-label">Aktivitas</label>
            <select id="aktivitas" class="form-select" required>
              <option value="" disabled selected>Pilih</option>
              <option value="Ringan">Ringan</option>
              <option value="Sedang">Sedang</option>
              <option value="Berat">Berat</option>
            </select>
          </div>
          <button type="submit" class="btn btn-success">Hitung Kalori</button>
        </form>
        <div id="hasilGizi"></div>
      </div>
    `;
  }

  afterRender() {
    const form = document.getElementById("giziForm");
    if (!form) return;
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const usia = parseInt(document.getElementById("usia").value);
      const jenisKelamin = document.getElementById("jenisKelamin").value;
      const tinggi = parseFloat(document.getElementById("tinggi").value);
      const berat = parseFloat(document.getElementById("berat").value);
      const aktivitas = document.getElementById("aktivitas").value;

      const imt = hitungIMT(berat, tinggi);
      const status = statusGizi(imt);
      const kalori = kebutuhanKalori({
        usia,
        jenisKelamin,
        tinggi,
        berat,
        aktivitas,
      });
      const saranGizi = saran(status);

      document.getElementById("hasilGizi").innerHTML = `
        <div class="card mt-4">
          <div class="card-body">
            <h4 class="card-title mb-3">Hasil Perhitungan</h4>
            <p>IMT: <b>${imt.toFixed(2)}</b></p>
            <p>Status Gizi: <b>${status}</b></p>
            <p>Kebutuhan Kalori Harian: <b>${kalori} kkal</b></p>
            <p>Saran: ${saranGizi}</p>
          </div>
        </div>
      `;
    });
  }
}

export default GiziPage;
