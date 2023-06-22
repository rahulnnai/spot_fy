// Initialize the variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));


let songs = [
    { songName: "kya mujhe pyar hai", filePath: "songs/1.mp3", coverPath:"cover/cover2.jpeg"},
    { songName: "Ankhon mein teri", filePath: "songs/2.mp3", coverPath:"cover/ankhon_me.jpeg"},
    { songName: "Zara sa", filePath: "songs/3.mp3", coverPath:"cover/zara.jpeg"},
    { songName: "Haan tu hai", filePath: "songs/4.mp3", coverPath:"cover/haantu.jpeg"},
    { songName: "Ek din teri", filePath: "songs/5.mp3", coverPath:"cover/cover.jpeg"},
]

songItems.forEach((element, i)=> {
   element.getElementsByTagName("img")[0].src = songs[i].coverPath;
   element.getElementsByClassName("songName")[0].innerHTML = songs[i].songName;
})

// audioElement.play();

// Handle play/pause button 
masterPlay.addEventListener('click', () =>{
    if(audioElement.paused || audioElement.currentTime <= 0){
        audioElement.play();
        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-pause');
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause');
        masterPlay.classList.add('fa-play');
        gif.style.opacity = 0;
    }
})
// Listen to Events
audioElement.addEventListener('timeupdate', ()=>{
    // update seekbar 
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100);
    myProgressBar.value = progress; 
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=> {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
     element.classList.remove('fa-circle-pause');
    element.classList.add('fa-circle-play');

    })
}
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        makeAllPlays();
        songIndex = parseInt(e.target.id);
       e.target.classList.remove('fa-circle-play');
       e.target.classList.add('fa-circle-pause');
       audioElement.src = `songs/${songIndex+1}.mp3`;
       masterSongName.innerText = songs[songIndex].songName;
       audioElement.currentTime = 0;
       audioElement.play();
       gif.style.opacity = 1;
       masterPlay.classList.remove('fa-play');
       masterPlay.classList.add('fa-pause'); 

    })
})

document.getElementById('next').addEventListener('click', ()=> {
    if (songIndex >= 5) {
        songIndex = 0
    } 
    else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause'); 
})

document.getElementById('previous').addEventListener('click', ()=> {
    if (songIndex <=0) {
        songIndex = 0
    } 
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause'); 
})

