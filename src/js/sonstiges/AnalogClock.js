class AnalogClock {
  #handHour = document.querySelector(".clock__hour");
  #handMinute = document.querySelector(".clock__minute");
  #handSecond = document.querySelector(".clock__second");

  constructor() {
    this.setClock();
  }

  setClock() {
    const { hours, minutes, seconds } = this.#getTime();

    const calcHr = hours * 30 + minutes / 2;
    const calcMin = minutes * 6 + seconds / 10;
    const calcSec = seconds * 6;

    this.#handHour.style.transform = `rotate(${calcHr}deg)`;
    this.#handMinute.style.transform = `rotate(${calcMin}deg)`;
    this.#handSecond.style.transform = `rotate(${calcSec}deg)`;
  }

  #getTime() {
    const dateNow = new Date();

    return {
      hours: dateNow.getHours(),
      minutes: dateNow.getMinutes(),
      seconds: dateNow.getSeconds(),
    };
  }
}

const clock = new AnalogClock();
setInterval(clock.setClock.bind(clock), 1000);
