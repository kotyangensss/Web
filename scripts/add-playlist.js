function addPlaylist() {
    let btn = document.getElementById("playlist__button");
    btn.addEventListener('click', () => {
        let isAdd = document.getElementById("playlist__button__add");
        if (isAdd !== null) {
            while (btn.nextSibling !== isAdd)
                btn.nextSibling.remove();
            btn.nextSibling.remove();
        } else {
            let playlist_name = document.createElement("input");
            playlist_name.setAttribute("type", "text");
            playlist_name.setAttribute("name", "Название Плейлиста");
            playlist_name.setAttribute("placeholder", "Название Плейлиста");
            playlist_name.classList.add("input__field");
            playlist_name.classList.add("playlist__name");

            let add = document.createElement("input");
            add.setAttribute("type", "submit");
            add.setAttribute("value", "Сохранить");
            add.classList.add("button");
            add.id = "playlist__button__add"

            btn.after(playlist_name);
            let tracks = addTracks();

            let form = document.getElementsByClassName("input")[0];
            form.after(add);

            add.addEventListener('click', () => {
                    if (playlist_name.value !== "") {
                        let id = Date.now().toString();
                        localStorage.setItem(id, JSON.stringify({
                            playlist_name: playlist_name.value,
                            playlist_tracks: tracks
                        }));
                        if (localStorage.getItem("playlists") == null) {
                            localStorage.setItem("playlists", JSON.stringify({playlists: []}));
                        }
                        let new_playlist = JSON.parse(localStorage.getItem("playlists")).playlists;
                        new_playlist.push(id);
                        localStorage.setItem("playlists", JSON.stringify({playlists: new_playlist}));

                        while (btn.nextSibling !== add)
                            btn.nextSibling.remove();
                        btn.nextSibling.remove();

                        let list = document.getElementsByClassName("playlists__list")[0];
                        if (list !== undefined)
                            list.remove();
                        loadPlaylists();
                    }
                }
            )
        }
    });
}