
// Llamando a los elmentos del HTML que se van a manipular
const logo = document.getElementById("logo");
const fechaHoy = document.getElementById("fecha");
const hora = document.getElementById("hora");
const foto = document.getElementById("foto");
const nombre = document.getElementById("nombre");
const descripcion = document.getElementById("descripcion");
const fb = document.getElementById("fb");
const correo = document.getElementById("correo");
const linkedin = document.getElementById("linkedin");
const cards = document.getElementsByClassName("card");

//Llamando al constructor de fecha
let fecha = new Date();

// Creando arreglos e inicializando data
const imagenes = new Array("../img/majo.jpeg", "../img/meli.jpeg", "../img/kelly.jpeg", "../img/alberto.jpeg", "../img/jose.jpeg",
);
const nombres = new Array("María José Nuñez", "Melissa Casas", "Kelly Dionisio", "Luis Alberto Medina", "José Sánchez"
);
const descripciones = new Array(
    "Tengo 34 años y soy estudiando de Computación e Informática. Me gusta el diseño y la experiencia del usuario, siempre busco exceder las expectativas.", "Tengo 28 años. Soy Front End Developer. Me apasiona programar y me interesa seguir aprendiendo para fortalecer mis habilidades técnicas.",
    "Tengo 40 años y soy estudiante de Computacion e Informatica,los obstáculos que he enfrentado en mi vida profesional me han impulsado a desarrollar mis fortalezas. ",
    "Tengo 28 años.Soy estudiante de Computación e Informática en Cibertec.Me gusta el trabajo en equipo y dar siempre el 100 % para lograr los objetivos.", "Tengo 28 años. Soy estudiante de Computación e Informática en Cibertec. Me gusta el trabajo en equipo e investigar diferentes tecnologías para estar actualizado en el ámbito tecnológico.");
const fbLinks = new Array(
    "https://www.facebook.com/majondpg", "hhttps://www.facebook.com/maryland.casas", "https://www.facebook.com/kdionisioz/",
    "https://www.facebook.com/LuizaLberToOX/", "https://www.facebook.com/jose.sanchezrivas.33");
const correoLinks = new Array(
    "mailto:majonunezdelprado@gmail.com", "mailto:marimel.casas@gmail.com", "mailto:kellyroxana23911@gmail.com",
    "mailto:alberto.medina.quispe@gmail.com", "mailto:juanes7563@gmail.com");
const linkedinLinks = new Array(
    "https://www.linkedin.com/in/majonupragu/", "https://www.linkedin.com/in/melissa-casas/", "https://www.linkedin.com/in/kelly-roxana-dionisio-zu%C3%B1e-60a300127/",
    "www.linkedin.com/in/luis-alberto-medina-quispe-4781b7177", "https://www.linkedin.com/in,");

const mostrarImagen = (rutaImg) => {
    foto.style.backgroundImage = `url(${rutaImg})`;
    foto.style.backgroundRepeat = "no-repeat";
    foto.style.backgroundPosition = "center center";
    foto.style.backgroundSize = "cover";
}

const mostrarTexto = (nom, desc) => {
    nombre.textContent = nom;
    descripcion.textContent = desc;

}

const mostrarRS = (rutaFb, rutaCorreo, rutaLinkedin) => {
    fb.href = rutaFb;
    correo.href = rutaCorreo;
    linkedin.href = rutaLinkedin;
}

/* Invocacion fotos */

const rad1 = () => {
    mostrarImagen(`${imagenes[0]}`);
    mostrarTexto(nombres[0], descripciones[0]);
    mostrarRS(fbLinks[0], correoLinks[0], linkedinLinks[0]);
}

const rad2 = () => {
    mostrarImagen(`${imagenes[1]}`);
    mostrarTexto(nombres[1], descripciones[1]);
    mostrarRS(fbLinks[1], correoLinks[1], linkedinLinks[1]);
}

const rad3 = () => {
    mostrarImagen(`${imagenes[2]}`);
    mostrarTexto(nombres[2], descripciones[2]);
    mostrarRS(fbLinks[2], correoLinks[2], linkedinLinks[2]);
}

const rad4 = () => {
    mostrarImagen(`${imagenes[3]}`);
    mostrarTexto(nombres[3], descripciones[3]);
    mostrarRS(fbLinks[3], correoLinks[3], linkedinLinks[3]);
}

const rad5 = () => {
    mostrarImagen(`${imagenes[4]}`);
    mostrarTexto(nombres[4], descripciones[4]);
    mostrarRS(fbLinks[4], correoLinks[4], linkedinLinks[4]);
}

//Creando función para dar efecto a los cards
const zoomin = (e) => {
    e.style.transform = "scale(1.2)";
    e.style.transition = "all 2s ease-in-out";
}

const zoomout = (e) => {
    e.style.transform = "scale(1.0)";
    e.style.transition = "all 2s ease-in-out";
}

for (var i = 0; i < cards.length; i++) {
    cards[i].setAttribute("onmouseover", "zoomin(this)");
    cards[i].setAttribute("onmouseout", "zoomout(this)");
}


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
    rad1();
    cambiarColorTitulo();
    mostrarFecha();
    repetirCadaSegundo();
})