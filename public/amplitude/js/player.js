let songs = [
  {
    name: "I'm so lazy",
    artist: 'billboards',
    url: "songs/billboards - I'm so lazy.mp3",
    cover_art_url: "song-art/billboards - I'm so lazy.png",
    duration: '02:32',
  },
  {
    name: 'razors',
    artist: 'billboards',
    url: 'songs/billboards - razors.mp3',
    cover_art_url: 'song-art/billboards - razors.png',
    duration: '02:43',
  },
  {
    name: 'cold breath',
    artist: 'billboards',
    url: 'songs/billboards - cold breath.mp3',
    cover_art_url: 'song-art/billboards - cold breath.png',
    duration: '02:34',
  },
  {
    name: "I'm so lazy",
    artist: 'billboards',
    url: "songs/billboards - I'm so lazy.mp3",
    cover_art_url: "song-art/billboards - I'm so lazy.png",
    duration: '02:32',
  },
  {
    name: 'razors',
    artist: 'billboards',
    url: 'songs/billboards - razors.mp3',
    cover_art_url: 'song-art/billboards - razors.png',
    duration: '02:43',
  },
  {
    name: 'cold breath',
    artist: 'billboards',
    url: 'songs/billboards - cold breath.mp3',
    cover_art_url: 'song-art/billboards - cold breath.png',
    duration: '02:34',
  },
  {
    name: "I'm so lazy",
    artist: 'billboards',
    url: "songs/billboards - I'm so lazy.mp3",
    cover_art_url: "song-art/billboards - I'm so lazy.png",
    duration: '02:32',
  },
  {
    name: 'razors',
    artist: 'billboards',
    url: 'songs/billboards - razors.mp3',
    cover_art_url: 'song-art/billboards - razors.png',
    duration: '02:43',
  },
  {
    name: 'cold breath',
    artist: 'billboards',
    url: 'songs/billboards - cold breath.mp3',
    cover_art_url: 'song-art/billboards - cold breath.png',
    duration: '02:34',
  },
  {
    name: "I'm so lazy",
    artist: 'billboards',
    url: "songs/billboards - I'm so lazy.mp3",
    cover_art_url: "song-art/billboards - I'm so lazy.png",
    duration: '02:32',
  },
  {
    name: 'razors',
    artist: 'billboards',
    url: 'songs/billboards - razors.mp3',
    cover_art_url: 'song-art/billboards - razors.png',
    duration: '02:43',
  },
  {
    name: 'cold breath',
    artist: 'billboards',
    url: 'songs/billboards - cold breath.mp3',
    cover_art_url: 'song-art/billboards - cold breath.png',
    duration: '02:34',
  },
  {
    name: "I'm so lazy",
    artist: 'billboards',
    url: "songs/billboards - I'm so lazy.mp3",
    cover_art_url: "song-art/billboards - I'm so lazy.png",
    duration: '02:32',
  },
  {
    name: 'razors',
    artist: 'billboards',
    url: 'songs/billboards - razors.mp3',
    cover_art_url: 'song-art/billboards - razors.png',
    duration: '02:43',
  },
  {
    name: 'cold breath',
    artist: 'billboards',
    url: 'songs/billboards - cold breath.mp3',
    cover_art_url: 'song-art/billboards - cold breath.png',
    duration: '02:34',
  },
];

window.onkeydown = function (e) {
  return !(e.keyCode === 32);
};

document.body.insertAdjacentElement('beforeend', initializePlayer(songs));
/*
  Handles a click on the down button to slide down the playlist.
*/
document
  .getElementsByClassName('down-header')[0]
  .addEventListener('click', function () {
    let list = document.getElementById('list');
    if (list) {
      list.style.height =
        document.getElementsByClassName('player__container')[0].offsetHeight -
        135 +
        'px';
    }
    document.getElementsByClassName('list_screen')[0].style.display = 'block';
  });

/*
  Handles a click on the top bar to hide the list screen.
*/
document
  .getElementsByClassName('hide-playlist')[0]
  .addEventListener('click', function () {
    document.getElementsByClassName('list_screen')[0].style.display = 'none';
  });

document
  .getElementsByClassName('list_screen__meta_container')[0]
  .addEventListener('click', function () {
    document.getElementsByClassName('list_screen')[0].style.display = 'none';
    document.getElementsByClassName('player__container')[0].style.display =
      'none';
    document.getElementsByClassName('playing')[0].style.display = 'flex';
  });

document
  .getElementsByClassName('player__middle')[0]
  .addEventListener('click', function () {
    document.getElementsByClassName('player__container')[0].style.display =
      'none';
    document.getElementsByClassName('playing')[0].style.display = 'flex';
  });

/*
  Handles a click on the song played progress bar.
*/
document
  .getElementsByClassName('song__played__progress')[0]
  .addEventListener('click', function (e) {
    let offset = this.getBoundingClientRect();
    let x = e.pageX - offset.left;

    Amplitude.setSongPlayedPercentage((x / this.offsetWidth) * 100);
  });

Amplitude.init({
  bindings: {
    37: 'prev',
    39: 'next',
    32: 'play_pause',
  },
  songs: songs,
  volume: 1,
});
