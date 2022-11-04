// 고정 데이터들
const lat = 37.414;
const lon = 126.7185;
const appid = "dcf7cc23c526638b692eae5157fdeff0";
const units = "metric";
const lang = "kr";

// 아이콘 Day Ojbect => 날씨 값을 키값으로 아이콘 이미지를 꺼내오기 위함
const iconDayObject = {
  clear: "./img/apiImg/clear-day",
  cloud: "./img/apiImg/cloud-day",
  rainy: "./img/apiImg/rainy-day",
  storm: "./img/apiImg/storm-day",
};

// 아이콘 Night Ojbect => 날씨 값을 키값으로 아이콘 이미지를 꺼내오기 위함
const iconNightObject = {
  clear: "./img/apiImg/clear-night",
  cloud: "./img/apiImg/cloud-night",
  rainy: "./img/apiImg/rainy-night",
  clear: "./img/apiImg/clear-night",
};

// 시간별 날씨 데이터 더미
const hourData = [
  {
    time: "00:00 PM",
    icon: "./img/apiImg/storm-night.svg",
    temp: "17ºC",
    tepmlow: "9ºC",
    isNow: false,
  },
];

// 시간별 날씨 데이터 배열
let hourWeatherData = [];

$(document).ready(function () {
  getWeatherData();

  // 시간별 날씨 데이터 배열 사이즈만큼 html 추가
  const hourWeather = $(".hour-weather");

  if (hourWeatherData.length > 0) {
    hourWeatherData.map((data) => {
      if (data.isNow) {
        hourWeather.append(
          // 현재 시간대 이면
          ` <div class="hour-weather__item active">
                <div class="hour-weather__time">
                <h5 style="font-weight: bolder;" >${data.time}</h5>
                <span class="hour-weather__now" style="font-weight: bolder;">[Now]</span>
                </div>
                <div class="hour-weather__weather">
                <img src="${data.icon}_active.svg" alt="img" />
                </div>
                
                <div class="hour-weather__temp">
                <span style="font-weight: bolder;">${data.tempMax}º</span>
                <span style="font-weight: bolder;">${data.tepmLow}º</span>
                </div>
            </div>`
        );
        $("#id_img").attr("src", `${data.icon}_active.svg`);
      } else {
        hourWeather.append(
          // 현재 시간대가 아니면
          ` <div class="hour-weather__item">
                <div class="hour-weather__time">
                <h5>${data.time}</h5>
                <span class="hour-weather__now"></span>
                </div>
                <div class="hour-weather__weather">
                <img src="${data.icon}.svg" alt="img" />
                </div>
                
                <div class="hour-weather__temp">
                <span>${data.tempMax}º</span>
                <span>${data.tepmLow}º</span>
                </div>
              </div>`
        );
      }
    });
  }
});

/**
 * 날씨 데이터 api 조회 후 날씨 데이터 배열에 push
 */
const getWeatherData = () => {
  $.ajax({
    type: "GET",
    url: `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${appid}&units=${units}&lang=${lang}`,
    async: false,
  })
    .done(function (response) {
      response.list.forEach((element) => {
        // 오늘 날짜와 같은 데이터들만 추려냄 (ex: 오늘 날짜가 2022-11-03 이면 2022-11-03의 3시간 간격 데이터들만 배열에 담기 위함)
        if (dateCompare(element.dt_txt)) {
          // 날씨 데이터 배열에 push
          hourWeatherData.push({
            time: dateHandler(element.dt_txt),
            icon: getIconSvg(element.dt_txt, element.weather[0].main),
            tempMax: Math.round(element.main.temp_max),
            tepmLow: Math.round(element.main.temp_min),
            isNow: isNowCheck(element.dt_txt),
          });
        }
      });
    })
    .fail(function (error) {
      alert(JSON.stringify(error));
    });
};

/**
 * IconSvg 들고오기 위한 데이터 핸들링 함수
 * @param {*} weather 날씨 정보
 * @returns 아이콘 경로
 */
const getIconSvg = (dt_txt, weather) => {
  let isDay = getIsDay(dt_txt);

  switch (weather.toLowerCase()) {
    case "clear":
      return isDay ? iconDayObject.clear : iconNightObject.clear;
    case "clouds":
      return isDay ? iconDayObject.cloud : iconNightObject.cloud;
    case "rainy":
      return isDay ? iconDayObject.rainy : iconNightObject.rainy;
    case "storm":
      return isDay ? iconDayObject.storm : iconNightObject.storm;
    default:
      return isDay ? iconDayObject.clear : iconNightObject.clear;
  }
};

/**
 * 날짜형식 핸들링 함수
 * @param {*} dateTxt date_txt (ex : 2022-11-03 15:00:00)
 * @returns 03:00 PM
 */
const dateHandler = (dateTxt) => {
  let date = dateTxt.substr(11, 5);
  // 12:00 에서 앞에 시간대만 추출하여서 숫자형으로 바꿔줌 (오후 시간대에는 -12를 하여 PM 형식으로 출력해주기 위함)
  let dateInt = Number(date.substr(0, 2));
  if (dateInt > 13) {
    return `0${dateInt - 12}:00 PM`;
  } else if (dateInt === 12) {
    return `${dateInt}:00 PM`;
  }
  return `${date} AM`;
};

/**
 * 낮/밤 판별 함수
 * @param {*} dateTxt
 */
const getIsDay = (dateTxt) => {
  let date = dateTxt.substr(11, 5);
  let dateInt = Number(date.substr(0, 2));
  if (dateInt > 17) {
    return false;
  }
  return true;
};

/**
 * 날짜 비교 함수
 * 오늘 날짜와 같으면 true 반환
 * @param {*} dateTxt date_txt (ex : 2022-11-03 15:00:00)
 *
 */
const dateCompare = (dateTxt) => {
  const date = dateTxt.substr(0, 10);
  const today = getTodayDate();
  return date === today ? true : false;
};

// 현재 시간이 데이터 시간대에 포함되는지 확인
const isNowCheck = (dateTxt) => {
  let date = dateTxt.substr(11, 5);
  // 12:00 에서 앞에 시간대만 추출하여서 숫자형으로 바꿔줌 (오후 시간대에는 -12를 하여 PM 형식으로 출력해주기 위함)
  let dateInt = Number(date.substr(0, 2));
  let nowTime = Number(getNowTime());

  if (dateInt <= nowTime && nowTime < dateInt + 3) {
    return true;
  }

  return false;
};

/**
 * 오늘 날짜 구하는 함수
 * @returns todayDate : String
 */
const getTodayDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = ("0" + (today.getMonth() + 1)).slice(-2);
  const day = ("0" + today.getDate()).slice(-2);
  return year + "-" + month + "-" + day;
};

/**
 * 현재 시간 구하는 함수
 */
const getNowTime = () => {
  const today = new Date();
  return ("0" + today.getHours()).slice(-2);
};
