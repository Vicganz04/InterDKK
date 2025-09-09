import IMTPresenter from "./IMT-presenter";

class IMTPage {
  constructor() {
    this._presenter = new IMTPresenter({
      view: this,
      resultContainer: null,
    });
  }

  // Tambahkan method untuk menerima hasil dari presenter
  tampilkanHasilZScore(data) {
    // Render hasil ke resultContainer
    const el = document.getElementById("zscore-result");
    if (!el) return;
    el.innerHTML = `
      <div class="card mt-3">
        <div class="card-body">
          <h5 class="card-title">Hasil Z-Score</h5>
          <ul>
            <li><b>BB/U:</b> Z = ${
              data.zScoreBBU?.toFixed(2) ?? "-"
            }, Status: ${data.statusBBU}</li>
            <li><b>TB/U:</b> Z = ${
              data.zScoreTBU?.toFixed(2) ?? "-"
            }, Status: ${data.statusTBU}</li>
            <li><b>BB/TB:</b> Z = ${
              data.zScoreBBTB?.toFixed(2) ?? "-"
            }, Status: ${data.statusBBTB}</li>
            <li><b>IMT/U:</b> Z = ${
              data.zScoreIMTU?.toFixed(2) ?? "-"
            }, Status: ${data.statusIMTU}</li>
          </ul>
        </div>
      </div>
    `;
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
            <label for="tgl-lahir-anak" class="form-label">Tanggal Lahir Anak</label>
            <input type="date" class="form-control" id="tgl-lahir-anak" required />
          </div>
          <div class="mb-3">
            <label for="umur-anak" class="form-label">Umur (bulan)</label>
            <input type="number" class="form-control" id="umur-anak" required min="0" readonly />
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
            <input type="text" class="form-control" id="cara-ukur" required readonly />
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
    this._presenter._resultContainer = document.getElementById("zscore-result");
    const tglLahirInput = document.getElementById("tgl-lahir-anak");
    const umurInput = document.getElementById("umur-anak");
    const caraUkurInput = document.getElementById("cara-ukur");

    // Hitung umur dan cara ukur otomatis saat tanggal lahir diubah
    tglLahirInput.addEventListener("change", () => {
      const tglLahir = new Date(tglLahirInput.value);
      const today = new Date();

      // Hitung total bulan
      let umurBulan =
        (today.getFullYear() - tglLahir.getFullYear()) * 12 +
        (today.getMonth() - tglLahir.getMonth());

      // Hitung hari
      let hari = today.getDate() - tglLahir.getDate();
      if (hari < 0) {
        umurBulan -= 1;
        // Ambil jumlah hari di bulan sebelumnya
        const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
        hari = prevMonth.getDate() + hari;
      }

      umurBulan = umurBulan < 0 ? 0 : umurBulan;
      hari = hari < 0 ? 0 : hari;

      umurInput.value = umurBulan; // tetap isi input umur (bulan) untuk proses selanjutnya

      // Tampilkan umur detail di bawah input (opsional)
      let umurDetail = document.getElementById("umur-detail");
      if (!umurDetail) {
        umurDetail = document.createElement("div");
        umurDetail.id = "umur-detail";
        umurInput.parentNode.appendChild(umurDetail);
      }
      umurDetail.style.fontSize = "0.95em";
      umurDetail.style.color = "#2d6a4f";
      umurDetail.textContent = `Umur anak: ${umurBulan} bulan ${hari} hari`;

      // Cara ukur otomatis
      if (umurBulan < 24) {
        caraUkurInput.value = "Terentang (< 2 tahun)";
      } else {
        caraUkurInput.value = "Berdiri (≥ 2 tahun)";
      }
    });

    const zscoreForm = document.getElementById("zscore-form");
    const zscoreResultDiv = document.getElementById("zscore-result");

    // Fungsi ambil LMS dari JSON
    function getLMS(json, key, jk) {
      // key: umur (untuk BB/U, TB/U, IMT/U), panjang/tinggi (untuk BB/PB, BB/TB)
      // jk: "L" atau "P"
      if (json[key] && json[key][jk]) {
        return json[key][jk];
      }
      return null;
    }

    function calculateZScore(x, L, M, S) {
      if (L === 0) {
        return Math.log(x / M) / S;
      } else {
        return (Math.pow(x / M, L) - 1) / (L * S);
      }
    }

    zscoreForm.addEventListener("submit", (e) => {
      e.preventDefault();
      // Ambil data input
      const nama = document.getElementById("nama-anak").value;
      const umur = parseInt(document.getElementById("umur-anak").value, 10);
      const jk = document.getElementById("jenis-kelamin").value;
      const bb = parseFloat(document.getElementById("bb-anak").value);
      const tb = parseFloat(document.getElementById("tb-anak").value);
      const caraUkur = document.getElementById("cara-ukur").value;

      // Panggil presenter
      this._presenter.hitungZScoreAnak({ jk, umur, bb, tb, caraUkur });
    });
  }

  tampilkanHasilIMT(data) {
    // render hasil ke resultContainer
  }
}

export default IMTPage;
