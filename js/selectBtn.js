// week & hour btn select
$(document).ready(function () {
  $(".btn").click(function () {
    $(".btn").removeClass("select");
    $(this).addClass("select");
  });
});

// week & hour page show & hide
$(document).ready(function () {
  $("#week_btn").click(function () {
    $(".week").show();
    $(".hour").hide();
  });
});

$(document).ready(function () {
  $("#hour_btn").click(function () {
    $(".hour").show();
    $(".week").hide();
  });
});
