class DewasaPresenter {
	constructor({ view, resultContainer }) {
		this._view = view;
		this._resultContainer = resultContainer;
	}

	hitungIMTDewasa({ nama, age, gender, weight, height }) {
		// Validasi input wajib
		if (!weight || !height || weight <= 0 || height <= 0) {
			this._view.tampilkanHasilIMT({
				nama: nama || '',
				age: age || '',
				gender: gender || '',
				imt: '-',
				status: 'Data tidak valid',
				saran: 'Masukkan berat dan tinggi badan dengan benar.',
				warna: '#f5f5f5'
			});
			return;
		}

		// Hitung IMT
		const tinggiMeter = height / 100;
		const imtValue = weight / (tinggiMeter * tinggiMeter);
		const imt = imtValue.toFixed(2);

		// Kategori WHO + warna
		let status = '';
		let saran = '';
		let warna = '';
		if (imtValue < 18.5) {
			status = 'Kurus (Underweight)';
			saran = 'Perbaiki asupan gizi dan konsultasikan ke tenaga kesehatan.';
			warna = '#fff9c4'; // kuning muda
		} else if (imtValue < 25) {
			status = 'Normal';
			saran = 'Jaga pola makan sehat dan olahraga rutin.';
			warna = '#c8e6c9'; // hijau muda
		} else if (imtValue < 30) {
			status = 'Overweight (Kelebihan berat badan)';
			saran = 'Kurangi makanan tinggi kalori dan tingkatkan aktivitas fisik.';
			warna = '#ffe0b2'; // oranye muda
		} else {
			status = 'Obesitas';
			saran = 'Segera konsultasikan ke dokter gizi dan perbaiki pola hidup.';
			warna = '#ffcdd2'; // merah muda
		}

		this._view.tampilkanHasilIMT({
			nama: nama || '',
			age: age || '',
			gender: gender || '',
			imt,
			status,
			saran,
			warna
		});
	}
}

export default DewasaPresenter;
