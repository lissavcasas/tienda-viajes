//Llamando a los elmentos del HTML que se van a manipular
const logo = document.getElementById("logo");
const fechaHoy = document.getElementById("fecha");
const hora = document.getElementById("hora");

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


// Llamando funciones para que se ejecuten cuando la pagina cargue
window.addEventListener("DOMContentLoaded", () => {
    cambiarColorTitulo();
    mostrarFecha();
    repetirCadaSegundo();
})