export default class HomePage {
  #presenter;

  async afterRender() {
    this.#presenter = new HomePresenter({ view: this });
    setTimeout(restartHeroAnimations, 50);
  }
}


// Fungsi global, letakkan di luar class!
function restartHeroAnimations() {
  // ...existing code...
}