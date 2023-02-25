window.onload = function navigation() {
  let currentPage = document.location.pathname.split('/').pop();
  let element = undefined;
  switch (currentPage) {
    case 'chart':
      element = document.getElementsByClassName('navigation__item')[0];
      break;
    case 'releases':
      element = document.getElementsByClassName('navigation__item')[1];
      break;
    case 'genres':
      element = document.getElementsByClassName('navigation__item')[2];
      break;
    case 'playlists':
      element = document.getElementsByClassName('navigation__item')[3];
      break;
  }
  if (element) {
    element.style.borderBottom = 'solid thin #32a1ce';
  }
};
