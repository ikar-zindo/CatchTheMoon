import { playRandomTrack, stopMusic } from './background-music.js';

document.querySelector('.btm').addEventListener('mousedown', start_game);
document.querySelector('#area').addEventListener('mousedown', miss);
document.querySelector('#moon').addEventListener('mousedown', hit);

const count_score = document.querySelector("#count_score"); // Ищем объект Луна
const count_life = document.querySelector("#count_life"); // Ищем кол-во жизней
const area = document.querySelector("#area"); // Ищем объект игровое поле
const gameOver = document.querySelector(".game-over"); // Ищем сообшение Game Over

let score = 0; // очки
let life = 3; // жизни
let moon = document.querySelector("#moon"); // Ищем объект Луна
const hit_sound = new Audio("sounds/hit.wav"); // Звук
const miss_sound = new Audio("sounds/miss.wav"); // Звук

// Старт
function start_game() {
   area.classList.remove("finish");
   moon.classList.toggle("start");
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

   moon.classList.remove("start");
   void moon.offsetWidth; // перекомпоновка DOM (API)
   moon.classList.add("start");

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
   moon.style.left = `${random_offset}px`;
}

// TODO Падение Луны вниз
// function fall_down() {

// }

function miss(event) {
   // дойствие при промахивание
   if ((event.target.id === "area" || event.target.id === "wrapper-game-over")
      && moon.classList.contains("start")) {
      life--;
      count_life.innerText = `${life}`;
      if (life <= 0) {
         finish_game();
      }
      miss_sound.currentTime = 0; // Звук
      miss_sound.play(); // Звук
   }
}

function finish_game() {
   moon.classList.remove("start");
   count_life.innerText = `3`;
   gameOver.style.display = "block";
   stopMusic();
}