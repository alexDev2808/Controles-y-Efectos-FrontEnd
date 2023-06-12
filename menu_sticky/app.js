const menu = document.getElementById("menu");
const indicador = document.getElementById('indicador');
const secciones = document.querySelectorAll('.seccion');

let tamanioIndicador = menu.querySelector('a').offsetWidth;
indicador.style.width = tamanioIndicador + "px";

let indexSeccionActiva;

// Observer
const observer = new IntersectionObserver((entradas, observer) => {
    entradas.forEach(entrada => {
        if(entrada.isIntersecting) {

            indexSeccionActiva = [...secciones].indexOf(entrada.target)

            indicador.style.transform = `translateX(${tamanioIndicador * indexSeccionActiva}px)`;
        }
    })

}, {
    rootMargin: '-80px 0px 0px 0px',
    threshold: 0.4
});


// Observador para el hero
observer.observe(document.getElementById('hero'));


// Asignando un observer a cada una de las secciones
secciones.forEach(seccion => observer.observe(seccion))

// Evento para recalcular los cambios de tamaño de la pantalla
const onResize = () => {
    tamanioIndicador = menu.querySelector('a').offsetWidth;
    indicador.style.width = tamanioIndicador + 'px';
    indicador.style.transform = `translateX(${tamanioIndicador * indexSeccionActiva}px)`;
}

window.addEventListener('resize', onResize)