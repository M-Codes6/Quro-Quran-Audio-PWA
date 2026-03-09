import { createContext, useRef, useState } from "react"

export const PlayerContext = createContext()

export function PlayerProvider({children}){

const audioRef = useRef(new Audio())

const [playlist,setPlaylist] = useState([])
const [currentIndex,setCurrentIndex] = useState(0)

const [track,setTrack] = useState(null)
const [isPlaying,setIsPlaying] = useState(false)

const [progress,setProgress] = useState(0)
const [duration,setDuration] = useState(0)

const [speed,setSpeed] = useState(1)


/* ---- Recent ---- */

const [recent,setRecent] = useState(()=>{
const saved = localStorage.getItem("recent")
return saved ? JSON.parse(saved) : []
})

/* --- Favorites ---- */

const [favorites, setFavorites] = useState(() => {
const saved = localStorage.getItem("favorties")
return saved ? JSON.parse(saved) : []
})

/* ---- Qari ---- */

const [qari,setQari] = useState("ar.alafasy")


/* ---------- RECENT TRACKS ---------- */

function updateRecent(item){

setRecent(prev=>{

const filtered = prev.filter(t => t.url !== item.url)

const updated = [item,...filtered].slice(0,10)

localStorage.setItem("recent",JSON.stringify(updated))

return updated

})

}


/* ---------- START AUDIO ---------- */

function startAudio(item){

const audio = audioRef.current

audio.src = item.url

/* RESTORE LAST POSITION */

const savedPositions = JSON.parse(localStorage.getItem("positions") || "{}")

if(savedPositions[item.url]){
audio.currentTime = savedPositions[item.url]
}

audio.play().catch(err => console.log(err))

audio.playbackRate = speed

setTrack(item)
setIsPlaying(true)
setProgress(audio.currentTime || 0)

updateRecent(item)

audio.onloadedmetadata = ()=>{
setDuration(audio.duration || 0)
}

audio.ontimeupdate = ()=>{

setProgress(audio.currentTime)

/* SAVE POSITION */

const saved = JSON.parse(localStorage.getItem("positions") || "{}")

saved[item.url] = audio.currentTime

localStorage.setItem("positions", JSON.stringify(saved))

}

audio.onended = ()=>{

/* CLEAR SAVED POSITION */

const saved = JSON.parse(localStorage.getItem("positions") || "{}")

delete saved[item.url]

localStorage.setItem("positions", JSON.stringify(saved))

if(currentIndex < playlist.length - 1){

const next = currentIndex + 1

setCurrentIndex(next)

startAudio(playlist[next])

}else{

setIsPlaying(false)

}

}

}




/* ---------- PLAY TRACK ---------- */

function playTrack(list,index){

const item = list[index]

setPlaylist(list)
setCurrentIndex(index)

startAudio(item)

/*  ----- Media Session ----- */

if("mediaSession" in navigator) {

    navigator.mediaSession.metadata = new MediaMetadata ({

        title:item.title,
        artist:item.artist,
        album:"Quro",

        artwork:[
            {
                src:"/icon-192.png",
                sizes:"192x192",
                type:"image/png"
            },
            {
                src:"/icon-512.png",
                sizes:"512x512",
                type:"image/png"
            }
        ]
    })

    navigator.mediaSession.setActionHandler("play",togglePlay)
    navigator.mediaSession.setActionHandler("pause",togglePlay)
    navigator.mediaSession.setActionHandler("nexttrack", nextTrack)
    navigator.mediaSession.setActionHandler("previoustrack",prevTrack)
}
}



/* ---------- PLAY / PAUSE ---------- */

function togglePlay(){

if(!track) return

const audio = audioRef.current

if(isPlaying){
audio.pause()
}else{
audio.play().catch(err => console.log(err))
}

setIsPlaying(!isPlaying)

}


/* ---------- NEXT TRACK ---------- */

function nextTrack(){

if(currentIndex < playlist.length - 1){

const nextIndex = currentIndex + 1

setCurrentIndex(nextIndex)

startAudio(playlist[nextIndex])

}

}


/* ---------- PREVIOUS TRACK ---------- */

function prevTrack(){

if(currentIndex > 0){

const prevIndex = currentIndex - 1

setCurrentIndex(prevIndex)

startAudio(playlist[prevIndex])

}

}


/* ---------- SPEED CONTROL ---------- */

function changeSpeed(){

let newSpeed = speed + 0.25

if(newSpeed > 2){
newSpeed = 1
}

audioRef.current.playbackRate = newSpeed

setSpeed(newSpeed)

}


/* ---------- SEEK ---------- */

function seek(e){

const value = Number(e.target.value)

audioRef.current.currentTime = value

setProgress(value)

}


/* ---------- FAVORITES ---------- */

function toggleFavorite(item){

setFavorites(prev=>{

const exists = prev.find(
f => f.id === item.id && f.type === item.type
)

let updated

if(exists){
updated = prev.filter(
f => !(f.id === item.id && f.type === item.type)
)
}else{
updated = [...prev,item]
}

localStorage.setItem("favorites",JSON.stringify(updated))

return updated

})

}



/* ---------- SHUFFLE PLAYLIST ---------- */

function shufflePlaylist(){

if(playlist.length === 0) return

const shuffled = [...playlist].sort(()=>Math.random()-0.5)

setPlaylist(shuffled)

setCurrentIndex(0)

startAudio(shuffled[0])

}


/* ---------- PROVIDER ---------- */

return(

<PlayerContext.Provider value={{

track,
isPlaying,
progress,
duration,
speed,

playTrack,
togglePlay,
nextTrack,
prevTrack,
changeSpeed,
seek,

recent,

qari,
setQari,

favorites,
toggleFavorite,

shufflePlaylist

}}>

{children}

</PlayerContext.Provider>

)

}