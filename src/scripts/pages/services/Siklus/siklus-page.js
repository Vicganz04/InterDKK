class SiklusPage {
  render() {
    return `
      <div class="container py-5">
        <h2 class="mb-4" style="color: #145c2c; font-weight: bold;">Cek Siklus Menstruasi</h2>
        <form id="siklusForm" class="mb-4">
          <div class="mb-3">
            <label for="siklusMens" class="form-label">Siklus Menstruasi (hari)</label>
            <!-- hapus min/max supaya user tetap bisa input <15 atau >45 -->
            <input type="number" id="siklusMens" class="form-control" required placeholder="Contoh: 28">
            <small class="text-muted">Rata-rata siklus normal 20-40 hari</small>
          </div>
          <div class="mb-3">
            <label for="hariTerakhir" class="form-label">Hari Pertama Haid Terakhir</label>
            <input type="date" id="hariTerakhir" class="form-control" required>
          </div>
          <button type="submit" class="btn btn-success">Cek Siklus</button>
        </form>
        <div id="hasilSiklus"></div>
      </div>
    `;
  }

  afterRender() {
    const form = document.getElementById("siklusForm");
    if (!form) return;
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const siklusMens = parseInt(document.getElementById("siklusMens").value, 10);
      const hariTerakhir = document.getElementById("hariTerakhir").value;
      let hasil = "";

      // validasi dasar
      if (Number.isNaN(siklusMens) || !hariTerakhir) {
        hasil = `<p class="text-danger">Masukkan nilai siklus dan tanggal terakhir haid dengan benar.</p>`;
      } else {
        // Kasus normal (20-40) -> hitung perkiraan haid berikutnya
        if (siklusMens >= 20 && siklusMens <= 40) {
          const nextDate = new Date(hariTerakhir);
          nextDate.setDate(nextDate.getDate() + siklusMens);
          hasil = `<p class="text-success">Siklus Anda normal.</p>
                   <p>Perkiraan haid berikutnya: <b>${nextDate.toLocaleDateString()}</b></p>`;
        }
        // Kasus borderline (15-19 atau 41-45) -> masih dihitung, beri peringatan
        else if ((siklusMens >= 15 && siklusMens <= 19) || (siklusMens >= 41 && siklusMens <= 45)) {
          const nextDate = new Date(hariTerakhir);
          nextDate.setDate(nextDate.getDate() + siklusMens);
          hasil = `<p style="color:#8B0000;">Siklus Anda tidak dalam rentang normal (20-40 hari). Harap periksa ke dokter jika sering terjadi.</p>
                   <p>Perkiraan haid berikutnya: <b>${nextDate.toLocaleDateString()}</b></p>`;
        }
        // Kasus jauh dari normal (<15 atau >45) -> jangan hitung, beri pesan urgent
        else if (siklusMens < 15 || siklusMens > 45) {
          hasil = `<p class="text-danger"><strong>Siklus Anda jauh dari rentang normal. Harap segera periksa ke dokter secepatnya.</strong></p>`;
        } else {
          hasil = `<p class="text-danger">Input tidak dikenali. Masukkan angka siklus yang valid.</p>`;
        }
      }

      document.getElementById("hasilSiklus").innerHTML = `
        <div class="card mt-4">
          <div class="card-body">
            <h4 class="card-title mb-3">Hasil Siklus</h4>
            ${hasil}
          </div>
        </div>
      `;
    });
  }
}

export default SiklusPage;
