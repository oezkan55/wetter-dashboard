import { formatWeather, getUrlAPI } from "./helpers";
import LocationView from "./views/LocationView";
import RenderView from "./RenderView";
import SearchView from "./views/SearchView";
import { LANGUAGE_REGION } from "./config";
import "./sonstiges/AnalogClock";

const controlWeather = async function (p_location) {
  try {
    RenderView.toggleShowLoader();
    const url = getUrlAPI(p_location);
    const resp = await fetch(url);

    if (!resp.ok)
      throw new Error(
        `${resp.status} ${resp.statusText} ⚠️⚠️ Suche ergab keinen Treffer`
      );

    const weatherData = await resp.json();
    const [currentWeather, ...weekWeather] = formatWeather(weatherData);

    RenderView.toggleShowLoader();
    RenderView.renderCurrentWeather(currentWeather);
    RenderView.renderWeekWeather(weekWeather);
  } catch (p_error) {
    RenderView.toggleShowLoader();
    alert(p_error.message);
  }
};

const controlDateNow = function () {
  const options = {
    weekday: "short",
    day: "2-digit",
    month: "long",
    year: "numeric",
  };

  const date = new Intl.DateTimeFormat(LANGUAGE_REGION, options).format();
  RenderView.renderDate(date);
};

const init = function () {
  SearchView.addHandlerCityWeather(controlWeather);
  LocationView.addHandlerLocationWeathear(controlWeather);
  controlDateNow();
};
init();
