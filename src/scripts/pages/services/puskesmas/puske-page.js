import PuskePresenter from "./puske-presenter";

class PuskePage {
  constructor() {
    this._presenter = null;
  }

  async render() {
    return `
      <section id="puske-content-area" class="container py-5 section-bg"></section>
    `;
  }

  async afterRender() {
    const contentArea = document.querySelector("#puske-content-area");
    if (!contentArea) {
      console.error("Elemen #puske-content-area tidak ditemukan!");
      return;
    }

    this._presenter = new PuskePresenter({
      view: this,
      container: contentArea,
    });

    await this._presenter.showPuskesmasData();

    // Ambil data puskesmas dari presenter
    const dataPuskesmas = this._presenter._container.__dataPuskesmas || [];
    // Ambil semua kecamatan unik
    const kecamatanSet = new Set(dataPuskesmas.map(p => p.kecamatan));
    const kecamatanList = Array.from(kecamatanSet).sort();


    // Filter function
    function filterPuskesmas() {
      const keyword = (document.getElementById("search-puskesmas")?.value || "").toLowerCase();
      const kecamatan = document.getElementById("filter-kecamatan")?.value || "";
      document.querySelectorAll(".puskesmas-item").forEach(item => {
        const text = item.textContent.toLowerCase();
        // Ambil nama kecamatan saja
        const kecamatanText = item.querySelector(".kecamatan-text")?.textContent.replace("Kecamatan: ", "").trim() || "";
        const matchKeyword = text.includes(keyword);
        const matchKecamatan = !kecamatan || kecamatanText === kecamatan;
        item.style.display = (matchKeyword && matchKecamatan) ? "" : "none";
      });
    }

    setTimeout(() => {
      document.getElementById("search-puskesmas")?.addEventListener("input", filterPuskesmas);
      document.getElementById("filter-kecamatan")?.addEventListener("change", filterPuskesmas);
    }, 100);
  }

  _getPuskesmasTemplate(data) {
    const kecamatanSet = new Set(data.map(p => p.kecamatan));
    const kecamatanList = Array.from(kecamatanSet).sort();

    if (this._container) this._container.__dataPuskesmas = data;
    return `
      <h2 class="section-title mb-4">Daftar Puskesmas di Semarang</h2>
      <div class="mb-4 d-flex align-items-center" style="display: flex; gap: 8px;">
        <input type="text" id="search-puskesmas" class="form-control" placeholder="Cari nama, alamat, atau kecamatan..." style="flex: 9 1 0%;">
        <select id="filter-kecamatan" class="form-select" style="flex: 1 1 0%; max-width: 160px;">
          <option value="">Semua Kecamatan</option>
          ${kecamatanList.map(kec => `<option value="${kec}">${kec}</option>`).join("")}
        </select>
      </div>
      <div class="row" id="puskesmas-list">
        ${data.map(puskesmas => `
          <div class="col-12 mb-3 puskesmas-item">
            <div class="card puskesmas-card shadow-sm">
              <div class="card-body">
                <h5 class="card-title">${puskesmas.nama}</h5>
                <p class="mb-1"><strong>Alamat:</strong> ${puskesmas.alamat}</p>
                <p class="mb-1 kecamatan-text"><strong>Kecamatan:</strong> ${puskesmas.kecamatan}</p>
                <p class="mb-1"><strong>Telepon:</strong> ${puskesmas.telepon}</p>
                <div style="display: flex; gap: 8px;">
                  <a 
                    href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(puskesmas.nama)}" 
                    target="_blank" 
                    class="btn btn-outline-success btn-sm mt-2"
                    title="Lihat lokasi di Google Maps"
                  >
                    <i class="fas fa-map-marker-alt"></i> Lokasi
                  </a>
                  ${puskesmas.instagram ? `
                    <a 
                      href="https://instagram.com/${puskesmas.instagram}" 
                      target="_blank" 
                      class="btn btn-outline-danger btn-sm mt-2"
                      title="Lihat Instagram Puskesmas"
                    >
                      <i class="fab fa-instagram"></i> Instagram
                    </a>
                  ` : ""}
                </div>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  displayContent(containerElement, data) {
    if (containerElement) {
      containerElement.innerHTML = this._getPuskesmasTemplate(data);
    } else {
      console.error("Container element untuk PuskePage tidak ditemukan.");
    }
  }
}

export default PuskePage;