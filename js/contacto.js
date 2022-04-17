//Llamando a los elmentos del HTML que se van a manipular
const logo = document.getElementById("logo");
const fechaHoy = document.getElementById("fecha");
const hora = document.getElementById("hora");
const formContacto = document.getElementById("formulario-contacto");
const errMsgs = document.getElementsByClassName("invalid-feedback");

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

//Function para obtener los valores del formulario 
const getInputVal = (id) => document.getElementById(id).value;;

// Nos permite deshabilitar el envio de datos para el boton enviar para poder hacer la validación
const submitForm = (e) => {
    e.preventDefault();

    if (!formContacto.checkValidity()) {
        formContacto.classList.add("was-validated");
        for (var i = 0; i < errMsgs.length; i++) {
            if (formContacto.classList != "was-validated") {
                errMsgs[i].style.display = "block";
            }
        }
    } else {
        //Obteniendo valores
        const asunto = getInputVal("subject");
        const nombre = getInputVal("name");
        const correo = getInputVal("email");
        const celular = getInputVal("cellphone");
        const mensaje = getInputVal("message");
        console.log(asunto, nombre, correo, celular, mensaje);

        alert("Correo enviado exitosamente");
        formContacto.reset();  //Limpiar formulario
        formContacto.classList.remove("was-validated");
        return false; // Previene que la pag se refresque
    }
};

formContacto.addEventListener("submit", submitForm);

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