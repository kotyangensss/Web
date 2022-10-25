window.onload = function navigation() {
    let currentPage = document.location.pathname.split("/").pop()
    let element = undefined
    switch (currentPage) {
        case "chart.html":
            element = document.getElementsByClassName("navigation__item")[0];
            break;
        case "releases.html":
            element = document.getElementsByClassName("navigation__item")[1];
            break;
        case "genres.html":
            element = document.getElementsByClassName("navigation__item")[2];
            break;
        case "playlists.html":
            element = document.getElementsByClassName("navigation__item")[3];
            break;
    }
    if (element) {
        element.style.borderBottom = "solid thin #32a1ce";
    }
}