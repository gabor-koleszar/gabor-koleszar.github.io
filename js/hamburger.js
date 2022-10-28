const hamburgerMenu = document.querySelector(".js-hamburger-menu");
const mainMenu = document.querySelector(".js-main-menu");

function toggleMenu() {
    mainMenu.classList.toggle("menu-d-flex");
}

function animateHamburgerMenu() {
    hamburgerMenu.classList.toggle("close-menu");
}

function hideMenu(event) {
    if (!event.target.classList.contains("js-hamburger-menu") &&
        !event.target.classList.contains("js-hamburger-line") && 
        mainMenu.classList.contains("menu-d-flex")) {

        mainMenu.classList.remove("menu-d-flex");
        animateHamburgerMenu();
    }
    
}

hamburgerMenu.addEventListener("click", toggleMenu);
hamburgerMenu.addEventListener("click", animateHamburgerMenu);
window.addEventListener("click", hideMenu);