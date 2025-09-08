import ServicesPresenter from "./services-presenter";

class ServicesPage {
  constructor() {
    this._presenter = null;
  }

  async render() {
    return `
      <div id="services-page-content-area" class="services-page-content-area"></div>
    `;
  }

  async afterRender() {
    const servicesContentAreaElement = document.querySelector(
      "#services-page-content-area"
    );
    if (!servicesContentAreaElement) {
      console.error("Elemen #services-page-content-area tidak ditemukan!");
      return;
    }

    this._presenter = new ServicesPresenter({
      view: this,
      container: servicesContentAreaElement,
    });

    await this._presenter.showServicesPageContent();
  }

  _getServicesContentTemplate() {
    return `
      <style>
        .card.h-100.shadow-sm {
          transition: box-shadow 0.3s, transform 0.3s;
        }
        .card.h-100.shadow-sm:hover {
          box-shadow: 0 8px 24px rgba(34, 139, 34, 0.15), 0 1.5px 6px rgba(0,0,0,0.08);
          transform: translateY(-6px) scale(1.03);
          border: 1.5px solid #6ebe77;
        }
        .btn-success {
          transition: background 0.2s, color 0.2s, box-shadow 0.2s;
        }
        .btn-success:hover, .btn-success:focus {
          background: #4cae4c;
          color: #fff;
          box-shadow: 0 2px 8px rgba(34,139,34,0.12);
        }
      </style>
      <section class="container py-5">
        <div class="row mb-4">
          <div class="col text-center">
            <h2 class="section-title mb-4">Layanan Kami</h2>
            <p class="section-subtitle">Pilih layanan yang sesuai kebutuhan Anda</p>
          </div>
        </div>
        <div class="row justify-content-center">
          <div class="col-md-4 mb-4">
            <div class="card h-100 shadow-sm">
              <div class="card-body text-center">
                <i class="fas fa-ruler card-service-icon"></i>
                <h5 class="card-service-title mb-2">Pengukuran IMT</h5>
                <p class="card-service-description text-muted">Hitung Indeks Massa Tubuh (IMT) Anda untuk mengetahui status berat badan.</p>
                <a href="#/imt" class="btn btn-success">Hitung IMT</a>
              </div>
            </div>
          </div>
          <div class="col-md-4 mb-4">
            <div class="card h-100 shadow-sm">
              <div class="card-body text-center">
                <i class="fas fa-fire fa-3x mb-3" style="color: #6ebe77;"></i>
                <h5 class="card-title fw-bold mb-2">Pengukuran Kalori Harian</h5>
                <p class="card-text text-muted">Ketahui kebutuhan kalori harian Anda berdasarkan data pribadi dan aktivitas.</p>
                <a href="#/calories" class="btn btn-success">Hitung Kalori</a>
              </div>
            </div>
          </div>
          <div class="col-md-4 mb-4">
            <div class="card h-100 shadow-sm">
              <div class="card-body text-center">
                <i class="fas fa-hospital fa-3x mb-3" style="color: #6ebe77;"></i>
                <h5 class="card-title fw-bold mb-2">Puskesmas di Semarang</h5>
                <p class="card-text text-muted">Lihat daftar puskesmas yang ada di Kota Semarang untuk layanan kesehatan.</p>
                <a href="#/puskesmas" class="btn btn-success">Lihat Puskesmas</a>
              </div>
            </div>
          </div>
            <div class="col-md-4 mb-4">
              <div class="card h-100 shadow-sm">
                <div class="card-body text-center">
                  <i class="fas fa-apple-alt fa-3x mb-3" style="color: #6ebe77;"></i>
                  <h5 class="card-title fw-bold mb-2">Cek Gizi</h5>
                  <p class="card-text text-muted">Cek status gizi anak dan keluarga berdasarkan standar WHO.</p>
                  <a href="#/cekgizi" class="btn btn-success">Cek Gizi</a>
                </div>
              </div>
            </div>
            <div class="col-md-4 mb-4">
              <div class="card h-100 shadow-sm">
                <div class="card-body text-center">
                  <i class="fas fa-baby fa-3x mb-3" style="color: #6ebe77;"></i>
                  <h5 class="card-title fw-bold mb-2">Cek Stunting</h5>
                  <p class="card-text text-muted">Deteksi risiko stunting pada anak secara cepat dan mudah.</p>
                  <a href="#/stunting" class="btn btn-success">Cek Stunting</a>
                </div>
              </div>
            </div>
            <div class="col-md-4 mb-4">
              <div class="card h-100 shadow-sm">
                <div class="card-body text-center">
                  <i class="fas fa-tint fa-3x mb-3" style="color: #6ebe77;"></i>
                  <h5 class="card-title fw-bold mb-2">Kebutuhan Mineral Harian</h5>
                  <p class="card-text text-muted">Ketahui kebutuhan mineral harian tubuh Anda untuk hidup sehat.</p>
                  <a href="#/mineral" class="btn btn-success">Cek Mineral</a>
                </div>
              </div>
            </div>
              </div>
            </div>
          </div>
    `;
  }

  displayContent(containerElement) {
    if (containerElement) {
      containerElement.innerHTML = this._getServicesContentTemplate();
    } else {
      console.error(
        "Container element untuk ServicesPage tidak ditemukan oleh View."
      );
    }
  }
}

export default ServicesPage;
