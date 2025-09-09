import BalitaPresenter from "./balita-presenter.js";

class BalitaPage {
  async render() {
    return `
		<div class="container py-5">
			<h2 class="section-title mb-4">Cek Kesehatan Balita</h2>
			<form id="balita-form" class="mb-4">
				<div class="mb-3">
					<label for="nama" class="form-label">Nama Anak</label>
					<input type="text" class="form-control" id="nama" required />
				</div>
				<div class="mb-3">
					<label for="tgl-lahir" class="form-label">Tanggal Lahir Anak</label>
					<input type="date" class="form-control" id="tgl-lahir" required />
				</div>
				<div class="mb-3">
					<label for="umur" class="form-label">Umur (bulan)</label>
					<input type="number" class="form-control" id="umur" required min="0" readonly />
				</div>
				<div class="mb-3">
					<label for="jk" class="form-label">Jenis Kelamin</label>
					<select class="form-select" id="jk" required>
						<option value="">Pilih...</option>
						<option value="L">Laki-laki</option>
						<option value="P">Perempuan</option>
					</select>
				</div>
				<div class="mb-3">
					<label for="bb" class="form-label">Berat Badan (kg)</label>
					<input type="number" class="form-control" id="bb" required min="1" step="any" />
				</div>
				<div class="mb-3">
					<label for="tb" class="form-label">Tinggi/Panjang Badan (cm)</label>
					<input type="number" class="form-control" id="tb" required min="1" step="any" />
				</div>
				<div class="mb-3">
					<label for="cara-ukur" class="form-label">Cara Ukur Tinggi</label>
					<input type="text" class="form-control" id="cara-ukur" required readonly />
				</div>
				<div class="mb-3">
					<label for="tgl-uk" class="form-label">Tanggal Pengukuran Terakhir</label>
					<input type="date" class="form-control" id="tgl-uk" required />
				</div>
				<button type="submit" class="btn btn-primary">Hitung Z-Score</button>
			</form>
			<div id="zscore-result"></div>
		</div>
		`;
  }

  async afterRender() {
    this._presenter = new BalitaPresenter({
      tampilan: this,
      wadahHasil: document.getElementById("zscore-result"),
    });

    const form = document.getElementById("balita-form");
    const tglLahirInput = document.getElementById("tgl-lahir");
    const umurInput = document.getElementById("umur");
    const caraUkurInput = document.getElementById("cara-ukur");

    // Hitung umur otomatis saat tanggal lahir diubah
    tglLahirInput.addEventListener("change", () => {
      const umurBulan = this._hitungUmurBulan(tglLahirInput.value);
      umurInput.value = umurBulan;
      // Tentukan cara ukur otomatis
      if (umurBulan < 24) {
        caraUkurInput.value = "Terentang";
      } else {
        caraUkurInput.value = "Berdiri";
      }
    });

    // Submit form
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const umurValue = parseInt(umurInput.value);
      if (isNaN(umurValue) || umurValue <= 0) {
        alert("Tanggal lahir harus diisi dengan benar agar umur terhitung.");
        umurInput.focus();
        return;
      }
      const data = {
        nama: document.getElementById("nama").value,
        tglLahir: tglLahirInput.value,
        umur: umurValue,
        jk: document.getElementById("jk").value,
        bb: parseFloat(document.getElementById("bb").value),
        tb: parseFloat(document.getElementById("tb").value),
        caraUkur: caraUkurInput.value,
        tglUk: document.getElementById("tgl-uk").value,
      };
      this._presenter.hitungZScoreAnak(data);
    });
  }

  _hitungUmurBulan(tglLahir) {
    if (!tglLahir) return 0;
    const lahir = new Date(tglLahir);
    const sekarang = new Date();
    let tahun = sekarang.getFullYear() - lahir.getFullYear();
    let bulan = sekarang.getMonth() - lahir.getMonth();
    let totalBulan = tahun * 12 + bulan;
    if (sekarang.getDate() < lahir.getDate()) totalBulan--;
    return totalBulan >= 0 ? totalBulan : 0;
  }

  // Dipanggil oleh presenter setelah hitung Z-Score
  tampilkanHasilZScore(data) {
    const container =
      this._presenter._wadahHasil || document.getElementById("zscore-result");
  // Helper untuk format 1 angka di belakang koma
  const fmt = (v) => {
    if (typeof v !== 'number') return v;
    if (Number.isInteger(v)) return v;
    return v.toFixed(1);
  };
  // Helper untuk bold rekomendasi jika ada dan berbeda dari input
  const rekom = (v, input) => {
    if (v === undefined || v === null || v === '-') return '-';
    if (typeof v === 'number' && typeof input === 'number' && Math.abs(v - input) < 0.01) return '-';
    return `<b>${fmt(v)}</b>`;
  };
  container.innerHTML = `
       <div class="hasil-zscore" style="background:#9dd53a;padding:24px;border-radius:8px;">
         <div style="margin-bottom:16px;">
           <b>Anak Anda</b>
           <div style="display:flex;flex-wrap:wrap;gap:24px 48px;margin:8px 0 16px 0;">
             <div>&#8250; Jenis Kelamin : ${
             data.jk === "L" ? "Laki-laki" : "Perempuan"
             }</div>
             <div>&#8250; Berat Badan : ${fmt(data.bb)} Kg</div>
             <div>&#8250; Usia : ${data.umur} Bulan</div>
             <div>&#8250; Tinggi Badan : ${fmt(data.tb)} Cm</div>
           </div>
         </div>
         <div style="margin-bottom:16px;">
           <b>Berat Badan Menurut Umur</b>
           <div>
             Berat badan anak anda menurut umur <b>${data.statusBBU}</b>, hasil: <b>${fmt(data.bb)}</b> kg
           </div>
           <div style="margin-top:8px;">
             Rekomendasi berat badan anak seharusnya ${rekom(data.bbIdealBBU, data.bb)} kg.
           </div>
         </div>
         <div style="margin-bottom:16px;">
           <b>Tinggi Badan Menurut Umur</b>
           <div>
             Tinggi badan anak anda menurut umur <b>${data.statusTBU}</b>, hasil: <b>${fmt(data.tb)}</b> cm
           </div>
           <div style="margin-top:8px;">
             Rekomendasi tinggi badan anak seharusnya ${rekom(data.tbIdealTBU, data.tb)} cm.
           </div>
         </div>
         <div style="margin-bottom:16px;">
           <b>Berat Badan Menurut Tinggi Badan</b>
           <div>
             Berat badan anak anda menurut tinggi badan <b>${data.statusBBTB}</b>, hasil: <b>${fmt(data.bb)}</b> kg
           </div>
           <div style="margin-top:8px;">
             Rekomendasi berat badan anak seharusnya ${rekom(data.bbIdealBBTB, data.bb)} kg.
           </div>
         </div>
       </div>
     `;
  }
}

export default BalitaPage;