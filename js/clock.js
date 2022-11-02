// 현시간 , 날짜 출력
const dataPrint = document.querySelector(".week_dataPrint");
const timePrint = document.querySelector(".main_time");

function currentTime() {
  const data = new Date();
  const years = data.getFullYear();
  const months = data.getMonth() + 1;
  const days = data.getDate();

  const hours = String(data.getHours()).padStart(2, "0");
  const minutes = String(data.getMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "오후" : "오전";

  dataPrint.innerText = `${years}년 ${months}월 ${days}일 | ${ampm} ${hours}:${minutes}`;
  timePrint.innerText = `${hours}:${minutes}`;
}
currentTime();
setInterval(currentTime, 1000);
