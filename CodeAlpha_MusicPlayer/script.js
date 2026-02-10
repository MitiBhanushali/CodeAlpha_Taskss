const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const title = document.getElementById("song-title");

const songs = [
    { name: "song1", title: "Song One" },
    { name: "song2", title: "Song Two" },
    { name: "song3", title: "Song Three" },
    { name: "song4", title: "Song Four" },
     { name: "song5", title: "Song Five" }
];

let songIndex = 0;
let isPlaying = false;

// Load song
function loadSong(song) {
    title.textContent = song.title;
    audio.src = `assets/music/${song.name}.mpeg`;
}

loadSong(songs[songIndex]);

// Play / Pause
playBtn.addEventListener("click", () => {
    if (!isPlaying) {
        audio.play();
        playBtn.textContent = "⏸";
        isPlaying = true;
    } else {
        audio.pause();
        playBtn.textContent = "▶";
        isPlaying = false;
    }
});

// Next song
nextBtn.addEventListener("click", () => {
    songIndex = (songIndex + 1) % songs.length;
    loadSong(songs[songIndex]);
    audio.play();
    playBtn.textContent = "⏸";
    isPlaying = true;
});

// Previous song
prevBtn.addEventListener("click", () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    loadSong(songs[songIndex]);
    audio.play();
    playBtn.textContent = "⏸";
    isPlaying = true;
});

// Update progress bar
audio.addEventListener("timeupdate", () => {
    const progressPercent = (audio.currentTime / audio.duration) * 100;
    progress.style.width = `${progressPercent}%`;
});

// Click to seek
progressContainer.addEventListener("click", (e) => {
    const width = progressContainer.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;

    audio.currentTime = (clickX / width) * duration;
});
