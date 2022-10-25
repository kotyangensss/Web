(function ()
{
    let start = new Date().getTime();

    function pageLoadingTime()
    {
        let loadTime = (new Date().getTime() - start) / 1000;
        let pageLoad = document.getElementById("page_load");
        pageLoad.innerText = "Page load time is " + loadTime + " Seconds";
    }

    window.addEventListener("load", _ => {pageLoadingTime()})
})()