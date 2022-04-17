import paquetes from "../data/paquetes.js";

//Llamando a los elmentos del HTML que se van a manipular

const fechaHoy = document.getElementById("fecha");
const hora = document.getElementById("hora");
const carrusel = document.getElementById("carrusel1");
const filaDePaquetesOferta = document.getElementById("paquetes-fila-oferta");
const btnPrecioOfertaAsc = document.getElementById("btn-ordenar-precio-oferta-asc");
const btnPrecioOfertaDesc = document.getElementById("btn-ordenar-precio-oferta-desc");
//Llamando al constructor de fecha
let fecha = new Date();
let contador = 0;

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
const cargarCarrusel = () => {
    contador++;
    if (contador > 3) contador = 1;
    carrusel.setAttribute("src", "img/banner" + contador + ".jpg");
    setTimeout(cargarCarrusel, 3000);
}
//Creando función para mostrar los paquetes en el documento
const mostrarPaquetes = (paquetes) => {

    let paquetesArr = paquetes.map(paquete => {
        const imagen = paquete.imagen;
        return `
                <div class="col-lg-3 col-md-4 col-sm-6 col-8 mx-auto">
                    <div class="card">
                        <img src=.${imagen.substring(3, imagen.length)} alt=${paquete.nombre} class="card-img-top img-fluid">
                            <div class="card-body">
                                <h5>${paquete.nombre}</h5>
                                <p >${paquete.partida}</p>
                                <p>${paquete.destino}</p>
                                <p>${paquete.paquete}</p>
                                <p>${paquete.precio}</p>
                                <p> ${paquete.oferta == undefined
                ? "<p></p>"
                : "<h5><span class='badge bg-danger'>OFERTA</span></h5>"}</p>
                                <p>${"⭐".repeat(paquete.puntuacion)}</p> 
                                <button class="btn btn-dark" data-id="${paquete.id}" >Comprar</button>
                            </div>
                    </div>
                </div>
           `;
    })
    paquetesArr = paquetesArr.join("");
    filaDePaquetesOferta.innerHTML = paquetesArr;
}

// Creacion de funcion que muestra lospaquetes que estan en oferta
const filtrarPaqOferta = () => {
    const paquetesFiltrados = paquetes.filter(paquete => {
        if (paquete.oferta != undefined) {
            return paquete;
        }
    });

    mostrarPaquetes(paquetesFiltrados);

}

//Escuchando el evento click del btnPrecioOfertaAsc y llamando función para ordenar de forma ASC PRECIO   
btnPrecioOfertaAsc.addEventListener("click", (e) => {
    const paquetesFiltradoOferta = paquetes.filter(paquete => {
        if (paquete.oferta != undefined) {
            return paquete;
        }
    });
    let precioOfertaAsc = [...paquetesFiltradoOferta].sort((a, b) => b.precio - a.precio)
    mostrarPaquetes(precioOfertaAsc);
});

//Escuchando el evento click del btnPrecioOfertaDesc y llamando función para ordenar de forma DESC PRECIO   
btnPrecioOfertaDesc.addEventListener("click", (e) => {
    const paquetesFiltradoOfertaDesc = paquetes.filter(paquete => {
        if (paquete.oferta != undefined) {
            return paquete;
        }
    });
    let precioOfertaDesc = [...paquetesFiltradoOfertaDesc].sort((a, b) => a.precio - b.precio)
    mostrarPaquetes(precioOfertaDesc);
});

// Llamando funciones para que se ejecuten cuando la pagina cargue
window.addEventListener("DOMContentLoaded", () => {
    cambiarColorTitulo();
    mostrarFecha();
    repetirCadaSegundo();
    cargarCarrusel();
    filtrarPaqOferta();
})