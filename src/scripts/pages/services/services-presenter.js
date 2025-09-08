class ServicesPresenter {
  constructor({ view, container }) {
    this._view = view;
    this._container = container;

    if (!this._view || typeof this._view.displayContent !== "function") {
      throw new Error(
        "Presenter membutuhkan View dengan metode displayContent!"
      );
    }
    if (!this._container) {
      throw new Error("Presenter membutuhkan elemen container!");
    }
  }

  async showServicesPageContent() {
    try {
      this._view.displayContent(this._container);
    } catch (error) {
      console.error("Gagal menampilkan konten halaman Services:", error);
      this._container.innerHTML =
        '<p class="text-danger text-center">Terjadi kesalahan saat memuat konten layanan.</p>';
    }
  }
}

export default ServicesPresenter;
