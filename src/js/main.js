function fetchRecommendations(authToken) {
    const fetchObj = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify({
            "prompt": "Don't Stop Believin' (Journey)\nSuperstition- Stevie Wonder\nSweet Child O' Mine- Guns n Roses\nPoker Face - Lady Gaga\nI Want It That Way- Backstreet Boys\nSkyfall – Adele\nBlinding Lights - The Weekend\nI Swear - All-4-One\nWe Are Young – Fun. feat Janelle Monáe\nWrecking Ball - Miley Cyrus\nI Knew You Were Trouble (Taylor Swift feat. Ed Sheeran)\nGangnam Style (Psy)\nI Want You Back - Jackson 5\nI Love Rock n Roll - Joan Jett\nShake It Off – Taylor Swift feat. The Black Eyed Peas\nJust Dance- Lady Gaga",
            "temperature": 0.5,
            "max_tokens": 40,
            "top_p": 1,
            "frequency_penalty": 2,
            "presence_penalty": 2
          })
    }

    const recommendations = fetch('https://api.openai.com/v1/engines/curie/completions', fetchObj)
    .then((data) => {
        return data.json();
    })
    .then((res) => {
        updateList(res.choices[0].text.split('\n'))
        return res.choices[0].text.split('\n')
    });
    return recommendations
}

function updateList(songList) {
    const songsNode = document.getElementById("songs")
    const currentSongs = songsNode.innerHTML

    const songs = songList.filter(song => song != "")
    const songsListHTML = songs.map((item) => {
        return `<p><a target='_blank' href="http://youtube.com/results?search_query=${item.split(' ').join("+")} ">${item}</a></p>`
    })
    songsNode.innerHTML = currentSongs + songsListHTML.join("")
}

function getSongsHandler() {
    const authToken = document.getElementById("secret-input").value

    if (!authToken) {
        window.alert("You Need The GPT-3 Secret! 🤖🤖🤖")
        return
    }
    fetchRecommendations(authToken)
}

document.getElementById("get-songs").addEventListener("click", getSongsHandler)
