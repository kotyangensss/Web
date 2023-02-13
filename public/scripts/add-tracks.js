function addTracks() {
  let tracks = [];
  let form = document.createElement('form');
  form.classList.add('input');

  let track_name = document.createElement('input');
  track_name.setAttribute('type', 'text');
  track_name.setAttribute('name', 'Название трека');
  track_name.setAttribute('placeholder', 'Название трека');
  track_name.classList.add('input__field');

  let artist = document.createElement('input');
  artist.setAttribute('type', 'text');
  artist.setAttribute('name', 'Исполнитель');
  artist.setAttribute('placeholder', 'Исполнитель');
  artist.classList.add('input__field');

  let add = document.createElement('input');
  add.setAttribute('type', 'submit');
  add.setAttribute('value', '+');
  add.classList.add('button');
  add.classList.add('input__button');

  form.addEventListener('submit', () => {
    event.preventDefault();
    if (track_name.value !== '' && artist.value !== '') {
      let track_name_text = document.createElement('p');
      track_name_text.innerText = track_name.value + ' - ' + artist.value;
      tracks.push(
        JSON.stringify({ track_name: track_name.value, artist: artist.value }),
      );
      track_name.value = '';
      artist.value = '';
      track_name_text.align = 'center';

      form.after(track_name_text);
    }
  });

  document.getElementsByClassName('header__name')[0].before(form);

  form.append(track_name);
  form.append(artist);
  form.append(add);
  return tracks;
}
