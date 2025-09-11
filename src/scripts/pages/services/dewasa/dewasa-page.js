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
						<label for="nama" class="form-label">Nama</label>
						<input type="text" class="form-control" id="nama" />
					</div>
					<div class="mb-3">
						<label for="age" class="form-label">Usia </label>
						<input type="number" class="form-control" id="age" min="1" step="1" />
					</div>
					<div class="mb-3">
						<label for="gender" class="form-label">Jenis Kelamin </label>
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
    // Mapping status ke warna, ikon, dan saran pencegahan
    const imtStatusMap = {
      Kurus: {
        color: "#E74C3C",
        icon: "🔴",
        advice: `
          <b>Saran Pencegahan:</b>
          <ul style="margin:8px 0 0 18px;">
            <li>Perbanyak asupan kalori dan protein (nasi, roti, daging, ikan, telur, susu).</li>
            <li>Makan lebih sering dengan porsi kecil tapi bergizi.</li>
            <li>Hindari stres berlebih dan pastikan cukup tidur.</li>
            <li>Konsultasi dengan ahli gizi bila penurunan berat badan signifikan.</li>
          </ul>
        `,
      },
      Normal: {
        color: "#2ECC71",
        icon: "🟢",
        advice: `
          <b>Saran Pencegahan:</b>
          <ul style="margin:8px 0 0 18px;">
            <li>Pertahankan pola makan gizi seimbang.</li>
            <li>Olahraga teratur (150 menit/minggu aktivitas sedang).</li>
            <li>Jaga kualitas tidur & hidrasi cukup.</li>
            <li>Lakukan cek kesehatan rutin setahun sekali.</li>
          </ul>
        `,
      },
      Overweight: {
        color: "#F1C40F",
        icon: "🟡",
        advice: `
          <b>Saran Pencegahan:</b>
          <ul style="margin:8px 0 0 18px;">
            <li>Kurangi makanan tinggi lemak, gula, dan garam.</li>
            <li>Tingkatkan aktivitas fisik (jalan cepat, bersepeda, renang).</li>
            <li>Atur porsi makan dan kurangi camilan berkalori tinggi.</li>
            <li>Pantau berat badan secara berkala.</li>
          </ul>
        `,
      },
      "Obesitas I": {
        color: "#E67E22",
        icon: "🟠",
        advice: `
          <b>Saran Pencegahan:</b>
          <ul style="margin:8px 0 0 18px;">
            <li>Terapkan diet rendah kalori namun tetap seimbang (lebih banyak sayur & buah).</li>
            <li>Rutin olahraga minimal 30 menit setiap hari.</li>
            <li>Batasi screen time & aktivitas sedentari.</li>
            <li>Konsultasi dengan dokter/ahli gizi untuk program penurunan berat badan.</li>
          </ul>
        `,
      },
      "Obesitas II": {
        color: "#C0392B",
        icon: "🔴",
        advice: `
          <b>Saran Pencegahan:</b>
          <ul style="margin:8px 0 0 18px;">
            <li>Segera konsultasi dengan dokter untuk intervensi medis/gizi.</li>
            <li>Lakukan program diet ketat dengan pengawasan tenaga kesehatan.</li>
            <li>Tingkatkan aktivitas fisik sesuai kemampuan.</li>
            <li>Hindari makanan cepat saji, minuman manis, dan gorengan.</li>
            <li>Cek kesehatan secara rutin (gula darah, tekanan darah, kolesterol).</li>
          </ul>
        `,
      },
    };

    // Normalisasi status agar cocok dengan key mapping
    let imtKey = status;
    if (status && status.toLowerCase().includes("kurus")) imtKey = "Kurus";
    else if (status && status.toLowerCase().includes("normal"))
      imtKey = "Normal";
    else if (status && status.toLowerCase().includes("overweight"))
      imtKey = "Overweight";
    else if (status && status.toLowerCase().includes("obesitas i"))
      imtKey = "Obesitas I";
    else if (status && status.toLowerCase().includes("obesitas ii"))
      imtKey = "Obesitas II";

    const imtStatus = imtStatusMap[imtKey] || {
      color: warna || "#f5f5f5",
      icon: "",
      advice: "",
    };

    document.getElementById("dewasa-result").innerHTML = `
      <div class="card card-result mt-3" style="background:${imtStatus.color};">
        <div class="card-body">
          <h5 class="card-title">Hasil IMT Dewasa</h5>
          ${nama ? `<p class="mb-1"><strong>Nama:</strong> ${nama}</p>` : ""}
          ${
            age ? `<p class="mb-1"><strong>Usia:</strong> ${age} tahun</p>` : ""
          }
          ${
            gender
              ? `<p class="mb-1"><strong>Jenis Kelamin:</strong> ${
                  gender === "male" ? "Pria" : "Wanita"
                }</p>`
              : ""
          }
          <p class="mb-1"><strong>Status Gizi:</strong> <span style="font-size:1.2em;">${
            imtStatus.icon
          }</span> <b>${status}</b></p>
          <p class="mb-1"><strong>IMT:</strong> ${imt}</p>
          ${imtStatus.advice}
        </div>
      </div>
    `;
  }
}

export default DewasaPage;
