function chart() {
  async function requestChart() {
    const request = await fetch(
      'https://shazam.p.rapidapi.com/songs/list-recommendations?key=484129036&locale=en-US',
      {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key':
            '269cc7f113msh3f0592cb3f033bfp1c01aejsn9bc49e351bdb',
          'X-RapidAPI-Host': 'shazam.p.rapidapi.com',
        },
      },
    );
    return await request.json();
  }

  async function renderChart() {
    try {
      const users = await requestChart();
      let trackList = createTrackList(random(users.tracks));
      document.getElementsByClassName('loading')[0].style.display = 'none';
      document.getElementsByClassName('loading')[0].after(trackList);
    } catch (e) {
      let error = document.createElement('p');
      error.innerText = '⚠ Что-то пошло не так';
      error.style.textAlign = 'center';
      error.style.display = 'block';
      document.getElementsByClassName('loading')[0].src =
        'https://cdn.betterttv.net/emote/61119bfc76ea4e2b9f764aae/3x';
      document.getElementsByClassName('loading')[0].after(error);
    }
  }

  function createTrackList(tracks) {
    let trackList = document.createElement('ol');
    trackList.classList.add('track__list');
    tracks.forEach((element) => {
      let track = document.createElement('li');
      let img = document.createElement('img');
      img.setAttribute('src', element.share.image);
      img.classList.add('track__list__item__image');
      let text = document.createElement('a');
      text.setAttribute('href', element.share.href);
      text.setAttribute('target', '_blank');
      text.style.height = 'fit-content';
      track.classList.add('track__list__item');
      text.innerText = element.share.subject;
      console.log(element.key);
      track.appendChild(img);
      track.appendChild(text);
      trackList.appendChild(track);
    });
    return trackList;
  }

  function random(tracks) {
    for (let i = 0; i < 5; i++) {
      tracks.splice(Math.floor(Math.random() * tracks.length), 1);
    }
    return tracks;
  }

  window.addEventListener('DOMContentLoaded', (_) => {
    setTimeout(renderChart, 1000);
  });
}
