class SearchView {
  #form = document.querySelector(".search");
  #input = document.querySelector(".search__input");

  addHandlerCityWeather(p_handler) {
    this.#form.addEventListener("submit", e => {
      e.preventDefault();

      const cityDescription = this.#input.value.trim().toLowerCase();
      this.#form.reset();

      if (!cityDescription) return;

      p_handler(cityDescription);
    });
  }
}

export default new SearchView();
