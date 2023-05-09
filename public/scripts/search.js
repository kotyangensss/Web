async function search() {
  const text = document.getElementsByClassName('search_field')[0].value;
  console.log(text);
  if (text === '') {
    return;
  }
  window.location.href = '/track/search/' + text;
}

window.addEventListener('DOMContentLoaded', (_) => {
  const button = document.getElementsByClassName('search_btn')[0];
  button.addEventListener('click', search);
});
