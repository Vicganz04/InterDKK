class StuntPresenter {
	constructor({ view, resultContainer }) {
		this._view = view;
		this._resultContainer = resultContainer;
	}

	// Dummy median & SD, ganti dengan data WHO asli jika tersedia
	getMedianSD(umur) {
		// Contoh: median dan SD statis, bisa diganti dengan lookup tabel WHO
		// Misal: umur < 24 bulan, median 80cm, sd 3.5; umur >=24, median 90cm, sd 4.5
		if (umur < 24) return { median: 80, sd: 3.5 };
		return { median: 90, sd: 4.5 };
	}

	interpretasiZ(z) {
		if (z < -3) return { status: 'Sangat Pendek (Stunting Berat)', warna: '#F1948A', saran: 'Segera konsultasikan ke faskes, anak sangat berisiko stunting.' };
		if (z >= -3 && z < -2) return { status: 'Pendek (Stunting)', warna: '#F8C471', saran: 'Anak berisiko stunting, perbaiki asupan gizi dan pantau tumbuh kembang.' };
		if (z >= -2 && z <= 2) return { status: 'Normal', warna: '#82E0AA', saran: 'Tinggi badan anak normal sesuai umur.' };
		if (z > 2) return { status: 'Tinggi', warna: '#7FB3D5', saran: 'Tinggi badan anak di atas rata-rata, tetap pantau tumbuh kembang.' };
		return { status: 'Tidak diketahui', warna: '#bdbdbd', saran: '-' };
	}

	cekStunting(tinggi, umur) {
		if (!tinggi || !umur || tinggi <= 0 || umur <= 0) {
			this._view.tampilkanHasilStunting({
				zscore: 0,
				status: "Data tidak valid",
				saran: "Masukkan tinggi badan dan umur yang benar.",
				warna: "#2ffe70ff"
			});
			return;
		}

		const { median, sd } = this.getMedianSD(umur);
		const zscore = (tinggi - median) / sd;
		const { status, warna, saran } = this.interpretasiZ(zscore);

		this._view.tampilkanHasilStunting({ zscore, status, saran, warna });
	}
}

export default StuntPresenter;
