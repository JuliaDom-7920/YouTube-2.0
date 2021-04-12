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



// Глобальна інформація про канал ========================================================

$(function () {
  //сховати таблицю показу
  $(".table").hide(0);
});

window.onload = function () {
  loadClient();
};

window.onload = function loadClient() {
  gapi.client.setApiKey("AIzaSyCMQPA4JFFHpFPK-sr00Z6YRHeyJr-3_iA");
  return gapi.client
    .load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
    .then(
      function () {
        console.log("GAPI client loaded for API");
      },
      function (err) {
        console.error("Error loading GAPI client for API", err);
      }
    );
};

$("#globalInfo").click(function () {
  return gapi.client.youtube.channels
    .list({
      part: ["snippet,contentDetails,statistics"],
      id: [$("#idChanel").val()],
    })
    .then(
      function (response) {
        $("#idChanel").val("");
        let x = 0;
        let $tbody = $("#tbody");
        let postTemplate = $("#order-template").html();
        if (localStorage.getItem("settingCache") == "true") {
          let posts = JSON.parse(sessionStorage.getItem("posts"));
          for (let i = 0; i < posts.length; i++) {
            if (posts[i].icon == response.result.items[0].snippet.thumbnails.default.url) {
              x = 1;
              $tbody.append(Mustache.render(postTemplate, posts[i]));
              $(".table").show(300);
              return;
            }
          }
          if (x != 1) {
            let post = {
              icon: response.result.items[0].snippet.thumbnails.default.url,
              title: response.result.items[0].snippet.title,
              date: response.result.items[0].snippet.publishedAt,
              subscriber: response.result.items[0].statistics.subscriberCount,
              video: response.result.items[0].statistics.videoCount,
              view: response.result.items[0].statistics.viewCount,
              description: response.result.items[0].snippet.localized.description
            };
            posts.push(post);
            sessionStorage.setItem("posts", JSON.stringify(posts));
            $tbody.append(Mustache.render(postTemplate, post));
            $(".table").show(300);
          }
        } else {
          let post = {
            icon: response.result.items[0].snippet.thumbnails.default.url,
            title: response.result.items[0].snippet.title,
            date: response.result.items[0].snippet.publishedAt,
            subscriber: response.result.items[0].statistics.subscriberCount,
            video: response.result.items[0].statistics.videoCount,
            view: response.result.items[0].statistics.viewCount,
            description: response.result.items[0].snippet.localized.description
          };
          $tbody.append(Mustache.render(postTemplate, post));
          $(".table").show(300);
        }
      },
      function (err) {
        console.error("Execute error", err);
      }
    );
});

gapi.load("client:auth2", function () {
  gapi.auth2.init({ client_id: "YOUR_CLIENT_ID" });
});