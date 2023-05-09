function genres(genreList) {
  let list = document.createElement('ul');
  list.classList.add('playlists__list');
  Object.values(genreList.split(',')).forEach((element) => {
    let text = document.createElement('a');
    text.classList.add('playlists__list__item');
    text.href = 'track/genres/' + element.toString();
    text.innerText = element.toString().toUpperCase();
    list.appendChild(text);
  });
  document.getElementsByClassName('main')[0].after(list);
}
