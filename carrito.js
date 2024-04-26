// Array para almacenar los productos en el carrito
let carrito = [];

// Lista de productos disponibles (nombre, precio, imagen, categoría)
const productos = [
    {
        nombre: 'Computador',
        precio: 20,
        imagen: 'assets/img/computer.jpg',
        categoria: 'electronica'
    },
    {
        nombre: 'Teléfono',
        precio: 15,
        imagen: 'assets/img/computer.jpg',
        categoria: 'electronica'
    },
    {
        nombre: 'Perro 2x1',
        precio: 15,
        imagen: 'https://th.bing.com/th/id/OIP.XK7NNIsXhKiQTPFC6SBTTAHaEK?rs=1&pid=ImgDetMain',
        categoria: 'comida'
    },
    {
        nombre: 'Salchipapas normales',
        precio: 5,
        imagen: 'https://th.bing.com/th/id/OIP.ZFtARvT4bPbrLFtHMbkt3AHaE7?pid=ImgDet&rs=1',
        categoria: 'comida'
    },
    {
        nombre: 'Jugo de naranja',
        precio: 3,
        imagen: 'https://th.bing.com/th/id/OIP.2ujH6RRSPj9nDw6r8JgYzwHaE8?pid=ImgDet&rs=1',
        categoria: 'bebidas'
    },
    {
        nombre: 'Jugo de piña',
        precio: 3,
        imagen: 'https://th.bing.com/th/id/OIP.7EZHRaFxyD5aJj8v1V4apwHaE8?pid=ImgDet&rs=1',
        categoria: 'bebidas'
    }
    // Puedes agregar más productos aquí si lo deseas
];

// Función para crear los elementos HTML de los productos agrupados por categoría
function crearProductos() {
    // Categorías disponibles
    const categorias = ['comida', 'bebidas', 'electronica'];
    
    // Itera sobre cada categoría
    categorias.forEach(categoria => {
        // Encuentra el contenedor correspondiente a la categoría
        const contenedor = document.getElementById(categoria);
        
        // Filtra los productos por categoría y crea los elementos HTML
        productos.filter(producto => producto.categoria === categoria)
            .forEach((producto, index) => {
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
                            <button class="btn btn-sm btn-warning" onclick="agregarAlCarrito('${producto.nombre}', ${producto.precio}, '${categoria}', ${index})">Agregar al carrito</button>
                        </div>
                        <div class="botones" style="display: none;">
                            <button class="btn btn-sm btn-warning" onclick="disminuirCantidad('${producto.nombre}', '${categoria}', ${index})">-</button>
                            <span id="cantidad-producto-${categoria}-${index}">0</span>
                            <button class="btn btn-sm btn-warning" onclick="agregarAlCarrito('${producto.nombre}', ${producto.precio}, '${categoria}', ${index})">+</button>
                        </div>
                    </div>
                `;
                contenedor.appendChild(productoDiv);
            });
    });
}

// Ejecutar la función para crear los productos en la página
crearProductos();

// Función para agregar un producto al carrito
function agregarAlCarrito(nombre, precio, categoria, index) {
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
    actualizarBotones(nombre, categoria, index);
    mostrarCantidadProducto(nombre, categoria, index);
    mostrarCarrito();
}

// Función para disminuir la cantidad de un producto en el carrito
function disminuirCantidad(nombre, categoria, index) {
    const producto = carrito.find(p => p.nombre === nombre);
    
    if (producto) {
        producto.cantidad--;
        if (producto.cantidad === 0) {
            // Elimina el producto si la cantidad llega a 0
            carrito = carrito.filter(p => p.nombre !== nombre);
        }
        // Llama a mostrar la cantidad y actualizar botones
        mostrarCantidadProducto(nombre, categoria, index);
        actualizarBotones(nombre, categoria, index);
        // Actualiza el carrito
        mostrarCarrito();
    }
}

// Función para quitar un producto del carrito
function quitarProducto(nombre, categoria, index) {
    // Elimina el producto del carrito
    carrito = carrito.filter(p => p.nombre !== nombre);
    
    // Actualiza los botones de cantidad y la cantidad del producto
    mostrarCantidadProducto(nombre, categoria, index);
    actualizarBotones(nombre, categoria, index);
    
    // Actualiza el carrito
    mostrarCarrito();
}

// Función para mostrar la cantidad agregada de un producto
function mostrarCantidadProducto(nombre, categoria, index) {
    const producto = carrito.find(p => p.nombre === nombre);
    const cantidadSpan = document.getElementById(`cantidad-producto-${categoria}-${index}`);
    
    // Si el producto está en el carrito, actualiza el span con la cantidad
    if (producto) {
        cantidadSpan.textContent = producto.cantidad;
    } else {
        // Si el producto no está en el carrito, establece la cantidad en 0
        cantidadSpan.textContent = '0';
    }
}

// Función para actualizar la visualización de los botones de acuerdo a la cantidad de productos
function actualizarBotones(nombre, categoria, index) {
    const producto = carrito.find(p => p.nombre === nombre);
    
    // Busca los elementos HTML del producto
    const productoDiv = document.getElementById(categoria).children[index];
    const agregarDiv = productoDiv.querySelector('.agregar');
    const botonesDiv = productoDiv.querySelector('.botones');
    
    // Muestra u oculta los botones según la cantidad del producto en el carrito
    if (!producto || producto.cantidad === 0) {
        // Muestra el botón de agregar al carrito si el producto no está en el carrito o su cantidad es cero
        agregarDiv.style.display = 'block';
        botonesDiv.style.display = 'none';
    } else {
        // Muestra los botones de cantidad si el producto está en el carrito
        agregarDiv.style.display = 'none';
        botonesDiv.style.display = 'block';
    }
}

// Función para mostrar el contenido del carrito
function mostrarCarrito() {
    const carritoDiv = document.getElementById('carrito');
    carritoDiv.innerHTML = '';

    carrito.forEach(producto => {
        const productoDiv = document.createElement('div');
        productoDiv.innerHTML = `
            <div class="border border-bottom border-dark"></div>
            <p class="text-dark mt-1 mb-n1">${producto.nombre} - $${producto.precio} x ${producto.cantidad}</p>
            <button class="btn btn-sm bg-dark" onclick="disminuirCantidad('${producto.nombre}', producto.categoria)">-</button>
            <button class="btn btn-sm btn-warning" onclick="agregarAlCarrito('${producto.nombre}', ${producto.precio})">+</button>
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
