// Selected Elements
let imageSong = document.querySelector('.image');
let artistSong = document.querySelector('.title h3');
let titleSong = document.querySelector('.title p');

let playBtn = document.querySelector('.play-btn');
let playIcon = document.querySelector('.play-btn i');
let nextBtn = document.querySelector('.forward');

let prevBtn = document.querySelector('.backward');
let audioPlayer = document.querySelector('.audio-player');
let currentDuration = document.querySelector('.span1');

let timeTotal = document.querySelector('.span2');
let fillbar = document.querySelector('.fill-div');

let currentSongIndex;
let nextSongIndex;
let seeking = false;
let seekto;
// MY Audios
let audios = [
        {
            title: 'Anablayak',
            artist: 'Majid AlMohandis',
            audioPath: './aghani/majid2.mp3',
            audioImg: './image/m5.jpg'
        },
        {
            title: 'Madaret',
            artist: 'Saif Nabil',
            audioPath: './aghani/saif2.mp3',
            audioImg: './image/saif2.jpg'
        },
        {
            title: 'A3of Aldunya',
            artist: 'Mohamed Alsalim',
            audioPath: './aghani/mohamed2.mp3',
            audioImg: './image/mohamed.jpg'
        },
        {
            title: 'Maku Sutik',
            artist: 'Sultan Alomani',
            audioPath: './aghani/sultan.mp3',
            audioImg: './image/s3.jpg'
        },
        {
            title: 'Mu 7alfin',
            artist: 'Nour Alzein',
            audioPath: './aghani/nour.mp3',
            audioImg: './image/n3.jpg'
        },
        {
            title: 'Ya Habibi',
            artist: 'Mahmoud Alturki',
            audioPath: './aghani/mahmoud.mp3',
            audioImg: './image/mah2.jpg'
        },
        {
            title: 'Wa3id Mni',
            artist: 'Rahma Riyadh',
            audioPath: './aghani/rahma.mp3',
            audioImg: './image/rahma2.jpg'
        },
        {
            title: 'Atmana',
            artist: 'Asil Hamim',
            audioPath: './aghani/asil.mp3',
            audioImg: './image/asil.jpg'
        },
        {
            title: 'Bathret',
            artist: 'Saif Amer',
            audioPath: './aghani/saifamer.mp3',
            audioImg: './image/saifamer.png'
        },
        {
            title: 'Aglama Yar',
            artist: 'Koray Avci',
            audioPath: './aghani/koray.mp3',
            audioImg: './image/koray.jpg'
        },
    ];
// Play Song On Click
playBtn.addEventListener('click', togglePlayerSong);
nextBtn.addEventListener('click', () =>changeSong());

prevBtn.addEventListener('click', () => changeSong(false));

initPlayer();

function initPlayer() {
    // Current Index
    currentSongIndex = 0;
    // Next Index Of Audios
    nextSongIndex = currentSongIndex +1;

}
// Fuction To Update A Player On Reload
function updatePlayer() {

    let audio = audios[currentSongIndex];

    imageSong.src = audio.audioImg;

    artistSong.innerHTML = audio.artist;

    titleSong.innerHTML = audio.title;

    audioPlayer.src = audio.audioPath;
    totalTime(Math.floor(audioPlayer.duration));


};
updatePlayer();

// Function To Toggle Play/Pause A Music
function togglePlayerSong() {

    if (audioPlayer.paused) {

        audioPlayer.play();
        playIcon.classList.remove('fa-play')
        playIcon.classList.add('fa-pause')

    } else {

        audioPlayer.pause();
        playIcon.classList.add('fa-play')
        playIcon.classList.remove('fa-pause')

    }

};

// Function To Change A Songs
function changeSong(next = true) {

    if (next) {
        currentSongIndex++;
        nextSongIndex = currentSongIndex +1;

        if (currentSongIndex > audios.length -1) {

            currentSongIndex = 0;

            nextSongIndex = currentSongIndex +1;

        }
        if (nextSongIndex > audios.length -1) {

            nextSongIndex = 0;
        }

    } else {
        currentSongIndex--;
        nextSongIndex = currentSongIndex +1;

        if (currentSongIndex < 0) {

            currentSongIndex = audios.length -1;
            nextSongIndex = 0;

        }
    }
    updatePlayer();
    togglePlayerSong();
    };

    // Event To Update A Time
    audioPlayer.addEventListener('timeupdate', function() {

        let progress = (audioPlayer.currentTime / audioPlayer.duration) *100;

        fillbar.style.width = `${progress}%`;

        convertTime(Math.round(audioPlayer.currentTime));
        totalTime(Math.floor(audioPlayer.duration));
        seekTime();

    });

    // Function To Convert A Time
    function convertTime(seconds) {
        let min = Math.floor(seconds / 60);
        let sec = seconds % 60;

        // lets fix the songle digit
        min = min < 10 ? "0" + min : min;
        sec = sec < 10 ? "0" + sec : sec;

        currentDuration.textContent = min + ":" + sec;

    }
    // Function Total Time
    function totalTime(seconds) {

        let min = Math.floor(seconds / 60);
        let sec = Math.floor(seconds % 60);

        // lets fix the songle digit
        min = min < 10 ? "0" + min : min;
        sec = sec < 10 ? "0" + sec : sec;

        if (sec) {

            timeTotal.textContent = min +':'+ sec;
        }
    };

    function seekTime(event) {
        
        if (audioPlayer.duration == 0) {
            null
        }else {

            if (seeking) {
                let fill = document.querySelector('.fill');
                fill.value = event.clientX - fill.offsetLeft;
                seekto = audioPlayer.duration * (fill.value / 100);
                audioPlayer.currentTime = seekto;
                console.log('hi')
            }
            
        }
    };
    seekTime();


