const count_score = document.querySelector("#count_score"); // Ищем объект Луна
const count_life = document.querySelector("#count_life"); // Ищем кол-во жизней
const area = document.querySelector("#area"); // Ищем объект игровое поле
const gameOver = document.querySelector(".game-over"); // Ищем сообшение Game Over

let score = 0; // очки
let life = 3; // жизни
let object = document.querySelector("#object"); // Ищем объект Луна
const hit_sound = new Audio("sounds/hit.wav"); // Звук
const miss_sound = new Audio("sounds/miss.wav"); // Звук
const game_level_music = new Audio("sounds/level-music.wav"); // Звук

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
   game_level_music.currentTime = 0;
   game_level_music.play(); // Звук
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

// Падение Луны вниз
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

   game_level_music.pause(); // Звук
}