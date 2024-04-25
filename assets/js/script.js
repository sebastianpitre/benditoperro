// Array para almacenar los productos en el carrito
let carrito = [];

// Lista de productos disponibles (nombre, precio e imagen)
const productos = [
    {
        nombre: 'Computador',
        precio: 20,
        imagen: 'assets/img/computer.jpg'
    },
    {
        nombre: 'Teléfono',
        precio: 15,
        imagen: 'assets/img/computer.jpg'
    },
    {
      nombre: 'perro 2x1',
      precio: 15,
      imagen: 'https://th.bing.com/th/id/OIP.XK7NNIsXhKiQTPFC6SBTTAHaEK?rs=1&pid=ImgDetMain'
  },
    // Agrega más productos aquí
];

// Función para crear los elementos HTML de los productos
function crearProductos() {
    const productosDiv = document.getElementById('productos');
    productos.forEach((producto, index) => {
        const productoDiv = document.createElement('div');
        productoDiv.classList.add('col-lg-4', 'mb-3', 'col-md-6', 'mx-md-auto');
        productoDiv.innerHTML = `
            <div class="p-3 card boton text-center">
                <div class="mx-auto">
                    <img class="icon-lg" src="${producto.imagen}" alt="${producto.nombre}">
                </div>
                <h5 class="mt-4">${producto.nombre}</h5>
                <p>$${producto.precio}</p>
                <div class="agregar">
                    <button onclick="agregarAlCarrito('${producto.nombre}', ${producto.precio})">Agregar al carrito</button>
                </div>
                <div class="botones" style="display: none;">
                    <button onclick="disminuirCantidad('${producto.nombre}')">-</button>
                    <span><span id="cantidad-producto-${index}">0</span></span>
                    <button onclick="agregarAlCarrito('${producto.nombre}', ${producto.precio})">+</button>
                    
                    
                </div>
            </div>
        `;
        productosDiv.appendChild(productoDiv);
    });
}

// Ejecutar la función para crear los productos en la página
crearProductos();

// Función para agregar un producto al carrito
function agregarAlCarrito(nombre, precio) {
    // Verifica si el producto ya está en el carrito
    const productoExistente = carrito.find(p => p.nombre === nombre);
    
    if (productoExistente) {
        // Si el producto ya está en el carrito, aumenta la cantidad
        productoExistente.cantidad++;
    } else {
        // Si el producto no está en el carrito, agrégalo
        carrito.push({ nombre, precio, cantidad: 1 });
    }

    // Muestra o esconde los botones y actualiza la cantidad del producto
    actualizarBotones(nombre);
    mostrarCantidadProducto(nombre);
    mostrarCarrito();
}

// Función para disminuir la cantidad de un producto en el carrito
function disminuirCantidad(nombre) {
    const producto = carrito.find(p => p.nombre === nombre);
    
    if (producto) {
        producto.cantidad--;
        if (producto.cantidad === 0) {
            // Elimina el producto si la cantidad llega a 0
            carrito = carrito.filter(p => p.nombre !== nombre);
        }
        actualizarBotones(nombre);
        mostrarCantidadProducto(nombre);
        mostrarCarrito();
    }
}

// Función para quitar un producto del carrito
function quitarProducto(nombre) {
    carrito = carrito.filter(p => p.nombre !== nombre);
    actualizarBotones(nombre);
    mostrarCantidadProducto(nombre);
    mostrarCarrito();
}

// Función para mostrar la cantidad agregada de un producto
function mostrarCantidadProducto(nombre) {
    const producto = carrito.find(p => p.nombre === nombre);
    const index = productos.findIndex(p => p.nombre === nombre);
    const cantidadSpan = document.getElementById(`cantidad-producto-${index}`);
    
    // Si el producto está en el carrito, actualiza el span con la cantidad
    if (producto) {
        cantidadSpan.textContent = producto.cantidad;
    } else {
        // Si el producto no está en el carrito, establece la cantidad en 0
        cantidadSpan.textContent = '0';
    }
}

// Función para actualizar la visualización de los botones de acuerdo a la cantidad de productos
function actualizarBotones(nombre) {
    const producto = carrito.find(p => p.nombre === nombre);
    const index = productos.findIndex(p => p.nombre === nombre);
    const productoDiv = document.querySelectorAll('.boton')[index];
    const agregarDiv = productoDiv.querySelector('.agregar');
    const botonesDiv = productoDiv.querySelector('.botones');
    
    // Si el producto no está en el carrito o su cantidad es cero, muestra el botón de agregar al carrito
    if (!producto || producto.cantidad === 0) {
        botonesDiv.style.display = 'none';
        agregarDiv.style.display = 'block';
    } else {
        // Si el producto está en el carrito, muestra los botones de cantidad
        botonesDiv.style.display = 'block';
        agregarDiv.style.display = 'none';
    }
}

// Función para mostrar el contenido del carrito
function mostrarCarrito() {
    const carritoDiv = document.getElementById('carrito');
    carritoDiv.innerHTML = '';

    carrito.forEach(producto => {
        const productoDiv = document.createElement('div');
        productoDiv.innerHTML = `
            <p class="text-white mt-1 mb-n1">${producto.nombre} - $${producto.precio} x ${producto.cantidad}</p>
            
            <button class="btn btn-sm bg-gray-100" onclick="disminuirCantidad('${producto.nombre}')">-</button>
            <button class="btn btn-sm btn-info" onclick="agregarAlCarrito('${producto.nombre}', ${producto.precio})">+</button>
            <button class="btn btn-sm btn-danger" onclick="quitarProducto('${producto.nombre}')">Quitar</button>
        `;
        carritoDiv.appendChild(productoDiv);
    });
}

// Función para finalizar la compra y redirigir a WhatsApp
function finalizarCompra() {
    const numeroTelefono = '+573136615861'; // Reemplaza este número con el deseado

    let mensaje = '*¡Hola! Me gustaría comprar los siguientes productos:*\n\n';
    
    // Itera sobre el carrito y crea el mensaje
    carrito.forEach((producto, index) => {
        mensaje += `${index + 1}. ${producto.nombre} - $${producto.precio} x ${producto.cantidad}\n`;
    });

    // Calcula el total
    const total = carrito.reduce((acum, producto) => acum + producto.precio * producto.cantidad, 0);
    mensaje += `\nTotal: $${total}`;
    
    // Genera la URL para redirigir a WhatsApp
    const url = `https://wa.me/${numeroTelefono}?text=${encodeURIComponent(mensaje)}`;
    window.location.href = url; // Redirige a WhatsApp
}
