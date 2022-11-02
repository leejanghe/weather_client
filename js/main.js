// btn select js
const selectBtn = document.querySelectorAll(".btn");

selectBtn.forEach((select) => {
  select.addEventListener("click", () => {
    removeSelectClasses();
    select.classList.add("select");
  });
});

function removeSelectClasses() {
  selectBtn.forEach((select) => {
    select.classList.remove("select");
  });
}

// page show & hide
const weekBtnFuc = () => {
  const WeekBtn = document.querySelector(".week");
  // show WeekBtn
  WeekBtn.style.display = "block";
  // hide hourBtn
  const hourBtn = document.querySelector(".hour");
  hourBtn.style.display = "none";
};

const hourBtnFuc = () => {
  const hourBtn = document.querySelector(".hour");
  // show hourBtn
  hourBtn.style.display = "block";
  // hide WeekBtn
  const WeekBtn = document.querySelector(".week");
  WeekBtn.style.display = "none";
};

// 주간날씨 데이터 더미
const weekData = [
  {
    day: "월요일",
    weather: "맑음",
    temp: "17ºC",
    tepmlow: "9ºC",
    icon: "./img/cloud-day_blue.svg",
  },
  {
    day: "화요일",
    weather: "맑음",
    temp: "17ºC",
    tepmlow: "9ºC",
    icon: "./img/cloud-day_blue.svg",
  },
  {
    day: "수요일",
    weather: "맑음",
    temp: "17ºC",
    tepmlow: "9ºC",
    icon: "./img/cloud-day_blue.svg",
  },
  {
    day: "목요일",
    weather: "맑음",
    temp: "17ºC",
    tepmlow: "9ºC",
    icon: "./img/cloud-day_blue.svg",
  },
  {
    day: "금요일",
    weather: "맑음",
    temp: "17ºC",
    tepmlow: "9ºC",
    icon: "./img/cloud-day_blue.svg",
  },
  {
    day: "토요일",
    weather: "맑음",
    temp: "17ºC",
    tepmlow: "9ºC",
    icon: "./img/cloud-day_blue.svg",
  },
  {
    day: "일요일",
    weather: "맑음",
    temp: "17ºC",
    tepmlow: "9ºC",
    icon: "./img/cloud-day_blue.svg",
  },
];

// 주간날씨 데이터 뿌리기
const weekWeather = () => {
  const weekWeather = document.querySelector(".week-weather");
  weekWeather.innerHTML = weekData
    .map(
      (week) => `
        <div class="week-weather__item">
            <div class="week-weather__day">
            <h5>${week.day}</h5>
            </div>
            <div class="week-weather__weather">
            <img src="${week.icon}" alt="" />
            </div>
            <div class="week-line"></div>
            <div class="week-weather__temp">
            <span>${week.temp}</span>
            <span>${week.tepmlow}</span>
            </div>
        </div>
        `
    )
    .join("");
};
weekWeather();

// selectWeather
const selectWeather = document.querySelectorAll(".week-weather__item");

selectWeather.forEach((weather) => {
  weather.addEventListener("click", () => {
    removeActiveClasses();
    weather.classList.add("active");
  });
});

function removeActiveClasses() {
  selectWeather.forEach((weather) => {
    weather.classList.remove("active");
  });
}
