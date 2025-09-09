
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
			   const data = {
				   nama: document.getElementById("nama").value,
				   tglLahir: tglLahirInput.value,
				   umur: parseInt(umurInput.value),
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
		   // Gunakan wadah hasil yang sudah diberikan ke presenter
		   const container = this._presenter._wadahHasil || document.getElementById("zscore-result");
		   container.innerHTML = `
			   <div class="hasil-zscore">
				   <h4>Hasil Status Gizi Anak</h4>
				   <ul>
					   <li><b>BB/U:</b> ${data.statusBBU} (Z: ${data.zScoreBBU?.toFixed(2) ?? "-"}, Rekom: ${data.rekomBBU})</li>
					   <li><b>TB/U:</b> ${data.statusTBU} (Z: ${data.zScoreTBU?.toFixed(2) ?? "-"}, Rekom: ${data.rekomTBU})</li>
					   <li><b>BB/TB:</b> ${data.statusIMTU} (Z: ${data.zScoreIMTU?.toFixed(2) ?? "-"}, Rekom: ${data.rekomIMTU})</li>
				   </ul>
			   </div>
		   `;
	   }
}

export default BalitaPage;
