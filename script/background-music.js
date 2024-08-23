// Рандомный трек
let audio = null; // Глобальная переменная для отслеживания текущего воспроизведения
let isPlaying = false; // Флаг, который отслеживает, воспроизводится ли трек

function playRandomTrack() {
	if (isPlaying) {
		// Если трек уже играет, остановите его перед началом нового
		if (audio !== null) {
			audio.stop();
			audio.disconnect(); // Отключаем аудио от контекста, чтобы избежать утечек памяти
			audio.onended = null; // Убираем предыдущий обработчик события 'ended'
		}
	}

	const audioContext = new (window.AudioContext || window.webkitAudioContext)();
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
				audio.disconnect();
			}

			const source = audioContext.createBufferSource();
			source.buffer = buffer;
			source.connect(audioContext.destination);
			source.start(0);

			isPlaying = true;
			audio = source;

			// Добавляем обработчик события 'ended'
			source.onended = function () {
				isPlaying = false;
				playRandomTrack(); // Воспроизводим следующий трек
			};
		});
	};

	// Отправляем запрос на загрузку трека
	request.send();
}

function stopMusic() {
	if (audio !== null) {
		audio.stop();
		audio.disconnect();
		audio.onended = null; // Очищаем обработчик события
		isPlaying = false; // Сбрасываем флаг
	}
}

// Экспортируем функции для использования в других файлах
export { playRandomTrack, stopMusic };