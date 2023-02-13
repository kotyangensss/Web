let footerText = `<ul class="footer__list">
        <li class="footer__list_item"><a href=>О проекте</a></li>
        <li class="footer__list_item"><a href="contacts.html">Контакты</a></li>
        <li class="footer__list_item"><a href="sign.html">Вход</a></li>
    </ul>
    <div id="page_load"></div>
    <article class="copyright">
        <del>Некая очень важная информация в самом низу сайта.</del>
    </article>`;

let headerText = `<a href="index.html">
            <div class="logo">
    <pre>
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⠟⠋⠉⠉⠉⠉⠉⠛⠻⠛⠉⠉⠛⠉⠻⢿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⠃⠄⣠⡶⢶⣶⣄⠄⠄⠄⢀⣴⣶⣶⣄⠄⠈⠻⣿⣿⣿⣿⣿
⣿⣿⣿⣿⠟⠁⠄⠄⣿⡇⢀⢻⣿⣷⡀⢰⣿⣿⠁⠈⣿⡇⠄⠄⠙⢿⣿⣿⣿
⣿⣿⠟⢁⣀⣀⣀⡀⢿⡇⠘⣸⣿⣿⠁⢿⣿⣿⡘⠄⣿⠇⣀⣀⣀⣀⡉⠻⣿
⡿⢃⣵⣿⣿⣿⡿⣿⠈⠻⠿⣿⠿⢋⣄⡜⠿⣿⣿⡾⠋⢠⡿⣿⣿⣿⣿⣦⡈
⢁⣿⣿⠿⠿⣿⣧⡈⠓⠄⠄⣀⣤⣾⣿⣿⣦⣀⠄⠄⠄⠚⢁⣼⣿⣿⣿⣿⣿
⣾⡿⢁⢶⣦⡈⠿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣾⣿⡿⢋⣭⡍⠙⣿⣿
⣿⠃⣾⣄⠻⣿⣦⣈⡛⠻⠿⢿⠿⢿⣿⣿⠿⠿⠿⠟⠛⣁⣴⣿⠏⣡⠄⢿⣿
⠙⠂⠙⣿⣷⣄⡙⠛⠻⠿⣶⣶⣶⣶⣶⣶⣶⣶⡶⠿⠿⠛⢋⣠⣾⡟⠄⠚⠛
⣶⣤⡀⠄⠙⠻⠿⢷⣶⣦⣤⣤⣤⢤⣤⣤⣤⣤⣤⣴⣶⣾⠿⠟⠋⠄⠄⢀⣠
⠟⣛⣩⣴⣤⣀⠄⠄⠄⠄⠉⠉⠈⠈⠉⠉⠉⠁⠄⠄⠄⠄⠄⠄⠄⣀⣐⣛⣻
⣾⣿⣿⣿⣿⣿⣿⣷⣶⣶⣤⣤⣤⣤⣤⣤⣄⣠⣤⣤⣤⣤⣶⣾⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
    </pre>
            </div>
        </a>
        <ul class="navigation">
            <li class="navigation__item"><a href="chart.html">Чарт</a></li>
            <li class="navigation__item"><a href="releases.html">Последние Релизы</a></li>
            <li class="navigation__item"><a href="genres.html">Жанры</a></li>
            <li class="navigation__item"><a href="playlists.html">Плейлисты</a></li>
        </ul>
        <div class="search_box">
            <button class="search_btn" type="submit"><i class="fas fa-search"></i></button>
            <input class="search_field" type="text" placeholder="Трек, исполнитель"/>
        </div>
        <a class="sign" href="sign.html">вход</a>`;

document.addEventListener(
  'DOMContentLoaded',
  function loadHeaderFooter() {
    let header = document.createElement('header');
    header.innerHTML = headerText;
    header.className = 'header';
    let footer = document.createElement('footer');
    footer.innerHTML = footerText;
    footer.className = 'footer';
    document.body.insertAdjacentElement('afterbegin', header);
    document.body.insertAdjacentElement('beforeend', footer);
  },
  false,
);
