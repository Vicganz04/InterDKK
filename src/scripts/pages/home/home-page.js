import HomePresenter from './home-presenter.js';

export default class HomePage {
  #presenter;

  async render() {

    return `
<!-- Hero Section with Live Wallpaper -->
<section class="hero-section py-5 section-bg" style="position:relative; min-height: 672px; overflow:hidden; background:linear-gradient(120deg,#6ebe77 60%,#b6e2c6 100%);">
  <!-- Live SVG Waves Wallpaper -->
  <div style="position:absolute;top:0;left:0;width:100%;height:100%;z-index:0;pointer-events:none;">
    <svg viewBox="0 0 1440 720" width="100%" height="100%" preserveAspectRatio="none" style="display:block;">
      <defs>
        <linearGradient id="waveGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#6ebe77"/>
          <stop offset="100%" stop-color="#b6e2c6"/>
        </linearGradient>
        <filter id="blurWave"><feGaussianBlur stdDeviation="20"/></filter>
      </defs>
      <g>
        <path id="wave1" d="M0,480 Q360,600 720,480 T1440,480 V720 H0Z" fill="url(#waveGrad)" opacity="0.7">
          <animate attributeName="d" dur="8s" repeatCount="indefinite"
            values="M0,480 Q360,600 720,480 T1440,480 V720 H0Z;
                    M0,500 Q360,400 720,500 T1440,480 V720 H0Z;
                    M0,480 Q360,600 720,480 T1440,480 V720 H0Z"/>
        </path>
        <path id="wave2" d="M0,520 Q360,640 720,520 T1440,520 V720 H0Z" fill="#fff" opacity="0.12" filter="url(#blurWave)">
          <animate attributeName="d" dur="10s" repeatCount="indefinite"
            values="M0,520 Q360,640 720,520 T1440,520 V720 H0Z;
                    M0,540 Q360,540 720,540 T1440,520 V720 H0Z;
                    M0,520 Q360,640 720,520 T1440,520 V720 H0Z"/>
        </path>
      </g>
    </svg>
  </div>
  <div class="container-fluid" style="position:relative;z-index:2;">
    <div class="row align-items-center">
      <div class="col-lg-6 col-md-7 text-white px-5 py-4">
        <h2 class="fw-bold mb-3" style="font-size:2.7rem;line-height:1.15;">
          Nutricek – Layanan Pemeriksaan Kesehatan Mandiri Secara Online
        </h2>
        <p class="lead mb-4" style="font-size:1.25rem;">
          Platform daring yang menyediakan layanan pemeriksaan kesehatan balita maupun dewasa, serta informasi kesehatan masyarakat Kota Semarang.
        </p>
        <div class="d-flex flex-wrap gap-3 mb-4">
          <a href="#/balita" class="btn btn-success px-4 py-2 fw-semibold" style="min-width:200px;">
            Cek Kesehatan Balita
          </a>
          <a href="#/dewasa" class="btn btn-outline-light px-4 py-2 fw-semibold" style="min-width:200px;">
            Cek Kesehatan Dewasa
          </a>
        </div>
        <div class="d-flex flex-wrap gap-3 mb-4">
          <a href="#/puskesmas" class="btn btn-info px-4 py-2 text-white fw-semibold" style="min-width:200px;">
            Informasi Puskesmas
          </a>
          <a href="#/haid" class="btn btn-warning px-4 py-2 text-dark fw-semibold" style="min-width:200px;">
            Siklus Haid
          </a>
        </div>
      </div>
      <div class="col-lg-6 col-md-5 text-center px-0">
        <img src="/herosection.png" alt="Deteksi Dini" class="img-fluid" style="max-height:500px;object-fit:contain;background:transparent;" />
      </div>
    </div>
  </div>
</section>

<!-- Section Layanan Kami -->
<section class="layanan-section py-5" style="background: #f8fcfd;">
  <div class="container">
    <h2 class="text-center fw-bold mb-5" style="font-size:2.2rem;">Layanan Kami</h2>
    <div class="row justify-content-center">
      <div class="col-md-3 mb-4">
        <div class="card h-100 shadow-sm border-1 text-center p-3" style="border-radius:20px;">
          <img src="/baby.png" alt="Balita" style="height:45px;width:auto;object-fit:contain;opacity:0.50;" class="mb-3 mx-auto">
          <h5 class="fw-bold mb-2">Pemeriksaan Kesehatan Balita</h5>
          <p class="mb-3">Menyediakan pemantauan tumbuh kembang balita berdasarkan data usia, berat badan, dan tinggi badan sesuai standar kesehatan.</p>
          <a href="#/balita" class="fw-semibold text-success">Read more &gt;</a>
        </div>
      </div>
      <div class="col-md-3 mb-4">
        <div class="card h-100 shadow-sm border-1 text-center p-3" style="border-radius:20px;">
          <img src="/adult.png" alt="Dewasa" style="height:45px;width:auto;object-fit:contain;opacity:0.50;" class="mb-3 mx-auto">
          <h5 class="fw-bold mb-2">Pemeriksaan Kesehatan Dewasa</h5>
          <p class="mb-3">Membantu menghitung indeks massa tubuh (IMT), kebutuhan kalori harian, serta memberikan informasi status gizi.</p>
          <a href="#/dewasa" class="fw-semibold text-success">Read more &gt;</a>
        </div>
      </div>
      <div class="col-md-3 mb-4">
        <div class="card h-100 shadow-sm border-1 text-center p-3" style="border-radius:20px;">
          <img src="/medical.png" alt="Puskesmas" style="height:45px;width:auto;object-fit:contain;opacity:0.50;" class="mb-3 mx-auto">
          <h5 class="fw-bold mb-2">Informasi Puskesmas Kota Semarang</h5>
          <p class="mb-3">Menyajikan daftar puskesmas beserta lokasi dan informasi layanan kesehatan yang tersedia di Kota Semarang.</p>
          <a href="#/puskesmas" class="fw-semibold text-success">Read more &gt;</a>
        </div>
      </div>
      <div class="col-md-3 mb-4">
        <div class="card h-100 shadow-sm border-1 text-center p-3" style="border-radius:20px;">
          <img src="/menstrual.png" alt="Siklus Haid" style="height:45px;width:auto;object-fit:contain;opacity:0.50;" class="mb-3 mx-auto">
          <h5 class="fw-bold mb-2">Pemantauan Siklus Haid</h5>
          <p class="mb-3">Memfasilitasi pencatatan serta pemantauan siklus haid untuk mendukung kesehatan reproduksi perempuan.</p>
          <a href="#/haid" class="fw-semibold text-success">Read more &gt;</a>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Section Kenapa Nutricek Penting -->
<section class="nutricek-section py-5" style="background: #eafcf9;">
  <div class="container">
    <h2 class="fw-bold text-center mb-4" style="font-size:2rem;">Mengapa Nutricek Penting untuk Kesehatan Anda dan Keluarga?</h2>
    <p class="text-center mb-5" style="font-size:1.15rem;">
      Nutricek membantu masyarakat memantau kesehatan secara mandiri, baik untuk balita maupun dewasa.
    </p>
    <div class="row justify-content-center">
      <div class="col-md-6 mb-4">
        <div class="bg-white rounded shadow-sm p-4 h-100">
          <h5 class="fw-bold mb-2">Memantau Pertumbuhan Balita</h5>
          <p class="mb-0">Pemantauan rutin berat dan tinggi badan anak memastikan tumbuh kembang sesuai usia, mencegah risiko stunting dan gizi buruk.</p>
        </div>
      </div>
      <div class="col-md-6 mb-4">
        <div class="bg-white rounded shadow-sm p-4 h-100">
          <h5 class="fw-bold mb-2">Mengetahui IMT & Kalori Harian</h5>
          <p class="mb-0">IMT dan kalori harian membantu menjaga berat badan ideal dan energi tubuh, serta mencegah risiko penyakit seperti diabetes dan obesitas.</p>
        </div>
      </div>
      <div class="col-md-6 mb-4">
        <div class="bg-white rounded shadow-sm p-4 h-100">
          <h5 class="fw-bold mb-2">Akses Informasi Puskesmas</h5>
          <p class="mb-0">Mengetahui lokasi dan layanan puskesmas memudahkan masyarakat memperoleh layanan kesehatan dasar secara cepat dan tepat.</p>
        </div>
      </div>
      <div class="col-md-6 mb-4">
        <div class="bg-white rounded shadow-sm p-4 h-100">
          <h5 class="fw-bold mb-2">Memantau Siklus Haid</h5>
          <p class="mb-0">Pencatatan siklus haid membantu perempuan memahami kondisi tubuh dan mendeteksi gangguan kesehatan reproduksi lebih dini.</p>
        </div>
      </div>
    </div>
  </div>
</section>

      <!-- Section CTA -->
<section class="cta-section py-5" style="
  position: relative;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), 
              url('/ctabg.jpg') center center/cover no-repeat;
">
  <div class="container position-relative" style="z-index:2;">
    <div class="row justify-content-center align-items-center">
      <div class="col-lg-8 text-center text-white py-5">
        <h2 class="fw-bold mb-3" style="font-size:2.3rem;">Mulai Pantau Kesehatan Anda Sekarang</h2>
        <p class="mb-3" style="font-size:1.15rem;">
          Jangan tunggu sampai masalah kesehatan muncul. Dengan Nutricek, Anda dapat melakukan pemeriksaan kesehatan balita maupun dewasa secara mandiri, memantau siklus haid, dan mengakses informasi puskesmas di Kota Semarang dengan mudah dan cepat.
        </p>
        <a href="#/services" class="btn btn-warning px-5 py-3 fw-bold" style="font-size:1.1rem; border-radius:30px;">
          Mulai Sekarang
        </a>
      </div>
    </div>
  </div>
</section>

    `;
  }

  async afterRender() {
    this.#presenter = new HomePresenter({ view: this });
    setTimeout(restartHeroAnimations, 50);
  }
}

// Fungsi global, letakkan di luar class!
function restartHeroAnimations() {
  // Restart SVG <animate> (wave background)
  const heroWaveSVGs = document.querySelectorAll('.hero-animated-bg svg animate');
  heroWaveSVGs.forEach(anim => {
    anim.beginElement && anim.beginElement();
  });
  // Restart CSS animation pada gambar ilustrasi
  const heroImg = document.querySelector('.hero-float-img');
  if (heroImg) {
    heroImg.style.animation = 'none';
    // Force reflow
    void heroImg.offsetWidth;
    heroImg.style.animation = '';
  }
}
