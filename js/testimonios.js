//LLamando a la data 
import testimonios from "../data/testimonios.js";

//Llamando a los elmentos del HTML que se van a manipular
const logo = document.getElementById("logo");
const corazon = document.getElementById("heart");
const fechaHoy = document.getElementById("fecha");
const hora = document.getElementById("hora");
const filaDeTestimonios = document.getElementById("fila-testimonios");

//Llamando al constructor de fecha
let fecha = new Date();

//Creando función parar cambiar el color del logo aleatoriamente
const cambiarColorTitulo = () => {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);

    logo.style.color = `rgb(${r},${g},${b})`;
    setTimeout(cambiarColorTitulo, 1000);
}

//Creando función parar mostrar los testimonios en el documento
const mostrarTestimonios = (testimonios) => {
    let testimoniosArr = testimonios.map(testimonio => {
        return `
            <div class="col-md-4">
            <div class="card p-3 text-center px-4">
                <div class="user-image"> 
                    <img class="img-user" src=${testimonio.imagen} class="rounded-circle">
                </div>
                <div class="user-content">
                    <h5 class="mb-0">${testimonio.nombre} ${testimonio.apellidos}</h5> 
                    <span>${testimonio.sitio}</span>
                    <p class="mt-4 small">${testimonio.opinion}</p>
                </div>
               <div> ${Number.isInteger(testimonio.calificacion)
                ? "<span class='fa fa-star active-star'></span>".repeat(testimonio.calificacion)
                : "<span class='fa fa-star active-star'></span>".repeat(testimonio.calificacion)
                + "<span class='fas fa-star-half-alt active-star'></span>"} 
                </div>
            </div>     
        </div>    
           `;
    });
    testimoniosArr = testimoniosArr.join("");
    filaDeTestimonios.innerHTML = testimoniosArr;
}

//Creando función para concatenar 0 cuando el número es < a 10
const formatear = (n) => (n < 10 ? "0" : "") + n;

// Creando función para mostrar la fecha actual
const mostrarFecha = () => {
    let d = fecha.getDate();
    let m = formatear(fecha.getMonth() + 1);
    let y = fecha.getFullYear();

    fechaHoy.innerHTML = `Fecha: ${d}/${m}/${y}`;
}

// Creando función para mostrar la hora
const mostrarHora = () => {
    let ms = Date.now();
    let segundos = ms / 1000;

    let h = formatear(new Date(ms).getHours());
    let m = formatear(Math.floor((segundos % 3600) / 60));
    let s = formatear(Math.floor(segundos % 60));

    hora.innerHTML = `Hora: ${h}:${m}:${s}`;
}

//Agregando intervalo para que la funcion mostrarHora se repita cada segundo
const repetirCadaSegundo = () => {
    setInterval(mostrarHora, 1);
}

// Creando función para desvanecer corazon 
const aparecer = () => {
    corazon.style.opacity = "0";
    corazon.style.transition = "all 1s ease";
    setTimeout(desaparecer, 1000);
}

const desaparecer = () => {
    corazon.style.opacity = "1";
    corazon.style.transition = "all 1s ease";
    setTimeout(aparecer, 1000);
}

// Llamando funciones para que se ejecuten cuando la pagina cargue
window.addEventListener("DOMContentLoaded", () => {
    cambiarColorTitulo();
    mostrarTestimonios(testimonios);
    mostrarFecha();
    repetirCadaSegundo();
    aparecer();
})