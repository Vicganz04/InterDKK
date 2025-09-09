import DewasaPresenter from "./dewasa-presenter";

class DewasaPage {
	constructor() {
		this._presenter = null;
	}

	async render() {
		return `
			<div class="container py-5 section-bg">
				<h2 class="section-title mb-4">Cek IMT Dewasa</h2>
				<form id="dewasa-form" class="mb-4">
					<div class="mb-3">
						<label for="nama" class="form-label">Nama (opsional)</label>
						<input type="text" class="form-control" id="nama" />
					</div>
					<div class="mb-3">
						<label for="age" class="form-label">Usia (opsional)</label>
						<input type="number" class="form-control" id="age" min="1" step="1" />
					</div>
					<div class="mb-3">
						<label for="gender" class="form-label">Jenis Kelamin (opsional)</label>
						<select class="form-control" id="gender">
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
					<button type="submit" class="btn btn-success">Cek </button>
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
			const age = document.getElementById("age").value;
			const gender = document.getElementById("gender").value;
			const weight = parseFloat(document.getElementById("weight").value);
			const height = parseFloat(document.getElementById("height").value);

			this._presenter.hitungIMTDewasa({ nama, age, gender, weight, height });
		});
	}

	tampilkanHasilIMT({ nama, age, gender, imt, status, saran, warna }) {
		document.getElementById("dewasa-result").innerHTML = `
			<div class="card card-result mt-3" style="background:${warna || '#f5f5f5'};">
				<div class="card-body">
					<h5 class="card-title">Hasil IMT Dewasa</h5>
					${nama ? `<p class="mb-1"><strong>Nama:</strong> ${nama}</p>` : ""}
					${age ? `<p class="mb-1"><strong>Usia:</strong> ${age} tahun</p>` : ""}
					${gender ? `<p class="mb-1"><strong>Jenis Kelamin:</strong> ${gender === 'male' ? 'Pria' : 'Wanita'}</p>` : ""}
					<p class="mb-1"><strong>IMT:</strong> ${imt}</p>
					<p class="mb-1"><strong>Status Gizi:</strong> ${status}</p>
					<p class="mb-1"><strong>Saran:</strong> ${saran}</p>
				</div>
			</div>
		`;
	}
}

export default DewasaPage;
