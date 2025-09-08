import AboutPresenter from "./about-presenter";

class AboutPage {
  constructor() {
    this._presenter = null;
    this._aboutImageUrl = "/anxiety.png";
    this._presenterName = "CC25-CF325";
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
    const presenterInfo = `
      <p>Website ini dibuat dan dikelola oleh Tim Kami.</p>
      `;

    return `
      <div class="about-section section-bg py-5">
        <div class="container">
          <div class="row mb-4">
            <div class="col-12 text-center mb-5">
              <h2 class="section-title display-6">Tentang NutriCheck</h2>
            </div>
          </div>
          <div class="row align-items-center">
            <div class="col-lg-6 col-md-12 text-center mb-4 mb-lg-0">
              <img src="${this._aboutImageUrl}" alt="Ilustrasi kecemasan atau depresi" class="img-fluid rounded about-img">
            </div>
            <div class="col-lg-6 col-md-12">
              <div class="about-text px-2 px-sm-0 text-center text-lg-start">
                <p>
                  NutriCheck adalah aplikasi berbasis web yang dirancang untuk membantu Anda menjaga kesehatan dengan cara yang sederhana dan praktis. Melalui fitur cek Indeks Massa Tubuh (IMT), kalkulator kebutuhan kalori harian, dan informasi kesehatan, NutriCheck hadir sebagai pendamping untuk mewujudkan gaya hidup sehat.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

    

      <div class="container py-5">
        <div class="row mb-5">
          <div class="col text-center">
            <h2 class="section-title display-6">Tim Kami</h2>
            <p class="section-subtitle">Orang-orang hebat di balik NutriCheck</p>
          </div>
        </div>


        <div class="row justify-content-center mt-5">
          <div class="col-lg-3 col-md-6 mb-4 d-flex align-items-stretch">
            <div class="card team-card text-center border-0 shadow-sm h-100 w-100">
              <div class="card-body d-flex flex-column">
                <img src="/avatar-danil.jpg" alt="Daniel Christiadi" class="rounded-circle img-fluid mx-auto mb-3 shadow-sm team-img">
                <h5 class="card-title fw-bold mb-1 section-title">Daniel Christiadi</h5>
                <p class="section-subtitle small mb-3">PMG</p>
                <div class="mt-auto">
                  <a href="https://github.com/danchr135" target="_blank" rel="noopener noreferrer" class="text-decoration-none me-2 team-link-github"><i class="fab fa-github"></i></a>
                  <a href="https://www.linkedin.com/in/daniel-christiadi-4a1240330/" class="text-decoration-none me-2 team-link-linkedin"><i class="fab fa-linkedin"></i></a>
                </div>
              </div>
            </div>
          </div>

          <div class="col-lg-3 col-md-6 mb-4 d-flex align-items-stretch">
            <div class="card team-card text-center border-0 shadow-sm h-100 w-100">
              <div class="card-body d-flex flex-column">
                <img src="/avatar-victor.png" alt="Lay Victor Adrian" class="rounded-circle img-fluid mx-auto mb-3 shadow-sm team-img">
                <h5 class="card-title fw-bold mb-1 section-title">Lay Victor Adrian</h5>
                <p class="section-subtitle small mb-3">Promkes</p>
                <div class="mt-auto">
                  <a href="https://github.com/Vicganz04" class="text-decoration-none me-2 team-link-github"><i class="fab fa-github"></i></a>
                  <a href="https://www.linkedin.com/in/lay-victor-adrian-294a66333/" class="text-decoration-none me-2 team-link-linkedin"><i class="fab fa-linkedin"></i></a>
                </div>
              </div>
            </div>
          </div>

          <div class="col-lg-3 col-md-6 mb-4 d-flex align-items-stretch">
            <div class="card team-card text-center border-0 shadow-sm h-100 w-100">
              <div class="card-body d-flex flex-column">
                <img src="/avatar-noven.jpg" alt="Yopen Dhimas Nugroho" class="rounded-circle img-fluid mx-auto mb-3 shadow-sm team-img">
                <h5 class="card-title fw-bold mb-1 section-title">Y Noven Dhimas Nugroho</h5>
                <p class="section-subtitle small mb-3">KIA</p>
                <div class="mt-auto">
                  <a href="https://github.com/venadd" class="text-decoration-none me-2 team-link-github"><i class="fab fa-github"></i></a>
                  <a href="https://www.linkedin.com/in/y-noven-dhimas-nugroho/" class="text-decoration-none me-2 team-link-linkedin"><i class="fab fa-linkedin"></i></a>
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
      containerElement.innerHTML = this._getAboutContentTemplate();
    } else {
      console.error(
        "Container element untuk AboutPage tidak ditemukan oleh View."
      );
    }
  }
}

export default AboutPage;
