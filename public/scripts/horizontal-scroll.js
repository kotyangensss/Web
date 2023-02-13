window.onload = function () {
  function scrollHorizontally(e) {
    e = window.event || e;
    var delta = Math.max(-1, Math.min(1, e.wheelDelta || -e.detail));
    document.getElementById('rec__list').scrollLeft -= delta * 50;
    e.preventDefault();
  }

  if (document.getElementById('rec__list').addEventListener) {
    // IE9, Chrome, Safari, Opera
    document
      .getElementById('rec__list')
      .addEventListener('mousewheel', scrollHorizontally, false);
    // Firefox
    document
      .getElementById('rec__list')
      .addEventListener('DOMMouseScroll', scrollHorizontally, false);
  } else {
    // IE 6/7/8
    document
      .getElementById('rec__list')
      .attachEvent('onmousewheel', scrollHorizontally);
  }
};
