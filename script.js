const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const img = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

let isPlaying = false;

let songIndex = 0;
const song = [
    {
        name: 'jacinto-1',
        title: 'Lela Neger Aydlm',
        artist: 'Kalikidan-Lili'
    },
    {
        name: 'jacinto-2',
        title: 'Abetu mehereteh',
        artist: 'daniel'
    },
    {
        name: 'jacinto-3',
        title: 'kibier yihune kibir',
        artist: 'Kalikidan-Lili'
    }
];
function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = song.length - 1;
    }
    loadSongs(song[songIndex]);
    playSong();
}

function playSong() {
    isPlaying = true;
    music.play();
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'pause')

}

function nextSong() {
    songIndex++;
    if (songIndex > song.length - 1) {
        songIndex = 0;
    }
    loadSongs(song[songIndex]);
    playSong();
}

function pauseSong() {
    isPlaying = false;
    music.pause();
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'pause')

}

// update progress bar
function updateProgressBar(e) {
    const { duration, currentTime } = e.srcElement;
    if (isPlaying) {
        
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;
        
    }
    const durationMinute = Math.floor(duration / 60);
    const durationSecond = Math.floor(duration%60)<10?`0${Math.floor(duration%60)}`:Math.floor(duration%60);
    if(durationMinute){
        durationEl.textContent = `${durationMinute}:${durationSecond}`;
    }

    const currentTimeMinute = Math.floor(currentTime / 60);
    const currentTimeSecond = Math.floor(currentTime%60)<10?`0${Math.floor(currentTime%60)}`:Math.floor(currentTime%60);
    if(currentTimeSecond){
        currentTimeEl.textContent = `${currentTimeMinute}:${currentTimeSecond}`;
    }
}

function setProgressContainer(e){
    const width = this.clientWidth;
    console.log(e);
    const clickX = e.offsetX;
    const {duration} = music;
    music.currentTime = (clickX / width) * duration;
}

playBtn.addEventListener('click', () => { isPlaying ? pauseSong() : playSong() });
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click',setProgressContainer);
music.addEventListener('ended',nextSong);

// load songs
function loadSongs(song) {
    img.src = `img/${song.name}.jpg`;
    music.src = `music/${song.name}.mp3`;
    title.textContent = song.title;
    artist.textContent = song.artist;
    console.log(music.src);
}

loadSongs(song[songIndex]);