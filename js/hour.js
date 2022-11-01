const hourSelect = document.querySelectorAll(".hour-weather__item");

hourSelect.forEach((hour) => {
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
