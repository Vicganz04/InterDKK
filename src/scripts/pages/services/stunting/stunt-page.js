import StuntPresenter from "./stunt-presenter";

class StuntPage {
	constructor() {
		this._presenter = null;
	}

	async render() {
		return `
			<div class="container py-5">
				<h2 class="section-title mb-4">Cek Stunting Anak</h2>
				<form id="stunt-form" class="mb-4">
					<div class="mb-3">
						<label for="tinggi" class="form-label">Tinggi Badan (cm)</label>
						<input type="number" class="form-control" id="tinggi" required min="1" step="any" />
					</div>
					<div class="mb-3">
						<label for="umur" class="form-label">Umur (bulan)</label>
						<input type="number" class="form-control" id="umur" required min="1" step="1" />
					</div>
					<button type="submit" class="btn btn-success">Cek Stunting</button>
				</form>
				<div id="stunt-result"></div>
			</div>
		`;
	}

	async afterRender() {
		const form = document.getElementById("stunt-form");
		const resultDiv = document.getElementById("stunt-result");

		this._presenter = new StuntPresenter({
			view: this,
			resultContainer: resultDiv,
		});

		form.addEventListener("submit", (e) => {
			e.preventDefault();
			const tinggi = parseFloat(document.getElementById("tinggi").value);
			const umur = parseInt(document.getElementById("umur").value, 10);
			this._presenter.cekStunting(tinggi, umur);
		});
	}

	tampilkanHasilStunting({ zscore, status, saran, warna }) {
		document.getElementById("stunt-result").innerHTML = `
			<div class="card card-result mt-3" style="background:${warna}; color:#fff;">
				<div class="card-body">
					<h5 class="card-title">Hasil Cek Stunting</h5>
					<p class="mb-1"><strong>Z-Score TB/U:</strong> ${zscore.toFixed(2)}</p>
					<p class="mb-1"><strong>Status:</strong> ${status}</p>
					<p class="mb-0"><strong>Saran:</strong> ${saran}</p>
				</div>
			</div>
		`;
	}
}

export default StuntPage;
