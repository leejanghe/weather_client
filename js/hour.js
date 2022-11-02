// 시간별 날씨 데이터 더미
const hourData = [
  {
    time: "00:00 PM",
    icon: "./img/cloud-day_blue.svg",
    temp: "17ºC",
    tepmlow: "9ºC",
    select: "[Now]",
  },
  {
    time: "01:00 PM",
    icon: "./img/cloud-day_blue.svg",
    temp: "17ºC",
    tepmlow: "9ºC",
    select: "[Now]",
  },
  {
    time: "02:00 PM",
    icon: "./img/cloud-day_blue.svg",
    temp: "17ºC",
    tepmlow: "9ºC",
    select: "[Now]",
  },
  {
    time: "03:00 PM",
    icon: "./img/cloud-day_white.svg",
    temp: "17ºC",
    tepmlow: "9ºC",
    select: "[Now]",
  },
  {
    time: "04:00 PM",
    icon: "./img/cloud-day_blue.svg",
    temp: "17ºC",
    tepmlow: "9ºC",
    select: "[Now]",
  },
  {
    time: "05:00 PM",
    icon: "./img/cloud-day_white.svg",
    temp: "17ºC",
    tepmlow: "9ºC",
    select: "[Now]",
  },
  {
    time: "06:00 PM",
    icon: "./img/cloud-day_blue.svg",
    temp: "17ºC",
    tepmlow: "9ºC",
    select: "[Now]",
  },
  {
    time: "07:00 PM",
    icon: "./img/cloud-day_blue.svg",
    temp: "17ºC",
    tepmlow: "9ºC",
    select: "[Now]",
  },
  {
    time: "08:00 PM",
    icon: "./img/cloud-day_blue.svg",
    temp: "17ºC",
    tepmlow: "9ºC",
    select: "[Now]",
  },
  {
    time: "09:00 PM",
    icon: "./img/cloud-day_blue.svg",
    temp: "17ºC",
    tepmlow: "9ºC",
    select: "[Now]",
  },
  {
    time: "10:00 PM",
    icon: "./img/cloud-day_blue.svg",
    temp: "17ºC",
    tepmlow: "9ºC",
  },
  {
    time: "11:00 PM",
    icon: "./img/cloud-day_blue.svg",
    temp: "17ºC",
    tepmlow: "9ºC",
  },
  {
    time: "11:00 PM",
    icon: "./img/cloud-day_blue.svg",
    temp: "17ºC",
    tepmlow: "9ºC",
  },
  {
    time: "11:00 PM",
    icon: "./img/cloud-day_blue.svg",
    temp: "17ºC",
    tepmlow: "9ºC",
  },
  {
    time: "11:00 PM",
    icon: "./img/cloud-day_blue.svg",
    temp: "17ºC",
    tepmlow: "9ºC",
  },
];

// 시간별 날씨 데이터 뿌리기
const hourWeather = () => {
  const hourWeather = document.querySelector(".hour-weather");
  hourWeather.innerHTML = hourData
    .map(
      (hour) => `
          <div class="hour-weather__item">
              <div class="hour-weather__time">
              <h5>${hour.time}</h5>
              <span class="hour-weather__now"></span>
              </div>
              <div class="hour-weather__weather">
              <img src="${hour.icon}" alt="img" />
              </div>
              <div class="hour-line"></div>
              <div class="hour-weather__temp">
              <span>${hour.temp}</span>
              <span>${hour.tepmlow}</span>
              </div>
          </div>
          `
    )
    .join("");
};
hourWeather();

// 시간별 날씨 선택
const hourSelect = document.querySelectorAll(".hour-weather__item");
const nowHour = document.querySelector(".hour-weather__now");
hourSelect.forEach((hour, i) => {
  hour.addEventListener("click", () => {
    removeHourSelectActiveClasses();
    hour.classList.add("active");
  });
});

function removeHourSelectActiveClasses() {
  hourSelect.forEach((hour) => {
    hour.classList.remove("active");
  });
}
