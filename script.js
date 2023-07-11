const productos = [
  {
    imagen: "img/juguetes.jpg",
    nombre: "Campanilla loro",
    categoria: "Juguetes",
    precio: 6000
  },
  {
    imagen: "img/juguetes-2.jpg",
    nombre: "Pelota con sonido",
    categoria: "Juguetes",
    precio: 15000
  },
  {
    imagen: "img/comederos.jpg",
    nombre: "Comedero",
    categoria: "Juguetes",
    precio: 50000
  },
  {
    imagen: "img/higiene.jpg",
    nombre: "Regadera perro",
    categoria: "Cuidado",
    precio: 60000
  },
  {
    imagen: "img/higiene-2.jpg",
    nombre: "Jabon antipulgas",
    categoria: "Cuidado",
    precio: 13000
  },
  {
    imagen: "img/limpieza.jpg",
    nombre: "Cepillo suave",
    categoria: "Cuidado",
    precio: 19000
  },
  {
    imagen: "img/paseo.jpg",
    nombre: "Correa larga",
    categoria: "Paseo",
    precio: 30000
  },
  {
    imagen: "img/descanso.jpg",
    nombre: "Cama artesanal",
    categoria: "Paseo",
    precio: 14.99
  },
  {
    imagen: "img/descanso-2.jpg",
    nombre: "Cama pequeña",
    categoria: "Paseo",
    precio: 20000
  }
];

const contenedorTarjetas = document.getElementById("tarjeta-productos")
const filtroInput = document.getElementById("filtro")
const popup = document.getElementById("popup")
const popupMessage = document.getElementById("popup-message")
const listaProductos = document.getElementById("lista-productos")
const cantidadProductos = document.getElementById("cantidad-productos")
const sumaTotal = document.getElementById("suma-total");
const vaciarCarrito = document.getElementById("vaciar-carrito")
const finalizarCompra = document.getElementById("finalizar-compra")
const productosAgregados = [];

let totalProductos = 0
let totalPrecio = 0

// Generar tarjetas de productos
productos.forEach(function(producto) {
    const tarjeta = document.createElement("div");
    tarjeta.className = "tarjeta"

    const imagen = document.createElement("img");
    imagen.src = producto.imagen
    tarjeta.appendChild(imagen)

    const nombre = document.createElement("h3");
    nombre.textContent = producto.nombre
    tarjeta.appendChild(nombre)

    const categoria = document.createElement("p")
    categoria.innerHTML = "<span>Categoría:</span> " + producto.categoria;
    tarjeta.appendChild(categoria)

    const precio = document.createElement("p")
    precio.innerHTML = "<span>Precio:</span> $" + producto.precio.toFixed(0);
    tarjeta.appendChild(precio)

    const botonAgregar = document.createElement("button");
    botonAgregar.textContent = "Agregar"
    tarjeta.appendChild(botonAgregar)

    botonAgregar.addEventListener("click", function() {
        agregarProducto(producto)
        actualizarContadorCarro()
        mostrarPopup("Producto agregado")
    });

    contenedorTarjetas.appendChild(tarjeta)
});

// Función para mostrar el popup con el mensaje
function mostrarPopup(mensaje) {
    popupMessage.textContent = mensaje;
    popup.style.display = "block"

    // Desaparecer el popup después de 3 segundos
    setTimeout(function() {
        popup.style.display = "none"
    }, 3000);
}

// Función para agregar un producto a la lista de productos agregados
function agregarProducto(producto) {
    productosAgregados.push(producto)
    totalProductos++;
    totalPrecio += producto.precio

    // Actualizar la lista de productos en HTML
    const itemLista = document.createElement("li");
    itemLista.textContent = producto.nombre
    listaProductos.appendChild(itemLista)

    // Actualizar la cantidad de productos en HTML
    cantidadProductos.textContent = "Cantidad de productos agregados: " + totalProductos

    // Actualizar la suma total del precio en HTML
    sumaTotal.textContent = "Suma total: $" + totalPrecio.toFixed(0)
}

// Función para vaciar el carrito
vaciarCarrito.addEventListener("click", function() {
    productosAgregados.length = 0
    totalProductos = 0
    totalPrecio = 0
    actualizarContadorCarro ()
    

    // Limpiar la lista de productos en HTML
    listaProductos.innerHTML = "";

    // Actualizar la cantidad de productos en HTML
    cantidadProductos.textContent = "Cantidad de productos agregados: " + totalProductos;

    // Actualizar la suma total del precio en HTML
    sumaTotal.textContent = "Suma total: $" + totalPrecio.toFixed(2);
});

// Función para finalizar la compra
finalizarCompra.addEventListener("click", function() {
    mostrarPopup("Compra finalizada, pronto recibirás toda la información en tu email");
});

// Función para filtrar los productos
function filtrarProductos() {
    const textoFiltro = filtroInput.value.toLowerCase()
    const productosFiltrados = productos.filter(function(producto) {
        const nombre = producto.nombre.toLowerCase()
        const categoria = producto.categoria.toLowerCase()
        return nombre.includes(textoFiltro) || categoria.includes(textoFiltro)
    });

    // Limpiar el contenedor de tarjetas
    contenedorTarjetas.innerHTML = ""

    // Generar las tarjetas de los productos filtrados
    productosFiltrados.forEach(function(producto) {
        const tarjeta = document.createElement("div")
        tarjeta.className = "tarjeta"

        const imagen = document.createElement("img")
        imagen.src = producto.imagen;
        tarjeta.appendChild(imagen);

        const nombre = document.createElement("h3")
        nombre.textContent = producto.nombre;
        tarjeta.appendChild(nombre);

        const categoria = document.createElement("p")
        categoria.innerHTML = "<span>Categoría:</span> " + producto.categoria;
        tarjeta.appendChild(categoria);

        const precio = document.createElement("p")
        precio.innerHTML = "<span>Precio:</span> $" + producto.precio.toFixed(0);
        tarjeta.appendChild(precio);

        const botonAgregar = document.createElement("button");
        botonAgregar.textContent = "Agregar"
        tarjeta.appendChild(botonAgregar)

      

        contenedorTarjetas.appendChild(tarjeta)
    });
}
// Función para mostrar el carrito
const popupCarro = document.getElementById("popupcarro")
const botonCarrito = document.getElementById("boton-carrito")
botonCarrito.addEventListener("click", function() {
    popupCarro.classList.add("visible")
});

const botoncerrarCarro = document.getElementById("cerrar-carro")
botoncerrarCarro.addEventListener("click", function() {
    popupCarro.classList.remove("visible")
});

function actualizarContadorCarro () {
  const cantidadCarrito = document.getElementById("contador-productos");
  cantidadCarrito.textContent = productosAgregados.length;
}




// Evento para el input de filtro
filtroInput.addEventListener("input", filtrarProductos)
