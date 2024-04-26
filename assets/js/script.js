// Array para almacenar los productos en el carrito
let carrito = [];

// Lista de productos disponibles (nombre, precio, imagen, categoría)
const productos = [
    {
        nombre: 'EL GOLIAT',
        precio: 25000,
        imagen: 'assets/img/product/perro1.jpg'
    },
    {
        nombre: 'EL REDENTOR',
        precio: 15000,
        imagen: 'assets/img/product/perro2.jpg'
    },
    {
        nombre: 'EL MESÍAS',
        precio: 15000,
        imagen: 'assets/img/product/perro3.jpg'
    },
    // Puedes agregar más productos aquí si lo deseas
];

// Cargar el carrito desde `localStorage`
function cargarCarrito() {
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
    }
}

// Guardar el carrito en `localStorage`
function guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Llamar a cargarCarrito al inicio para recuperar el carrito desde `localStorage`
cargarCarrito();

// Ejecutar la función para crear los productos en la página
crearProductos();

// Después de cargar el carrito, actualizar la interfaz de usuario
mostrarCarrito(); // Muestra el contenido del carrito
actualizarTodosLosBotones(); // Actualiza todos los botones de cantidad

// Función para crear los elementos HTML de los productos
function crearProductos() {
    const productosDiv = document.getElementById('productos');
    productos.forEach((producto, index) => {
        const productoDiv = document.createElement('div');
        productoDiv.classList.add('col-lg-4', 'text-center');
        productoDiv.innerHTML = `
            <div class="card mb-3 boton py-2">
                <div class="d-flex align-items-center my-auto">
                    <div class="author">
                        <img src="${producto.imagen}" alt="${producto.nombre}" class="border-radius-lg shadow ms-2" style="width: 120px; height: 120px;">
                    </div>
                    <div class="text-start ms-2">
                        <p class="text-dark font-weight-bold mb-0">${producto.nombre}</p>
                        <span class="text-sm">descripcion</span>
                        <p class="text-success">$ ${producto.precio}</p>
                        <div class="agregar mt-n3">
                            <button class="btn btn-sm btn-warning" onclick="agregarAlCarrito('${producto.nombre}', ${producto.precio})">Agregar al carrito</button>
                        </div>
                        <div class="botones mt-n3" style="display: none;">
                            <button class="btn btn-sm btn-warning" onclick="disminuirCantidad('${producto.nombre}')">-</button>
                            <button class="btn btn-sm" id="cantidad-producto-${index}">0</button>
                            <button class="btn btn-sm btn-warning" onclick="agregarAlCarrito('${producto.nombre}', ${producto.precio})">+</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        productosDiv.appendChild(productoDiv);
        // Llamar a mostrar la cantidad de los productos al crearlos
        mostrarCantidadProducto(producto.nombre);
    });
}

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

    // Guardar el carrito en `localStorage`
    guardarCarrito();

    // Muestra u oculta los botones y actualiza la cantidad del producto
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
        
        // Guardar el carrito en `localStorage`
        guardarCarrito();
        
        // Actualizar los botones y cantidad del producto
        actualizarBotones(nombre);
        mostrarCantidadProducto(nombre);
        mostrarCarrito();
    }
}

// Función para quitar un producto del carrito
function quitarProducto(nombre) {
    // Elimina el producto del carrito
    carrito = carrito.filter(p => p.nombre !== nombre);
    
    // Guardar el carrito en `localStorage`
    guardarCarrito();
    
    // Actualizar los botones y cantidad del producto
    actualizarBotones(nombre);
    mostrarCantidadProducto(nombre);
    
    // Actualiza el carrito
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

    // Variable para acumular el total
    let total = 0;

    // Itera sobre los productos en el carrito
    carrito.forEach(producto => {
        // Calcula el subtotal para el producto
        const subtotal = producto.precio * producto.cantidad;
        
        // Acumula el subtotal en el total
        total += subtotal;

        // Crea un div para mostrar el producto en el carrito
        const productoDiv = document.createElement('div');
        productoDiv.innerHTML = `
            <div class="border border-bottom border-dark"></div>
            <p class="text-dark mt-1 mb-n1">${producto.nombre} - $${producto.precio} x ${producto.cantidad} = $${subtotal.toFixed(2)}</p>
            <button class="btn btn-sm bg-dark" onclick="disminuirCantidad('${producto.nombre}')">-</button>
            <button class="btn btn-sm btn-warning" onclick="agregarAlCarrito('${producto.nombre}', ${producto.precio})">+</button>
            <button class="btn btn-sm btn-danger" onclick="quitarProducto('${producto.nombre}')">Quitar</button>
        `;
        carritoDiv.appendChild(productoDiv);
    });

    // Muestra el total de todos los productos en el carrito
    const totalDiv = document.createElement('div');
    totalDiv.innerHTML = `
        <div class="border border-bottom border-dark"></div>
        <p class="text-dark mt-1 mb-n1">Total: $${total.toFixed(2)}</p>
    `;
    carritoDiv.appendChild(totalDiv);
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
