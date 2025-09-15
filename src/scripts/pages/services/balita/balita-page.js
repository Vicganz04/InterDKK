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
				<button type="submit" class="btn btn-primary">Cek Sekarang</button>
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
      if (typeof v !== "number") return v;
      if (Number.isInteger(v)) return v;
      return v.toFixed(1);
    };
    // Helper untuk bold rekomendasi jika ada (selalu tampilkan, meskipun sama dengan input)
    const rekom = (v) => {
      if (v === undefined || v === null || v === "-") return "-";
      return `<b>${fmt(v)}</b>`;
    };
    // Helper untuk mapping status BBU ke warna, ikon, dan saran
    const bbuStatusMap = {
      "Sangat Kurang": {
        color: "#ff3b30",
        icon: "🔴",
        advice: `
          <div style="margin-top:8px;">
            <b>➡️ Kondisi serius/berbahaya</b><br>
            <b>Saran:</b>
            <ul style="margin:8px 0 0 18px;">
              <li>Segera konsultasi dengan dokter atau ahli gizi.</li>
              <li>Perbaiki pola makan dengan gizi tinggi energi &amp; protein (daging, ikan, telur, susu).</li>
              <li>Pantau pertumbuhan anak secara berkala di posyandu/puskesmas.</li>
              <li>Jaga kebersihan makanan &amp; lingkungan untuk mencegah infeksi.</li>
              <li>🧼 Biasakan cuci tangan pakai sabun sebelum makan.</li>
              <li>💧 Pastikan air minum yang digunakan bersih dan layak konsumsi.</li>
            </ul>
          </div>
        `,
      },
      Kurang: {
        color: "#ff9500",
        icon: "🟠",
        advice: `
          <div style="margin-top:8px;">
            <b>➡️ Peringatan, masih kurang tapi tidak separah merah</b><br>
            <b>Saran:</b>
            <ul style="margin:8px 0 0 18px;">
              <li>Tingkatkan asupan makanan bergizi seimbang (nasi, sayur, buah, protein hewani/nabati).</li>
              <li>Pastikan anak cukup tidur &amp; aktif bergerak.</li>
              <li>Berikan suplemen vitamin/mineral bila direkomendasikan tenaga kesehatan.</li>
              <li>Rutin cek pertumbuhan untuk mencegah kondisi memburuk.</li>
              <li>🚮 Buang sampah pada tempatnya agar lingkungan tetap sehat.</li>
              <li>📢 Ikuti penyuluhan kesehatan di posyandu/puskesmas.</li>
            </ul>
          </div>
        `,
      },
      Normal: {
        color: "#34c759",
        icon: "🟢",
        advice: `
          <div style="margin-top:8px;">
            <b>➡️ Aman/baik</b><br>
            <b>Saran:</b>
            <ul style="margin:8px 0 0 18px;">
              <li>Pertahankan pola makan sehat dan seimbang.</li>
              <li>Ajak anak tetap aktif dengan olahraga ringan &amp; permainan fisik.</li>
              <li>Lanjutkan pemantauan pertumbuhan rutin.</li>
              <li>Hindari kebiasaan makan berlebihan atau camilan tidak sehat.</li>
              <li>💉 Pastikan imunisasi lengkap sesuai usia anak.</li>
              <li>🌳 Jaga kebersihan lingkungan rumah dan halaman agar bebas jentik nyamuk.</li>
            </ul>
          </div>
        `,
      },
      "Risiko Berat Badan Lebih": {
        color: "#ffd60a",
        icon: "🟡",
        advice: `
          <div style="margin-top:8px;">
            <b>➡️ Peringatan risiko, masih bisa diatasi dengan pencegahan</b><br>
            <b>Saran:</b>
            <ul style="margin:8px 0 0 18px;">
              <li>Batasi makanan tinggi gula, garam, dan lemak jenuh (fast food, gorengan, minuman manis).</li>
              <li>Tingkatkan aktivitas fisik anak minimal 1 jam per hari.</li>
              <li>Atur porsi makan sesuai kebutuhan energi, jangan berlebihan.</li>
              <li>Perbanyak konsumsi sayur, buah, dan air putih.</li>
              <li>🚭 Hindari paparan asap rokok di rumah.</li>
              <li>📚 Ikut program promosi kesehatan tentang pola makan sehat.</li>
            </ul>
          </div>
        `,
      },
      "-": { color: "#bdbdbd", icon: "⚪", advice: "" },
    };
    const bbuStatus = bbuStatusMap[data.statusBBU] || bbuStatusMap["-"];
    // Helper untuk mapping status TBU ke warna, ikon, dan saran
    const tbuStatusMap = {
      "Sangat Pendek": {
        color: "#E74C3C",
        icon: "🔴",
        advice: `
          <div style="margin-top:8px;">
            <b>➡️ Indikasi serius, stunting berat/gizi buruk</b><br>
            <b>Saran:</b>
            <ul style="margin:8px 0 0 18px;">
              <li>Segera konsultasikan ke tenaga kesehatan untuk intervensi gizi khusus.</li>
              <li>Pastikan anak mendapat protein hewani cukup (ikan, telur, daging, susu).</li>
              <li>Berikan makanan padat gizi sejak MPASI dengan variasi karbohidrat, protein, sayur, buah.</li>
              <li>Cegah infeksi berulang (imunisasi, sanitasi, kebersihan makanan).</li>
              <li>Pantau pertumbuhan secara rutin di posyandu/puskesmas.</li>
              <li>💧 Gunakan jamban sehat dan air bersih.</li>
              <li>📢 Ikuti penyuluhan kesehatan tentang pencegahan stunting.</li>
            </ul>
          </div>
        `,
      },
      Pendek: {
        color: "#E67E22",
        icon: "🟠",
        advice: `
          <div style="margin-top:8px;">
            <b>➡️ Peringatan, masih kurang tetapi belum parah</b><br>
            <b>Saran:</b>
            <ul style="margin:8px 0 0 18px;">
              <li>Tingkatkan kualitas gizi dengan lebih banyak protein dan mikronutrien (zat besi, zinc, vitamin A).</li>
              <li>Lakukan stimulasi tumbuh kembang (permainan edukatif, aktivitas fisik ringan).</li>
              <li>Pastikan anak tidak sering sakit (jaga pola tidur, kebersihan, imunisasi lengkap).</li>
              <li>Konsultasi dini dengan ahli gizi/dokter untuk mencegah stunting.</li>
              <li>🚮 Jaga kebersihan lingkungan sekitar agar bebas dari sampah & vektor penyakit.</li>
              <li>📚 Ikut edukasi kesehatan di posyandu tentang gizi seimbang.</li>
            </ul>
          </div>
        `,
      },
      Normal: {
        color: "#2ECC71",
        icon: "🟢",
        advice: `
          <div style="margin-top:8px;">
            <b>➡️ Baik/Aman</b><br>
            <b>Saran:</b>
            <ul style="margin:8px 0 0 18px;">
              <li>Pertahankan pola makan seimbang dan rutin makan bergizi.</li>
              <li>Ajak anak tetap aktif berolahraga/bermain di luar.</li>
              <li>Terus pantau tinggi badan sesuai grafik pertumbuhan WHO.</li>
              <li>Hindari kebiasaan makan yang buruk (camilan tidak sehat, minuman bersoda).</li>
              <li>🌳 Rawat halaman rumah agar bebas jentik nyamuk.</li>
              <li>📢 Ikuti kampanye kesehatan sekolah atau lingkungan.</li>
            </ul>
          </div>
        `,
      },
      Tinggi: {
        color: "#3498DB",
        icon: "🔵",
        advice: `
          <div style="margin-top:8px;">
            <b>➡️ Positif, menandakan lebih tinggi dari rata-rata</b><br>
            <b>Saran:</b>
            <ul style="margin:8px 0 0 18px;">
              <li>Tidak berbahaya, tetap pantau agar tinggi badan seimbang dengan berat badan.</li>
              <li>Pastikan kebutuhan energi tercukupi agar tidak hanya tinggi tapi juga sehat.</li>
              <li>Dorong aktivitas fisik untuk menjaga kekuatan tulang & otot.</li>
              <li>Lanjutkan pola makan sehat dan gizi seimbang.</li>
              <li>🧼 Biasakan cuci tangan pakai sabun.</li>
              <li>💧 Gunakan air bersih untuk minum dan masak.</li>
            </ul>
          </div>
        `,
      },
      "-": { color: "#bdbdbd", icon: "⚪", advice: "" },
    };
    const tbuStatus = tbuStatusMap[data.statusTBU] || tbuStatusMap["-"];
    // Helper untuk mapping status BBTB ke warna, ikon, dan saran
    const bbtbStatusMap = {
      "Gizi Buruk": {
        color: "#C0392B",
        icon: "🔴",
        advice: `
          <div style="margin-top:8px;">
            <b>➡️ Sangat serius, butuh intervensi segera</b><br>
            <b>Saran:</b>
            <ul style="margin:8px 0 0 18px;">
              <li>Segera ke fasilitas kesehatan untuk penanganan gizi buruk.</li>
              <li>Tingkatkan asupan energi &amp; protein (susu, daging, telur, ikan).</li>
              <li>Pastikan anak tidak sering terkena infeksi (jaga kebersihan &amp; imunisasi).</li>
              <li>Pantau berat &amp; tinggi badan lebih sering.</li>
              <li>🚭 Hindari asap rokok di rumah.</li>
              <li>💧 Pastikan jamban sehat digunakan di rumah.</li>
            </ul>
          </div>
        `,
      },
      "Gizi Kurang": {
        color: "#E67E22",
        icon: "🟠",
        advice: `
          <div style="margin-top:8px;">
            <b>➡️ Peringatan, kondisi masih kurang</b><br>
            <b>Saran:</b>
            <ul style="margin:8px 0 0 18px;">
              <li>Tambahkan makanan bergizi padat (nasi, umbi-umbian, lauk berprotein, sayur, buah).</li>
              <li>Berikan makanan lebih sering dengan porsi kecil tapi bergizi.</li>
              <li>Cegah penyakit berulang dengan sanitasi baik.</li>
              <li>Rutin pantau pertumbuhan di posyandu/puskesmas.</li>
              <li>📚 Ikuti penyuluhan tentang gizi seimbang.</li>
              <li>🚮 Kelola sampah rumah tangga dengan benar.</li>
            </ul>
          </div>
        `,
      },
      "Gizi Baik": {
        color: "#27AE60",
        icon: "🟢",
        advice: `
          <div style="margin-top:8px;">
            <b>➡️ Normal/ideal</b><br>
            <b>Saran:</b>
            <ul style="margin:8px 0 0 18px;">
              <li>Pertahankan pola makan sehat &amp; seimbang.</li>
              <li>Dorong anak tetap aktif bermain &amp; olahraga ringan.</li>
              <li>Pantau pertumbuhan secara berkala untuk memastikan tetap ideal.</li>
              <li>🌳 Jaga lingkungan rumah agar sehat.</li>
              <li>📢 Ikut kampanye kesehatan sekolah/masyarakat.</li>
            </ul>
          </div>
        `,
      },
      "Risiko Gizi Lebih": {
        color: "#F1C40F",
        icon: "🟡",
        advice: `
          <div style="margin-top:8px;">
            <b>➡️ Ada risiko kelebihan berat badan</b><br>
            <b>Saran:</b>
            <ul style="margin:8px 0 0 18px;">
              <li>Atur pola makan dengan porsi sesuai kebutuhan, hindari kalori berlebihan.</li>
              <li>Kurangi makanan manis, gorengan, dan minuman bersoda.</li>
              <li>Perbanyak buah, sayur, dan air putih.</li>
              <li>Tingkatkan aktivitas fisik harian (bermain aktif, olahraga ringan).</li>
              <li>🚭 Terapkan rumah bebas asap rokok.</li>
              <li>🚮 Pastikan lingkungan sekitar bersih dari sampah menumpuk.</li>
            </ul>
          </div>
        `,
      },
      "Gizi Lebih": {
        color: "#2980B9",
        icon: "🟦",
        advice: `
          <div style="margin-top:8px;">
            <b>➡️ Berat badan lebih dari ideal</b><br>
            <b>Saran:</b>
            <ul style="margin:8px 0 0 18px;">
              <li>Batasi konsumsi fast food &amp; camilan tinggi kalori.</li>
              <li>Terapkan pola makan seimbang dengan lebih banyak sayur &amp; buah.</li>
              <li>Rutin olahraga/aktivitas fisik sesuai usia.</li>
              <li>Konsultasi dengan ahli gizi bila perlu untuk rencana diet sehat.</li>
              <li>💧 Minum air bersih yang cukup setiap hari.</li>
              <li>📢 Ikuti penyuluhan gaya hidup sehat.</li>
            </ul>
          </div>
        `,
      },
      Obesitas: {
        color: "#8E44AD",
        icon: "🟣",
        advice: `
          <div style="margin-top:8px;">
            <b>➡️ Kondisi serius, risiko penyakit metabolik</b><br>
            <b>Saran:</b>
            <ul style="margin:8px 0 0 18px;">
              <li>Segera konsultasikan ke dokter/ahli gizi untuk program intervensi.</li>
              <li>Terapkan diet rendah kalori tapi tetap bergizi seimbang.</li>
              <li>Batasi screen time &amp; dorong aktivitas fisik rutin.</li>
              <li>Edukasi keluarga tentang pola makan sehat agar konsisten di rumah.</li>
              <li>🚮 Pastikan lingkungan bebas dari sarang nyamuk &amp; sampah.</li>
              <li>📢 Ikuti kampanye kesehatan tentang obesitas &amp; penyakit tidak menular.</li>
            </ul>
          </div>
        `,
      },
      "-": { color: "#bdbdbd", icon: "⚪", advice: "" },
    };
    const bbtbStatus = bbtbStatusMap[data.statusBBTB] || bbtbStatusMap["-"];
    container.innerHTML = `
  <div class="hasil-zscore" style="background:#eafcf9;padding:24px;border-radius:10px;">
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
      <div style="display:flex;align-items:center;gap:8px;">
        <span style="font-size:1.5em;">${bbuStatus.icon}</span>
        <span style="color:${bbuStatus.color};font-weight:bold;">
          ${data.statusBBU}
        </span>
        <span style="margin-left:8px;">
          (hasil: <b>${fmt(data.bb)}</b> kg)
        </span>
      </div>
      <div style="margin-top:8px;">
        Rekomendasi berat badan anak seharusnya ${rekom(data.bbIdealBBU)} kg.
      </div>
      ${bbuStatus.advice}
    </div>
    <div style="margin-bottom:16px;">
      <b>Tinggi Badan Menurut Umur</b>
      <div style="display:flex;align-items:center;gap:8px;">
        <span style="font-size:1.5em;">${tbuStatus.icon}</span>
        <span style="color:${tbuStatus.color};font-weight:bold;">
          ${data.statusTBU}
        </span>
        <span style="margin-left:8px;">
          (hasil: <b>${fmt(data.tb)}</b> cm)
        </span>
      </div>
      <div style="margin-top:8px;">
        Rekomendasi tinggi badan anak seharusnya ${rekom(data.tbIdealTBU)} cm.
      </div>
      ${tbuStatus.advice}
    </div>
    <div style="margin-bottom:16px;">
      <b>Berat Badan Menurut Tinggi Badan</b>
      <div style="display:flex;align-items:center;gap:8px;">
        <span style="font-size:1.5em;">${bbtbStatus.icon}</span>
        <span style="color:${bbtbStatus.color};font-weight:bold;">
          ${data.statusBBTB}
        </span>
        <span style="margin-left:8px;">
          (hasil: <b>${fmt(data.bb)}</b> kg)
        </span>
      </div>
      <div style="margin-top:8px;">
        Rekomendasi berat badan anak seharusnya ${rekom(data.bbIdealBBTB)} kg.
      </div>
      ${bbtbStatus.advice}
    </div>
  </div>
`;
  }
}

export default BalitaPage;
