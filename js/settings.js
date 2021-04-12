"user strict";

//получаєм переключатель теми
const switchThemeElem = document.querySelector(".switch");

//установлення теми після загрузкі сторінкі
function setLocalTheme() {
  if (JSON.parse(localStorage.getItem("theme"))) {
    //для боді добавляю класс, щоб можна було управляти в стилях і js якщо треба буде
    document.body.classList.add("theme-toggle");
  }
}
setLocalTheme(localStorage.getItem("theme"));

function handlerThemeInstall(theme) {
  if (!theme) {
    switchThemeElem.classList.add("_dark");
  }
}
handlerThemeInstall(localStorage.getItem("theme"));

switchThemeElem.addEventListener("change", () => {
  if (document.body.classList.contains("theme-toggle")) {
    document.body.classList.remove("theme-toggle");
    changeImgPreloaderTheme(false);
    console.log(true);
    localStorage.removeItem("theme");
    switchThemeElem.classList.remove("_dark");
  } else {
    document.body.classList.add("theme-toggle");
    localStorage.setItem("theme", true);
    changeImgPreloaderTheme(true);
  }
});

function formatingNumber(number) {
  return Number(number).toLocaleString({ style: "percent" });
}

// localStorage setting
$(function () {
  function storage() {
    if (!localStorage.getItem("settingTime")) {
      localStorage.setItem("settingTime", false);
    }
    if (!localStorage.getItem("settingCache")) {
      localStorage.setItem("settingCache", true);
    }
  }
  storage();

  function setting() {
    if (localStorage.getItem("settingTime") == "true") {
      $("#checkTime").css("display", "block");
    } else {
      $("#checkTime").css("display", "none");
    }

    if (localStorage.getItem("settingCache") == "true") {
      $("#checkCache").css("display", "block");
      if (!sessionStorage.getItem("posts")) {
        let posts = new Array();
        sessionStorage.setItem("posts", JSON.stringify(posts));
      }
    } else {
      $("#checkCache").css("display", "none");
    }
  }
  setting();

  $("#time").click(function () {
    if (localStorage.getItem("settingTime") == "true") {
      localStorage.setItem("settingTime", false);
      $("#checkTime").css("display", "none");
    } else {
      localStorage.setItem("settingTime", true);
      $("#checkTime").css("display", "block");
    }
  });

  $("#cacheUse").click(function () {
    if (localStorage.getItem("settingCache") == "true") {
      localStorage.setItem("settingCache", false);
      $("#checkCache").css("display", "none");
      sessionStorage.removeItem("posts");
    } else {
      localStorage.setItem("settingCache", true);
      $("#checkCache").css("display", "block");
      let posts = new Array();
      sessionStorage.setItem("posts", JSON.stringify(posts));
    }
  });
});