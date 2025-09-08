class SiklusPage {
  render() {
    return `
      <div class="container py-5">
        <h2 class="mb-4" style="color: #145c2c; font-weight: bold;">Cek Siklus Menstruasi</h2>
        <form id="siklusForm" class="mb-4">
          <div class="mb-3">
            <label for="siklusMens" class="form-label">Siklus Menstruasi (hari)</label>
            <input type="number" id="siklusMens" class="form-control" min="15" max="45" required placeholder="Contoh: 28">
            <small class="text-muted">Rata-rata siklus normal 21-35 hari</small>
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

      const siklusMens = parseInt(document.getElementById("siklusMens").value);
      const hariTerakhir = document.getElementById("hariTerakhir").value;
      let hasil = "";

      if (siklusMens < 21 || siklusMens > 35) {
        hasil = `<p class="text-danger">Siklus Anda tidak dalam rentang normal. Konsultasikan ke dokter jika sering terjadi.</p>`;
      } else {
        // Prediksi haid berikutnya
        const nextDate = new Date(hariTerakhir);
        nextDate.setDate(nextDate.getDate() + siklusMens);
        hasil = `<p class="text-success">Siklus Anda normal.</p>
                 <p>Perkiraan haid berikutnya: <b>${nextDate.toLocaleDateString()}</b></p>`;
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
