function loadPlaylists() {
    let playlists = document.createElement("ul");
    playlists.classList.add("playlists__list");
    let playlist_ids = localStorage.getItem("playlists");
    if (playlist_ids !== null) {
        JSON.parse(playlist_ids).playlists.forEach(id => {
            let playlist_item = document.createElement("li");
            playlist_item.classList.add("playlists__list__item");
            playlist_item.id = id.toString();
            let playlist_data = localStorage.getItem(id);
            if (playlist_data !== null) {
                playlist_item.innerText = JSON.parse(playlist_data).playlist_name;
                playlists.appendChild(playlist_item);
                let tracks = document.createElement("ul");
                tracks.classList.add("track__list");
                tracks.id = "t" + id.toString();
                JSON.parse(playlist_data).playlist_tracks.forEach(track => {
                    let track_item = document.createElement("li");
                    track_item.classList.add("track__list__item");
                    track_item.innerText = JSON.parse(track).track_name + " - " + JSON.parse(track).artist;
                    tracks.appendChild(track_item);
                });
                playlist_item.after(tracks);
                playlist_item.addEventListener('click', () => {
                    let el = document.getElementById("t" + playlist_item.id);
                    let elDisplay = getComputedStyle(el).display;
                    if (elDisplay === "none") {
                        el.style.display = 'flex';
                    } else {
                        el.style.display = 'none';
                    }
                });
            }

        });
        document.getElementById("playlist__list__name").after(playlists);
    }
}