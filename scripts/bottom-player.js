function initializePlank() {
    let plank = document.createElement("a");
    plank.classList.add("playing");
    plank.setAttribute("href", "https://youtu.be/8NdXENJJwWE");
    plank.setAttribute("target", "_blank");
    plank.text = "Играет сейчас...";
    document.body.insertAdjacentElement('beforeend', plank);
}

document.addEventListener('DOMContentLoaded', initializePlank, false);