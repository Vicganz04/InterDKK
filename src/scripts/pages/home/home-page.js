import HomePresenter from './home-presenter.js';

export default class HomePage {
  #presenter;

  async render() {
    return `
<!-- Hero Section -->
      <section class="hero-section py-5 section-bg">
        <div class="container text-center p-5">
          <h1 class="display-5 fw-bold section-title">
            Selamat Datang di <span class="brand-green">Nutri</span><span class="brand-secondary">Check</span>
          </h1>
          <p class="lead section-subtitle">
            Cek Gizi, Kendalikan Kalori, Jaga Kesehatan.
          </p>
          <a href="#/services" class="btn btn-success mt-3 px-4 py-2">
            Layanan Kami
          </a>
        </div>
      </section>



      <!-- Kenapa Mengecek IMT dan Kalori Harian Itu Penting?-->
      <section class="why-section py-5 section-bg">
        <div class="container">
          <div class="row align-items-center">
            <div class="col-md-6 mb-4 mb-md-0">
              <img src="/home.png" alt="Deteksi Dini" class="img-fluid rounded why-img" />
            </div>
            <div class="col-md-6 px-2 px-sm-0 text-center text-lg-start why-text">
              <h3 class="fw-bold mb-3 section-title">Kenapa Mengecek IMT dan Kalori Harian Itu Penting??</h3>
              <p class="section-subtitle">Mengetahui Indeks Massa Tubuh (IMT) membantu kita memahami apakah berat badan sudah ideal, kurang, atau berlebih. IMT yang tidak normal bisa meningkatkan risiko berbagai penyakit, seperti diabetes, hipertensi, hingga penyakit jantung.</p>
              <p class="section-subtitle">Selain itu, asupan kalori harian berperan penting dalam menjaga energi tubuh. Jika kalori terlalu sedikit, tubuh bisa lemas dan kekurangan gizi. Sebaliknya, jika kalori berlebihan, risiko obesitas dan penyakit metabolik semakin besar.</p>
            </div>
          </div>
        </div>
      </section>

      <div class="container py-5">
        <div class="row mb-5">
          <div class="col text-center">
            <h2 class="section-title display-6">Kenapa Anda Harus Manggunakan NutriCheck?</h2>
          </div>
        </div>

      <section class="features-section py-5 section-bg">
        <div class="container mt-5 mb-5">
          <div class="row text-center">
            <div class="col-md-4 mb-4">
              <img src="/akses.png" alt="Sehat" class="img-fluid mb-3 feature-img">
              <h5 class="fw-bold section-title">Akses Mudah</h5>
              <p class="section-subtitle">Website dapat diakses kapan saja dan di mana saja tanpa instalasi.</p>
            </div>
            <div class="col-md-4 mb-4">
              <img src="/hug.png" alt="Support" class="img-fluid mb-3 feature-img">
              <h5 class="fw-bold section-title">Privasi Terjamin</h5>
              <p class="section-subtitle">Data yang Anda masukkan tidak disalahgunakan.</p>
            </div>
            <div class="col-md-4 mb-4">
              <img src="/statistics.png" alt="Deteksi" class="img-fluid mb-3 feature-img">
              <h5 class="fw-bold section-title">Deteksi Berdasarkan Standar</h5>
              <p class="section-subtitle">Menggunakan standar WHO dan AKG Indonesia untuk hasil analisis IMT dan kebutuhan kalori yang tepat..</p>
            </div>
          </div>
        </div>
      </section>


    `;
  }

  async afterRender() {
    this.#presenter = new HomePresenter({ view: this });
  }
}
