async function requestReleases(url) {
  const request = await fetch(url, {
    method: 'GET',
  });
  return await request.json();
}

function createTrackList(tracks) {
  let trackList = document.createElement('ol');
  trackList.classList.add('track__list');
  tracks.forEach((element) => {
    let track = document.createElement('li');
    let img = document.createElement('img');
    img.setAttribute('src', element.cover);
    img.classList.add('track__list__item__image');
    let text = document.createElement('a');
    text.setAttribute('href', '/track/' + element.id);
    text.style.height = 'fit-content';
    track.classList.add('track__list__item');
    text.innerText = element.name;
    track.appendChild(img);
    track.appendChild(text);
    trackList.appendChild(track);
  });
  return trackList;
}

async function renderList(url) {
  let loading = document.createElement('img');
  loading.classList.add('loading');
  loading.src = 'https://cdn.betterttv.net/emote/63608735ed98a03da0ce6613/3x';
  loading.alt = 'loading';
  document.body.getElementsByClassName('main')[0].appendChild(loading);
  try {
    const tracks = await requestReleases(url);
    let trackList = createTrackList(tracks);
    document.getElementsByClassName('loading')[0].style.display = 'none';
    document.getElementsByClassName('loading')[0].after(trackList);
  } catch (e) {
    let error = document.createElement('p');
    error.innerText = e;
    error.style.textAlign = 'center';
    error.style.display = 'block';
    loading.src = 'https://cdn.betterttv.net/emote/61119bfc76ea4e2b9f764aae/3x';
    loading.after(error);
  }
}
