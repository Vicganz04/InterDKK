import AboutPresenter from "./about-presenter";

class AboutPage {
  constructor() {
    this._presenter = null;
  }

  async render() {
    return `
      <div id="about-page-content-area" class="about-page-content-area"></div>
    `;
  }

  async afterRender() {
    const aboutContentAreaElement = document.querySelector(
      "#about-page-content-area"
    );
    if (!aboutContentAreaElement) {
      console.error("Elemen #about-page-content-area tidak ditemukan!");
      return;
    }

    this._presenter = new AboutPresenter({
      view: this,
      container: aboutContentAreaElement,
    });

    await this._presenter.showAboutPageContent();
  }

  _getAboutContentTemplate() {
    return `
    <!-- Hero Section with Background Image (compact height, center content, no shadow, no img anxiety) -->
    <section class="about-hero-section d-flex align-items-center justify-content-center" style="background: url('/about.jpg') center center/cover no-repeat; min-height:380px; max-height:420px; width:100%; position:relative; overflow-x:hidden; overflow-y:hidden;">
      <div class="container position-relative z-2 h-100 d-flex flex-column justify-content-center align-items-center">
        <div class="text-white text-center" style="background:rgba(30,60,114,0.10); padding:32px 20px; max-width:520px; margin:auto;">
          <h1 class="display-6 fw-bold mb-2" style="text-shadow:none; font-size:2.1rem;">Tentang HealthMate</h1>
          <p class="lead mb-0" style="text-shadow:none; font-size:1.08rem;">HealthMate adalah aplikasi web untuk membantu Anda menjaga kesehatan dengan fitur cek IMT, kalkulator kalori, dan info kesehatan. Praktis, mudah, dan modern.</p>
        </div>
      </div>
    </section>

    <!-- HealthMate Section Tengah -->
    <section class="about-why-section py-5" style="background:#f8fafd;">
      <div class="container d-flex flex-column align-items-center justify-content-center">
        <h2 class="text-center fw-bold mb-4" style="font-size:2rem;">Kenapa Memilih HealthMate?</h2>
        <div class="d-flex flex-row flex-wrap justify-content-center gap-4 mb-4 w-100" style="max-width:1100px;">
          <div class="why-card bg-white p-4 px-4 text-center shadow-sm d-flex flex-column align-items-center" style="min-width:280px; max-width:340px; min-height:180px; border:1.5px solid #6ebe77;">
            <div class="mb-3"><i class="fas fa-bolt" style="font-size:2.5rem;color:#6ebe77;"></i></div>
            <div class="fw-semibold mb-2" style="font-size:1.18rem; color:#104f1f;">Cepat & Mudah</div>
            <div class="text-muted" style="font-size:1.04rem;">Cek kesehatan hanya dalam beberapa klik, tanpa ribet.</div>
          </div>
          <div class="why-card bg-white p-4 px-4 text-center shadow-sm d-flex flex-column align-items-center" style="min-width:280px; max-width:340px; min-height:180px; border:1.5px solid #6ebe77;">
            <div class="mb-3"><i class="fas fa-shield-alt" style="font-size:2.5rem;color:#6ebe77;"></i></div>
            <div class="fw-semibold mb-2" style="font-size:1.18rem; color:#104f1f;">Akurat & Andal</div>
            <div class="text-muted" style="font-size:1.04rem;">Data dan perhitungan berbasis standar kesehatan resmi.</div>
          </div>
          <div class="why-card bg-white p-4 px-4 text-center shadow-sm d-flex flex-column align-items-center" style="min-width:280px; max-width:340px; min-height:180px; border:1.5px solid #6ebe77;">
            <div class="mb-3"><i class="fas fa-users" style="font-size:2.5rem;color:#6ebe77;"></i></div>
            <div class="fw-semibold mb-2" style="font-size:1.18rem; color:#104f1f;">Untuk Semua</div>
            <div class="text-muted" style="font-size:1.04rem;">Balita, dewasa, dan keluarga, semua bisa pakai.</div>
          </div>
        </div>
      </div>
    </section>

    <div class="about-section py-5">
      <div class="container">
        <div class="row mb-4">
          <div class="col-12 text-center mb-5">
            <h2 class="fw-bold display-6" style="color: #104f1f;">Dinas Kesehatan Kota Semarang</h2>
          </div>
        </div>
        <div class="row align-items-center justify-content-center">
          <div class="col-lg-5 col-md-12 text-center mb-4 mb-lg-0">
            <div style="width:100%; max-width:450px; margin:auto; box-sizing:border-box;">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3454.853216940219!2d110.4122917749971!3d-6.986891993014075!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e708b5ab6b34b67%3A0x4eba79d618667033!2sDinas%20Kesehatan%20Kota%20Semarang!5e1!3m2!1sid!2sid!4v1757475077948!5m2!1sid!2sid" width="100%" height="260" style="border:0; display:block;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>
          </div>
          <div class="col-lg-7 col-md-12">
            <div class="about-text px-2 px-sm-0 text-center text-lg-start" style="color: #104f1f; line-height: 1.6; font-size: 1.08rem;">
              <p>
                Dinas Kesehatan Kota Semarang (DKK) adalah instansi pemerintah daerah yang bertanggung jawab dalam penyelenggaraan urusan kesehatan di Kota Semarang. DKK berperan dalam perumusan kebijakan, pelaksanaan program kesehatan masyarakat, pengawasan fasilitas kesehatan, serta peningkatan kualitas layanan kesehatan bagi seluruh warga kota.
              </p>
              <p>
                Melalui berbagai program promotif, preventif, kuratif, dan rehabilitatif, DKK Semarang berkomitmen untuk mewujudkan masyarakat yang sehat, mandiri, dan berdaya saing. DKK juga aktif dalam edukasi, inovasi layanan, serta kolaborasi lintas sektor demi tercapainya derajat kesehatan yang optimal.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    `;
  }

  displayContent(containerElement) {
    if (containerElement) {
      containerElement.innerHTML = this._getAboutContentTemplate();
    } else {
      console.error(
        "Container element untuk AboutPage tidak ditemukan oleh View."
      );
    }
  }
}

export default AboutPage;
