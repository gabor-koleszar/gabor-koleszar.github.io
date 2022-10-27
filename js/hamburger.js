const hamburgerInput = document.querySelector("#input-hamburger");
const hamburgerButton = document.querySelector(".hamburger-btn");
const hamburgerLine = document.querySelector(".hamburger-line ");

function hideMenu(e) {
    if (e.target !== hamburgerButton && e.target !== hamburgerLine && e.target !== hamburgerInput && hamburgerInput.checked === true) {
        hamburgerInput.checked = false;
    }
}

window.addEventListener("click", hideMenu);