//LLamando a la data 
import paquetes from "../data/paquetes.js";

//Llamando a los elmentos del HTML que se van a manipular
const logo = document.getElementById("logo");
/* const carrusel = document.getElementById("carrusel"); */
const fechaHoy = document.getElementById("fecha");
const hora = document.getElementById("hora");
const filaDePaquetes = document.getElementById("paquetes-fila");
const botonesFiltro = document.querySelectorAll(".filter-btn");
const buscador = document.getElementById("buscador");
const cajasSeleccion = document.querySelectorAll(".filter-punt");
const rango = document.getElementById("rango");
const numeroRango = document.getElementById("numeroRango");
const btnOrdenarAsc = document.getElementById("btn-ordenar-asc");
const btnOrdenarDesc = document.getElementById("btn-ordenar-desc");
const btnOrdenarPrecioAsc = document.getElementById("btn-ordenar-precio-asc");
const btnOrdenarPrecioDesc = document.getElementById("btn-ordenar-precio-desc");


//Llamando al constructor de fecha
let fecha = new Date();

//Inicializando variables
let contador = 0;
let textoIngresado = "";

// Creando función parar cambiar el color del logo aleatoriamente
const cambiarColorTitulo = () => {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);

    logo.style.color = `rgb(${r},${g},${b})`;
    setTimeout(cambiarColorTitulo, 1000);
}

// Creando función para armar carrusel de imágenes
/* const cargarCarrusel = () => {
    contador++;
    if (contador > 3) contador = 1;
    carrusel.setAttribute("src", "../img/banner" + contador + ".jpg");
    setTimeout(cargarCarrusel, 3000);
} */

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

//Creando función para mostrar los paquetes en el documento
const mostrarPaquetes = (paquetes) => {
    let paquetesArr = paquetes.map(paquete => {
        return `
                <div class="col-lg-3 col-md-4 col-sm-6 col-8 mx-auto">
                    <div class="card">
                        <img src=${paquete.imagen} alt=${paquete.nombre} class="card-img-top img-fluid">
                            <div class="card-body">
                                <h5>${paquete.nombre}</h5>
                                <p>${paquete.partida}</p>
                                <p>${paquete.destino}</p>
                                <p>${paquete.paquete}</p>
                                <p >${paquete.precio}</p>
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
    filaDePaquetes.innerHTML = paquetesArr;
}

//Creando función para filtrar resultados según la región usando botones
const filtrarPaqPorRegion = () => {
    botonesFiltro.forEach(btn => {
        btn.addEventListener("click", (e) => {
            const nombreBtn = e.currentTarget.dataset.region;
            const paquetesFiltrados = paquetes.filter(paquete => {
                if (paquete.region === nombreBtn) {
                    return paquete;
                }
            });

            if (nombreBtn === "Todos") {
                mostrarPaquetes(paquetes);
            } else {
                mostrarPaquetes(paquetesFiltrados);
            }
        });
    });
}

//Creando función para filtrar resultados según el texto ingresado en el buscador
const buscarPaquete = () => {
    buscador.addEventListener("keyup", () => {
        textoIngresado = buscador.value.toUpperCase();
        const paqueteEncontrado = paquetes.filter(paquete => {
            if (paquete.nombre.toUpperCase().indexOf(textoIngresado) > -1) {
                return paquete;
            }
        })
        mostrarPaquetes(paqueteEncontrado);
    })
}

//Creando función para filtrar resultados por calificación del paquete
const filtrarPaqPorPuntuacion = () => {
    cajasSeleccion.forEach(btn => {
        btn.addEventListener("click", (e) => {
            const nombreBtn = e.currentTarget.dataset.puntuacion;
            //console.log(nombreBtn);
            const paquetesFiltrados = paquetes.filter(paquete => {
                if (paquete.puntuacion == nombreBtn) {
                    return paquete;
                }
            });

            if (nombreBtn === "All") {
                mostrarPaquetes(paquetes);
            } else {
                mostrarPaquetes(paquetesFiltrados);
            }
        });
    });
}

//Creando función para filtrar resultados por rango de precio
const filtrarPaqPorPrecio = () => {
    rango.addEventListener("input", () => {
        let valor = rango.value;
        numeroRango.innerHTML = valor;
        const paquetesFiltrados = paquetes.filter(paquete => {
            if (paquete.precio <= valor) {
                return paquete;
            }
        })
        mostrarPaquetes(paquetesFiltrados);
    })

}

//Creando función para ordenar resultados de forma ASC por nombre
const ordenarporNombreAsc = (a, b) => {
    if (a.nombre < b.nombre)
        return -1;
    if (a.nombre > b.nombre)
        return 1;
    return 0;
};

//Creando función para ordenar resultados de forma DESC por nombre
const ordenarporNombreDesc = (a, b) => {
    if (a.nombre > b.nombre)
        return -1;
    if (a.nombre < b.nombre)
        return 1;
    return 0;
};

//Escuchando el evento click del btn y llamando función para ordenar de forma ASC 
btnOrdenarAsc.addEventListener("click", () => {
    let ordenadoAsc = [...paquetes].sort(ordenarporNombreAsc);
    mostrarPaquetes(ordenadoAsc);
});

//Escuchando el evento click del btn y llamando función para ordenar de forma DESC
btnOrdenarDesc.addEventListener("click", () => {
    let ordenadoDesc = [...paquetes].sort(ordenarporNombreDesc);
    mostrarPaquetes(ordenadoDesc);
});

//Escuchando el evento click del btn y llamando función para ordenar de forma ASC PRECIO 
btnOrdenarPrecioAsc.addEventListener("click", () => {
    let ordenadoAsc = [...paquetes].sort((a, b) => b.precio - a.precio);
    mostrarPaquetes(ordenadoAsc);
});
//Escuchando el evento click del btn y llamando función para ordenar de forma DESC PRECIO 
btnOrdenarPrecioDesc.addEventListener("click", () => {
    let ordenadoDesc = [...paquetes].sort((a, b) => a.precio - b.precio);
    mostrarPaquetes(ordenadoDesc);
});

// Llamando funciones para que se ejecuten cuando la pagina cargue
window.addEventListener("DOMContentLoaded", () => {
    cambiarColorTitulo();
    /*     cargarCarrusel(); */
    mostrarFecha();
    repetirCadaSegundo();
    mostrarPaquetes(paquetes);
    filtrarPaqPorRegion();
    filtrarPaqPorPuntuacion();
    filtrarPaqPorPrecio();
    buscarPaquete();
})