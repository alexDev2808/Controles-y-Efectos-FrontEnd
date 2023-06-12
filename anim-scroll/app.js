const imagen1 = document.getElementById('img1');
const imagen2 = document.getElementById('img2');

const cargarImg = (entradas, observador) => {
    // console.log(entradas); // array
    // console.log(observador);

    entradas.forEach((entrada) => {
        if(entrada.isIntersecting) {
            entrada.target.classList.add('visible');
        } else {
            entrada.target.classList.remove('visible');
        }
    })
}

// Observer para vigilar las img         
const observer = new IntersectionObserver(cargarImg, {
    root: null,
    rootMargin: '0px 0px 0px 0px',
    threshold: 0.4
})

observer.observe(imagen1)
observer.observe(imagen2)