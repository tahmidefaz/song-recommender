
let count = 1

function getSongsHandler() {
    const songsNode = document.getElementById("songs")
    const currentSongs = songsNode.innerHTML
    songsNode.innerHTML = currentSongs + `<p><a href="http://youtube.com/results?search_query=lofi+songs" target="blank">${count}. youtube</a></p>`
    count += 1
    console.log("currentSongs", currentSongs)
}

document.getElementById("get-songs").addEventListener("click", getSongsHandler)
