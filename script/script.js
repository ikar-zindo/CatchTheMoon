const count_score = document.querySelector("#count_score"); // Ищем объект Луна
const count_life = document.querySelector("#count_life"); // Ищем кол-во жизней
const area = document.querySelector("#area"); // Ищем объект игровое поле
const gameOver = document.querySelector(".game-over"); // Ищем сообшение Game Over

let score = 0; // очки
let life = 3; // жизни
let object = document.querySelector("#object"); // Ищем объект Луна
const hit_sound = new Audio("sounds/hit.wav"); // Звук
const miss_sound = new Audio("sounds/miss.wav"); // Звук
// const game_level_music = new Audio("sounds/level-music/level-music.wav"); // Звук

// Зацикливаем мелодию уровня
setInterval(function () {
   game_level_music.currentTime = 0; // этой строки может не быть, если время звучания аудиофайла меньше, чем 15 с.
   game_level_music.play();
}, 30000);

// Старт
function start_game() {
   area.classList.remove("finish");
   object.classList.toggle("start");
   gameOver.style.display = "none";
   score = 0; // обнуление очков
   life = 3; // обнуление жизней
   count_score.innerText = `0`;
   count_life.innerText = `3`;
   playRandomTrack();// Звук
}

function hit() {
   // дойствие при попадании
   score++;
   count_score.innerText = `${score}`; // Счёичик очков

   object.classList.remove("start");
   void object.offsetWidth; // перекомпоновка DOM (API)
   object.classList.add("start");

   if (score % 5 == 0) {
      // зарабатываем жизнь при наборе 5 очков
      life++;
      count_life.innerText = `${life}`;
   }

   random_offset(); // Случайное появление Луны

   hit_sound.currentTime = 0; // Звук
   hit_sound.play(); // Звук
}

function random_offset() { // Случайное появление Луны
   let random_offset = Math.floor(Math.random() * 400);
   object.style.left = `${random_offset}px`;
}

// TODO Падение Луны вниз
// function fall_down() {

// }

function miss(event) {
   // дойствие при промахивание
   if (event.target.id == "area" || event.target.id == "wrapper-game-over") {
      life--;
      count_life.innerText = `${life}`;
      if (life < 0) {
         finish_game();
      }
      miss_sound.currentTime = 0; // Звук
      miss_sound.play(); // Звук
   }
}

function finish_game() {
   object.classList.remove("start");
   // count_score.innerText = `0`;
   count_life.innerText = `3`;
   gameOver.style.display = "block";
   audio.stop();
}

// Рандомный трэк
var audio = null; // Глобальная переменная для отслеживания текущего воспроизведения

function playRandomTrack() {
   const audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();
   const folderPath = "./sounds/level-music"; // Замените на путь к вашей папке с треками
   const tracks = [
      "level-music.wav",
      "mixkit-cat-walk.wav",
      "mixkit-cbpd.wav",
      "mixkit-driving-ambition.wav",
      "mixkit-hip-hop.wav",
      "mixkit-sleepy-cat.wav",
      "mixkit-sun-and-his-daughter.wav"
   ]; // Замените на реальные имена ваших треков

   // Генерируем случайный индекс трека
   const randomIndex = Math.floor(Math.random() * tracks.length);
   const randomTrack = tracks[randomIndex];
   const trackUrl = folderPath + "/" + randomTrack;

   // Создаем XMLHttpRequest для загрузки трека
   const request = new XMLHttpRequest();
   request.open("GET", trackUrl, true);
   request.responseType = "arraybuffer";

   // Обработка успешной загрузки трека
   request.onload = function () {
      audioContext.decodeAudioData(request.response, function (buffer) {
         // Прекращаем воспроизведение предыдущего трека, если он есть
         if (audio !== null) {
            audio.stop();
         }

         const source = audioContext.createBufferSource();
         source.buffer = buffer;
         source.connect(audioContext.destination);
         source.start(0);

         // Сохраняем текущий трек для последующего прекращения воспроизведения
         audio = source;
      });
   };

   // Отправляем запрос на загрузку трека
   request.send();
}