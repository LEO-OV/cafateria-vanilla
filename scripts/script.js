const openMenu = document.querySelector(".open-menu");
const closeMenu = document.querySelector(".close-menu");
const navigation = document.querySelector(".navegacion");
const pageOverlay = document.querySelector("#page-overlay");
const navLinks = document.querySelectorAll(".navegacion__enlace");

// Controla la apertura y cierre del menú móvil.
function setMenuState(isOpen) {
    navigation.classList.toggle("is-open", isOpen);
    document.body.classList.toggle("menu-open", isOpen);
    openMenu.setAttribute("aria-expanded", String(isOpen));
    pageOverlay.hidden = !isOpen;
}

openMenu.addEventListener("click", () => setMenuState(true));
closeMenu.addEventListener("click", () => setMenuState(false));
pageOverlay.addEventListener("click", () => setMenuState(false));

navLinks.forEach((link) => {
    link.addEventListener("click", () => setMenuState(false));
});

window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        setMenuState(false);
    }
});

window.addEventListener("resize", () => {
    if (window.innerWidth > 860) {
        setMenuState(false);
    }
});

const menuButtons = document.querySelectorAll(".menu__opcion");
const menuTrack = document.querySelector(".menu__contenedor");
const menuGroups = document.querySelectorAll(".menu__grupo");
const prevButton = document.querySelector(".pre-btn");
const nextButton = document.querySelector(".nxt-btn");
let activeMenuIndex = 0;

// Actualiza el carrusel del menú y marca la categoría activa.
function updateMenu(index) {
    activeMenuIndex = (index + menuGroups.length) % menuGroups.length;
    menuTrack.style.transform = `translateX(-${activeMenuIndex * 100}%)`;

    menuButtons.forEach((button, buttonIndex) => {
        const isActive = buttonIndex === activeMenuIndex;
        button.classList.toggle("active", isActive);
        button.setAttribute("aria-selected", String(isActive));
    });

    menuGroups.forEach((group, groupIndex) => {
        group.setAttribute("aria-hidden", String(groupIndex !== activeMenuIndex));
    });
}

menuButtons.forEach((button) => {
    button.addEventListener("click", () => {
        updateMenu(Number(button.dataset.menuTarget));
    });
});

prevButton.addEventListener("click", () => updateMenu(activeMenuIndex - 1));
nextButton.addEventListener("click", () => updateMenu(activeMenuIndex + 1));

updateMenu(0);

const form = document.querySelector(".formulario");
const formStatus = document.querySelector(".formulario__status");

// Evita el envío real del formulario y muestra una respuesta simple.
form.addEventListener("submit", (event) => {
    event.preventDefault();
    form.reset();
    formStatus.textContent = "Gracias por escribirnos. Te responderemos pronto.";
});
