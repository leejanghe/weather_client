// const lat_1 = 37.414;
// const lon_1 = 126.7185;
// const appid_1 = "dcf7cc23c526638b692eae5157fdeff0";
// const units_1 = "metric";
// const lang_1 = "kr";

const dayArray = [
  "일요일",
  "월요일",
  "화요일",
  "수요일",
  "목욕일",
  "금요일",
  "토요일",
];

// 주간별 날씨 데이터 더미
const weekData = [];

// 주간날씨 데이터 뿌리기
// 이거 보고 데이터 넣으시면 됩니다!
// 편하게 id값이나 기존에 있는 class값으로 진행하시면 됩니다!
$(document).ready(function () {
  getWeatherWeekData();

  const weekWeather = $(".week-weather");
  const isToday = true;
  weekData
    .sort((a, b) => {
      // 정해준 요일 객체 인덱스를 활용하여 오름차순 정렬함 (월~일) 순으로 데이터를 뿌려주기 위한 핸들링
      return a.idx - b.idx;
    })
    .map((week) =>
      week.isToday
        ? weekWeather.append(
            `
          <div class="week-weather__item active">
              <div class="week-weather__day">
              <h5>${week.day}</h5>
              </div>
              <div class="week-weather__weather">
              <img src="${week.icon}_active.svg" alt="" />
              </div>
              <div class="week-line"></div>
              <div class="week-weather__temp">
              <span><img id="up" src="./img/triangle-up-white.svg" />${week.tempMax}</span>
              <span><img id="down" src="./img/triangle-down-white.svg" />${week.tempLow}</span>
              </div>
          </div>
          `
          )
        : weekWeather.append(
            `
          <div class="week-weather__item">
              <div class="week-weather__day">
              <h5>${week.day}</h5>
              </div>
              <div class="week-weather__weather">
              <img src="${week.icon}.svg" alt="" />
              </div>
              <div class="week-line"></div>
              <div class="week-weather__temp">
              <span><img id="up" src="/img/triangle-up.svg" />${week.tempMax}</span>
              <span><img id="down" src="/img/triangle-down.svg" />${week.tempLow}</span>
              </div>
          </div>
          `
          )
    );

  // 오늘 기상 정보 데이터 바인딩 함수 호출
  setTodayInformation();

  // css class제어
  // 주간 날씨 선택
  // 클릭 했을 때 클릭한 요소들의 색상을 변경하고 싶으면 아래 코드쪽 주석을 푸시면 됩니다.
  // $(this).find("#up").attr("src", "/img/triangle-up-white.svg");
  // $(this).find("#down").attr("src", "/img/triangle-down-white.svg");
  // $(".week-weather__item").click(function () {
  //   $(".week-weather__item").each(function () {
  //     $(this).find("#up").attr("src", "/img/triangle-up.svg");
  //     $(this).find("#down").attr("src", "/img/triangle-down.svg");
  //   });
  //   $(this).find("#up").attr("src", "/img/triangle-up-white.svg");
  //   $(this).find("#down").attr("src", "/img/triangle-down-white.svg");
  //   $(".week-weather__item").removeClass("active");
  //   $(this).addClass("active");
  // });
});

/**
 * 오늘의 기상 관련 데이터 바인딩
 * API 에서 실시간성 기상 관련 데이터를 뿌려주지 않아서
 * 시간대를 기준으로 새벽, 아침, 낮, 밤으로 나누어서 데이터를 바인딩 해줬습니다.
 */
const setTodayInformation = () => {
  const currentTimeZone = getNowTime();
  console.log(currentTimeZone);
  weekData.map((element) => {
    if (element.isToday) {
      if (0 <= currentTimeZone && currentTimeZone < 5) {
        // console.log("새벽");
        $("#now_feel_temp").text(element.feelsLikeObj.eve);
        $("#now_temp").text(`${element.tempObj.eve}º`);
        $("#now_humidity").text(`${element.humidity}%`);
        $("#day_pressure").text(`${element.pressure}hPa`);
        $("#today_rain").text(`강수량${element.rainPop}%`);
      } else if (5 <= currentTimeZone && currentTimeZone < 9) {
        // console.log("아침");
        $("#now_feel_temp").text(element.feelsLikeObj.morn);
        $("#now_temp").text(`${element.tempObj.eve}º`);
        $("#now_humidity").text(`${element.humidity}%`);
        $("#day_pressure").text(`${element.pressure}hPa`);
        $("#today_rain").text(`강수량${element.rainPop}%`);
      } else if (9 <= currentTimeZone && currentTimeZone < 17) {
        // console.log("낮");
        $("#now_feel_temp").text(element.feelsLikeObj.day);
        $("#now_temp").text(`${element.tempObj.eve}º`);
        $("#now_humidity").text(`${element.humidity}%`);
        $("#day_pressure").text(`${element.pressure}hPa`);
        $("#today_rain").text(`강수량${element.rainPop}%`);
      } else {
        // console.log("밤");
        $("#now_feel_temp").text(element.feelsLikeObj.night);
        $("#now_temp").text(`${element.tempObj.eve}º`);
        $("#now_humidity").text(`${element.humidity}%`);
        $("#day_pressure").text(`${element.pressure}hPa`);
        $("#today_rain").text(`강수량${element.rainPop}%`);
      }
    }
  });
};

/**
 * 오늘 일자를 기준으로 한 일주일 데이터 들고오기 ( 과거 이력은 현재 API가 제공해주지 않기때문에 오늘 기준 일자보다 이전 데이터는 새로운 데이터로 바인딩 되어집니다. )
 */
const getWeatherWeekData = () => {
  $.ajax({
    type: "GET",
    url: `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&appid=${appid}&units=${units}&lang=${lang}`,
    async: false,
  })
    .done(function (response) {
      //       time: "00:00 PM",
      // icon: "./img/apiImg/storm-night.svg",
      // temp: "17ºC",
      // tepmlow: "9ºC",
      // isNow: false,

      /**
       * 주간 날씨 데이터 핸들링 후 객체 생성 -> 주간 데이터 객체 배열 추가
       */
      response.list.forEach((element, index) => {
        weekData.push({
          idx: getDayLabelIndex(element.dt),
          day: getDayLabel(element.dt),
          weather: element.weather[0].main,
          icon: getWeekIconSvg(element.weather[0].main),
          tempMax: element.temp.max,
          tempLow: element.temp.min,
          feelsLikeObj: element.feels_like,
          tempObj: element.temp,
          humidity: element.humidity,
          pressure: element.pressure,
          rainPop: element.pop * 100,
          isToday: isTodayCheck(element.dt),
        });
      });

      console.log(weekData);
    })
    .fail(function (error) {
      alert(JSON.stringify(error));
    });
};

// 주간 날씨 마우스 스크롤
$(function () {
  $(".week-weather").mousewheel(function (e, delta) {
    this.scrollLeft -= delta * 30;
    e.preventDefault();
  });
});

/**
 *
 * @param {*} dt ex : 1667530800 <<< 초로 주기때문에 날짜 형식으로 바꾸려면 1000을 곱해주세요 (s -> m/s)
 * @returns
 */
const dateToString = (dt) => {
  const date = new Date(dt);
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);
  return year + "-" + month + "-" + day;
};

const getWeekIconSvg = (weather) => {
  switch (weather.toLowerCase()) {
    case "clear":
      return iconDayObject.clear;
    case "clouds":
      return iconDayObject.cloud;
    case "rainy":
      return iconDayObject.rainy;
    case "storm":
      return iconDayObject.storm;
    default:
      return iconDayObject.clear;
  }
};

/**
 * 현재 요일에 맞는 데이터를 찾기 위한 함수
 * @param {*} dt ex : 1667530800 <<< 초로 주기때문에 날짜 형식으로 바꾸려면 1000을 곱해주세요 (s -> m/s)
 * @returns
 */
const isTodayCheck = (dt) => {
  const dateMS = dt * 1000;
  const dayLabel = new Date(dateMS).getDay();
  const toDayLabel = new Date().getDay();

  return dayLabel === toDayLabel ? true : false;
};

/**
 * getDayLabel DayLabel을 기준으로 요일값 리턴
 * @param {*} dt ex : 1667530800 <<< 초로 주기때문에 날짜 형식으로 바꾸려면 1000을 곱해주세요 (s -> m/s)
 * @returns
 */
const getDayLabel = (dt) => {
  const dateMS = dt * 1000;
  const dayLabel = new Date(dateMS).getDay();
  console.log(dayLabel);
  return dayArray[dayLabel];
};

/**
 * DayLable 값으로 인덱스를 추리기 위함 ( 요일 정렬시 사용하려고 만든 데이터 )
 * 단, UI 상에서 월~일 순으로 디자인 되어져 있기 때문에
 * 일요일을 뒤로 보내기 위해 0->7로 리턴
 * @param {*} dt ex : 1667530800 <<< 초로 주기때문에 날짜 형식으로 바꾸려면 1000을 곱해주세요 (s -> m/s)
 * @returns DayLableIdx
 */
const getDayLabelIndex = (dt) => {
  const dateMS = dt * 1000;
  const dayLabel = new Date(dateMS).getDay();
  // getDay()는 일요일이 0번째 인덱스로 시작하기 때문에 월~일 정렬을 위해서 조건을 추가해줌
  return dayLabel === 0 ? 7 : dayLabel;
};
