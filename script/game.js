import { playRandomTrack, stopMusic } from './background-music.js';

document.querySelector('.btm').addEventListener('mousedown', start_game);
document.querySelector('#area').addEventListener('mousedown', miss);
document.querySelector('#moon').addEventListener('mousedown', hit);

const count_score = document.querySelector("#count_score");
const count_life = document.querySelector("#count_life");
const area = document.querySelector(".area");
const gameOver = document.querySelector(".game-over");

let score = 0;
let life = 3;
let moon = document.querySelector("#moon");
const hit_sound = new Audio("sounds/hit.wav");
const miss_sound = new Audio("sounds/miss.wav");

let falling = false; // Флаг, чтобы отслеживать, падает ли объект

// Функция для запуска игры
function start_game() {
   area.classList.remove("finish");
   moon.classList.toggle("start");
   gameOver.style.display = "none";
   score = 0;
   life = 3;
   count_score.innerText = `0`;
   count_life.innerText = `3`;
   reset_moon();
   playRandomTrack(); // Запуск фоновой музыки
   fall_down(); // Запуск падения объекта
}

// Функция для сброса луны в начальное положение и установки случайной позиции
function reset_moon() {
   random_offset(); // Устанавливаем случайную позицию по горизонтали
   moon.style.transform = 'translateY(-100px)';
   moon.classList.remove('start');
   setTimeout(() => {
      moon.classList.add('start');
   }, 100); // Добавляем небольшой таймаут, чтобы анимация могла перезапуститься
}

// Метод для случайного появления Луны по горизонтали
function random_offset() {
   let random_offset = Math.floor(Math.random() * (area.clientWidth - moon.clientWidth));
   moon.style.left = `${random_offset}px`;
}

function fall_down() {
   falling = true;
   moon.addEventListener('animationiteration', onFallEnd);
}

function onFallEnd() {
   if (falling) {
      miss({ target: { id: "area" } }); // Вызываем функцию промаха, если объект достиг низа
   }
}

function hit() {
   if (!falling) return; // Игнорируем попадания, если объект не падает

   score++;
   count_score.innerText = `${score}`;

   hit_sound.currentTime = 0;
   hit_sound.play();

   if (score % 5 === 0) {
      life++;
      count_life.innerText = `${life}`;
   }

   // Сброс объекта и запуск новой анимации
   falling = false;
   reset_moon();
   setTimeout(fall_down, 100); // Запуск нового падения после небольшой задержки
}

function miss(event) {
   if ((event.target.id === "area" || event.target.id === "wrapper-game-over")
      && moon.classList.contains("start")) {
      life--;
      count_life.innerText = `${life}`;

      miss_sound.currentTime = 0; // Звук
      miss_sound.play(); // Звук

      if (life <= 0) {
         finish_game();
      } else {
         reset_moon();
         setTimeout(fall_down, 100);
      }
   }
}

function finish_game() {
   moon.classList.remove("start");
   count_life.innerText = `3`;
   gameOver.style.display = "block";
   stopMusic();
}
