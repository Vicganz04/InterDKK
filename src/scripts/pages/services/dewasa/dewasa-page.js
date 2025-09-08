import DewasaPresenter from "./dewasa-presenter";

class DewasaPage {
	constructor() {
		this._presenter = null;
	}

	async render() {
		return `
			<div class="container py-5 section-bg">
				<h2 class="section-title mb-4">Cek Kesehatan Dewasa</h2>
				<form id="dewasa-form" class="mb-4">
					<div class="mb-3">
						<label for="nama" class="form-label">Nama</label>
						<input type="text" class="form-control" id="nama" required />
					</div>
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
						<label for="activity" class="form-label">Aktivitas Fisik Harian</label>
						<select class="form-control" id="activity" required>
							<option value="">Pilih</option>
							<option value="1.2">Sedentary (tidak banyak bergerak)</option>
							<option value="1.375">Ringan (olahraga ringan 1–3x/minggu)</option>
							<option value="1.55">Sedang (olahraga sedang 3–5x/minggu)</option>
							<option value="1.725">Aktif (olahraga berat 6–7x/minggu)</option>
							<option value="1.9">Sangat aktif (pekerja fisik/atlet)</option>
						</select>
					</div>
					<button type="submit" class="btn btn-success">Cek Kesehatan</button>
				</form>
				<div id="dewasa-result"></div>
			</div>
		`;
	}

	async afterRender() {
		const form = document.getElementById("dewasa-form");
		const resultDiv = document.getElementById("dewasa-result");

		this._presenter = new DewasaPresenter({
			view: this,
			resultContainer: resultDiv,
		});

		form.addEventListener("submit", (e) => {
			e.preventDefault();
			const nama = document.getElementById("nama").value;
			const gender = document.getElementById("gender").value;
			const weight = parseFloat(document.getElementById("weight").value);
			const height = parseFloat(document.getElementById("height").value);
			const age = parseInt(document.getElementById("age").value, 10);
			const activity = parseFloat(document.getElementById("activity").value);

			this._presenter.hitungKesehatanDewasa({ nama, gender, weight, height, age, activity });
		});
	}

		tampilkanHasilKesehatan({ nama, imt, statusIMT, statusGizi, saran, warna }) {
			document.getElementById("dewasa-result").innerHTML = `
				<div class="card card-result mt-3" style="background:${warna};">
					<div class="card-body">
						<h5 class="card-title">Hasil Cek Kesehatan Dewasa</h5>
						<p class="mb-1"><strong>Nama:</strong> ${nama}</p>
						<p class="mb-1"><strong>IMT:</strong> ${imt.toFixed(2)} (${statusIMT})</p>
						<p class="mb-1"><strong>Status Gizi:</strong> ${statusGizi}</p>
						<p class="mb-1"><strong>Saran:</strong> ${saran}</p>
					</div>
				</div>
			`;
		}
}

export default DewasaPage;
