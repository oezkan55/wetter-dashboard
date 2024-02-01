class LocationView {
  #btn = document.querySelector(".btn--location");
  #input = document.querySelector(".search__input");

  addHandlerLocationWeathear(p_handler) {
    this.#btn.addEventListener("click", e => {
      e.preventDefault();

      navigator.geolocation?.getCurrentPosition(
        this.#positionSuccessful.bind(p_handler),
        this.#positionFailed
      );
    });
  }

  #positionSuccessful(p_position) {
    const handler = this;

    const { latitude, longitude } = p_position.coords;
    handler({ latitude, longitude });
  }

  #positionFailed() {
    alert("Position konnte nicht ermitelt werden");
  }
}

export default new LocationView();
