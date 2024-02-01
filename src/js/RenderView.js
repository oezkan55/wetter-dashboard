import { getWeatherIcon } from "./helpers";

class RenderView {
  #currentWeather = document.querySelector(".current-weather");
  #weekOverview = document.querySelector(".week-overview");
  #loader = document.querySelector(".loader");
  #contentLocation = document.querySelector(".current-weather__location");
  #contentDate = document.querySelector(".date");

  //? Datum Zwischenspeichern, damit nochmal renderbar
  #currentDate;

  renderCurrentWeather(p_weather) {
    const html = this.#getCurrentWeatherMarkup(p_weather);
    this.#currentWeather.innerHTML = html;
    this.#contentLocation.textContent = `${p_weather.city}, ${p_weather.country}`;
  }

  renderWeekWeather(p_weekWeather) {
    this.#weekOverview.textContent = "";

    p_weekWeather.forEach(p_weather => {
      const html = this.#getWeekWeatherMarkup(p_weather);

      this.#weekOverview.insertAdjacentHTML("beforeend", html);
    });
  }

  #getCurrentWeatherMarkup(p_weather) {
    return `
      <p class="current-weather__location">${p_weather.city}, ${
      p_weather.country
    }</p>
      <p class="date">${this.#currentDate}</p>
      <p class="current-weather__temperature">${
        p_weather.temp
      }<span>&deg;C</span></p>
      <div class="current-weather__group">
        <div class="current-weather__icon-box">
          <img
            src="${getWeatherIcon(p_weather.state)}"
            alt="Wettersymbol"
            class="current-weather__icon"
          />
        </div>
        <p class="current-weather__state">${p_weather.description}</p>
      </div>
      <p class="current-weather__max">
        <small>Höchst</small> <span>${p_weather.max}&deg;C</span>
      </p>
      <p class="current-weather__min">
        <small>Niedrig</small> <span>${p_weather.min}&deg;C</span>
      </p>
    `;
  }

  #getWeekWeatherMarkup(p_weather) {
    return `
      <div class="weather">
        <p class="weather__day">${p_weather.weekDay}</p>
        <div class="weather__icon-box">
          <img
            class="weather__icon"
            src="${getWeatherIcon(p_weather.state)}"
            alt="Wettersymbol"
          />
        </div>
        <span class="weather__range">${p_weather.max}°C</span>
        <span class="weather__range">${p_weather.min}°C</span>
      </div>
    `;
  }

  toggleShowLoader() {
    this.#loader.classList.toggle("loader--active");
  }

  renderDate(p_dateLabel) {
    let [day, monthJear] = p_dateLabel.split(",");
    monthJear = monthJear.split(".").join("");
    const formatted = day + monthJear;

    this.#currentDate = formatted;
    this.#contentDate.textContent = formatted;
  }
}

export default new RenderView();
