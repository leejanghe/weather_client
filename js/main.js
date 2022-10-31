console.log("test");

// const btn1 = document.querySelector("btn1");
// const btn2 = document.querySelector("btn2");

const btn1 = () => {
  console.log("btn1 clicked");
  const box1 = document.querySelector(".week");
  // show box1
  box1.style.display = "block";
  // hide box2
  const box2 = document.querySelector(".hour");
  box2.style.display = "none";
};

const btn2 = () => {
  console.log("btn2 clicked");
  const box2 = document.querySelector(".hour");
  // show box2
  box2.style.display = "block";
  // hide box1
  const box1 = document.querySelector(".week");
  box1.style.display = "none";
};
