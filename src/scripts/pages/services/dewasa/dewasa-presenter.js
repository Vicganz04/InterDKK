class DewasaPresenter {
	constructor({ view, resultContainer }) {
		this._view = view;
		this._resultContainer = resultContainer;
	}

			hitungKesehatanDewasa({ nama, gender, weight, height, age, activity }) {
				// Validasi input
				if (!nama || !gender || !weight || !height || !age || !activity || weight <= 0 || height <= 0 || age <= 0) {
					this._view.tampilkanHasilKesehatan({
						nama: nama || '-',
						imt: 0,
						statusIMT: 'Data tidak valid',
						statusGizi: 'Masukkan semua data dengan benar.',
						saran: '-',
						warna: '#bdbdbd'
					});
					return;
				}

				// IMT
				const imt = weight / Math.pow(height / 100, 2);
				let statusIMT = '';
				let statusGizi = '';
				let saran = '';
				let warna = '';
				if (imt < 18.5) {
					statusIMT = 'Kurus';
					statusGizi = 'Buruk (Gizi kurang)';
					saran = 'Perbaiki asupan gizi, perbanyak konsumsi makanan bergizi dan konsultasikan ke tenaga kesehatan.';
					warna = '#fff9c4'; // kuning
				} else if (imt < 25) {
					statusIMT = 'Normal';
					statusGizi = 'Baik (Gizi normal)';
					saran = 'Pertahankan pola makan sehat dan rutin berolahraga.';
					warna = '#c8e6c9'; // hijau
				} else {
					statusIMT = 'Obesitas';
					statusGizi = 'Buruk (Gizi lebih)';
					saran = 'Kurangi makanan tinggi kalori, tingkatkan aktivitas fisik, dan konsultasikan ke tenaga kesehatan.';
					warna = '#ffcdd2'; // merah
				}

				this._view.tampilkanHasilKesehatan({
					nama,
					imt,
					statusIMT,
					statusGizi,
					saran,
					warna
				});
			}
}

export default DewasaPresenter;
