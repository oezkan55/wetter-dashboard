import iconClear from "../img/icons/weather/clear.svg";
import iconClouds from "../img/icons/weather/clouds.svg";
import iconRain from "../img/icons/weather/rain.svg";
import iconSnow from "../img/icons/weather/snow.svg";
import iconFog from "../img/icons/weather/fog.svg";
import { API, WEEKDAYS } from "./config";

const icons = [iconClear, iconClouds, iconRain, iconSnow, iconFog];

export const formatWeather = function (p_weatherData) {
  const weekDays = sortWeekDays(WEEKDAYS);

  const formatted = p_weatherData.list.map((p_weath, p_i) => {
    return {
      city: p_weatherData.city.name,
      country: p_weatherData.city.country,
      temp: Math.round(p_weath.main.temp),
      max: Math.round(p_weath.main.temp_max),
      min: Math.round(p_weath.main.temp_min),
      state: p_weath.weather[0].main.toLowerCase(),
      description: p_weath.weather[0].description,
      weekDay: weekDays[p_i],
    };
  });

  return formatted;
};

export const getWeatherIcon = function (p_WeatherState) {
  return icons.find(p_icon => p_icon.includes(p_WeatherState));
};

export const getUrlAPI = function (p_parameterAPI) {
  const url =
    typeof p_parameterAPI === "string"
      ? `q=${p_parameterAPI}`
      : `lat=${p_parameterAPI.latitude}&lon=${p_parameterAPI.longitude}`;

  return `${API.base}forecast?${url}&cnt=7&units=metric&appid=${API.key}&lang=de`;
};

const sortWeekDays = function (p_weekDays) {
  const day = new Date().getDay();

  const partOne = p_weekDays.slice(day);
  const partTwo = p_weekDays.slice(0, day);

  return [...partOne, ...partTwo];
};
