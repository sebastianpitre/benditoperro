// Array para almacenar los productos en el carrito
let carrito = [];

// Lista de productos disponibles con nombre, precio, imagen y categoría
const productos = [
    {
        nombre: 'Promo 2x1',
        precio: 18000,
        imagen: 'assets/img/product/no-imagen.jpg',
        descripcion: 'descipcion del producto',
        categoria: 'promos'
    },
    {
        nombre: 'Promo especial',
        precio: 25000,
        imagen: 'assets/img/product/no-imagen.jpg',
        descripcion: 'descipcion del producto',
        categoria: 'promos'
    },


    // Perros
    {
        nombre: 'EL GOLIAT',
        precio: 25000,
        imagen: 'assets/img/product/no-imagen.jpg',
        descripcion: 'descipcion del producto',
        categoria: 'perros'
    },
    {
        nombre: 'EL REDENTOR',
        precio: 15000,
        imagen: 'assets/img/product/no-imagen.jpg',
        descripcion: 'descipcion del producto',
        categoria: 'perros'
    },
    {
        nombre: 'EL MESÍAS',
        precio: 15000,
        imagen: 'assets/img/product/no-imagen.jpg',
        descripcion: 'descipcion del producto',
        categoria: 'perros'
    },
    {
        nombre: 'EL ARCA',
        precio: 15000,
        imagen: 'assets/img/product/no-imagen.jpg',
        descripcion: 'descipcion del producto',
        categoria: 'perros'
    },
    {
        nombre: 'EL BENDITO',
        precio: 8000,
        imagen: 'assets/img/product/no-imagen.jpg',
        descripcion: 'descipcion del producto',
        categoria: 'perros'
    },
    {
        nombre: 'GENESIS',
        precio: 5000,
        imagen: 'assets/img/product/no-imagen.jpg',
        descripcion: 'descipcion del producto',
        categoria: 'perros'
    },


    // HAMBURGUESAS
    {
        nombre: 'HAMBURGUESA GENESIS',
        precio: 10000,
        imagen: 'assets/img/product/no-imagen.jpg',
        descripcion: 'descipcion del producto',
        categoria: 'hamburguesas'
    },
    {
        nombre: '2 DE GENESIS',
        precio: 16000,
        imagen: 'assets/img/product/no-imagen.jpg',
        descripcion: 'descipcion del producto',
        categoria: 'hamburguesas'
    },

    // Salchipapas
    {
        nombre: 'LA GENESIS',
        precio: 10000,
        imagen: 'assets/img/product/no-imagen.jpg',
        descripcion: 'descipcion del producto',
        categoria: 'salchipapas'
    },
    {
        nombre: 'LA SANTA',
        precio: 13000,
        imagen: 'assets/img/product/no-imagen.jpg',
        descripcion: 'descipcion del producto',
        categoria: 'salchipapas'
    },
    {
        nombre: 'LA BENDITA',
        precio: 17000,
        imagen: 'assets/img/product/no-imagen.jpg',
        descripcion: 'descipcion del producto',
        categoria: 'salchipapas'

    },
    {
        nombre: 'LA BENDICIÓN',
        precio: 25000,
        imagen: 'assets/img/product/no-imagen.jpg',
        descripcion: 'descipcion del producto',
        categoria: 'salchipapas'
    },
    

    // Jugos
    {
        nombre: 'COCA COLA 1.5L',
        precio: 6000,
        imagen: 'assets/img/product/no-bebida.jpg',
        descripcion: 'descipcion del producto',
        categoria: 'jugos'
    },
    {
        nombre: 'POSTOBON 1L',
        precio: 4000,
        imagen: 'assets/img/product/no-bebida.jpg',
        descripcion: 'descipcion del producto',
        categoria: 'jugos'
    },
    {
        nombre: 'COCA COLA P400',
        precio: 3000,
        imagen: 'assets/img/product/no-bebida.jpg',
        descripcion: 'descipcion del producto',
        categoria: 'jugos'
    },
    {
        nombre: 'POSTOBON P400',
        precio: 3000,
        imagen: 'assets/img/product/no-bebida.jpg',
        descripcion: 'descipcion del producto',
        categoria: 'jugos'
    },
    {
        nombre: 'CUANTRO P400',
        precio: 3000,
        imagen: 'assets/img/product/no-bebida.jpg',
        descripcion: 'descipcion del producto',
        categoria: 'jugos'
    },
    {
        nombre: 'AGUA SABORISADA',
        precio: 2000,
        imagen: 'assets/img/product/no-bebida.jpg',
        descripcion: 'descipcion del producto',
        categoria: 'jugos'
    },
    {
        nombre: 'AGUA PEQUEÑA',
        precio: 1000,
        imagen: 'assets/img/product/no-bebida.jpg',
        descripcion: 'descipcion del producto',
        categoria: 'jugos'
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

// Ejecutar la función para crear los productos en la página cuando se carga
crearProductos();

// Después de cargar el carrito, actualizar la interfaz de usuario
mostrarCarrito();

// Función para crear los elementos HTML de los productos agrupados por categoría
function crearProductos() {
    // Define los divs para cada categoría
    let categorias = {
        promos: document.getElementById('promos'),
        hamburguesas: document.getElementById('hamburguesas'),
        salchipapas: document.getElementById('salchipapas'),
        perros: document.getElementById('perros'),
        jugos: document.getElementById('jugos')
        
    };

    // Itera sobre los productos y agrúpalos por categoría
    productos.forEach((producto, index) => {
        // Encuentra el div de la categoría del producto
        const categoriaDiv = categorias[producto.categoria];
        if (categoriaDiv) {
            // Crea un div para el producto
            const productoDiv = document.createElement('div');
            productoDiv.classList.add('col-lg-4', 'text-center');
            
            // Crea el HTML para el producto
            productoDiv.innerHTML = `
            <div class="card mb-3 boton py-2">
                <div class="d-flex align-items-center my-auto">
                    <div class="author">
                        <img src="${producto.imagen}" alt="${producto.nombre}" class="border-radius-lg shadow ms-2" style="width: 120px; height: 120px;">
                    </div>
                    <div class="text-start ms-2">
                        <p class="text-dark font-weight-bold mb-0">${producto.nombre}</p>
                        <span class="text-sm">${producto.descripcion}</span>
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
            // Añade el productoDiv al div correspondiente a su categoría
            categoriaDiv.appendChild(productoDiv);
            // Llamar a mostrar la cantidad de los productos al crearlos
            mostrarCantidadProducto(producto.nombre);
        }
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
    reproducirMas(urlSonidoMas);

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
        
        reproducirMenos(urlSonidoMenos)
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
                <div class="border border-bottom border-warning"></div>
                <p class="text-dark mt-2 mb-n3">${producto.nombre} - $${producto.precio}  </p><p class="text-end mt-n4">x ${producto.cantidad}</p>
                <p class="text-end mt-n3 mb-n4">$ ${subtotal.toFixed(2)} </p>
                <button class="btn btn-sm bg-dark" onclick="disminuirCantidad('${producto.nombre}')">-</button>
                <button class="btn btn-sm btn-warning" onclick="agregarAlCarrito('${producto.nombre}', ${producto.precio})">+</button>
                <button class="btn btn-sm btn-danger" onclick="quitarProducto('${producto.nombre}')"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
            </svg></button>
        `;
        carritoDiv.appendChild(productoDiv);
    });

    // Muestra el total de todos los productos en el carrito
    const totalDiv = document.createElement('div');
    totalDiv.innerHTML = `
        <div class="border border-bottom border-warning"></div>
        <p class="text-dark text-end font-weight-bold mt-1 mb-n1">Total: $ ${total.toFixed(2)}</p>
    `;
    carritoDiv.appendChild(totalDiv);
}

// Función para finalizar la compra y redirigir a WhatsApp
function finalizarCompra() {
    const numeroTelefono = '+573136615861'; // Reemplaza este número con el deseado

    
    let mensaje = '🌭*¡Hola mi nombre es -------- ! Quiero comprar los siguientes productos:*\n\n ';
    
    // Itera sobre el carrito y crea el mensaje
    carrito.forEach((producto, index) => {
        mensaje += `${index + 1}. *${producto.nombre}* - $${producto.precio} x ${producto.cantidad}\n`;
    });

    // Calcula el total
    const total = carrito.reduce((acum, producto) => acum + producto.precio * producto.cantidad, 0);
    mensaje += `\nTotal: $${total} \n\n`;
    
    // Genera la URL para redirigir a WhatsApp
    const url = `https://wa.me/${numeroTelefono}?text=${encodeURIComponent(mensaje)}\n\n mi ubicacion es: ----------\n\n metodo de pago 💰: -------- \n\n muchas gracias!`;
    window.location.href = url; // Redirige a WhatsApp
    reproducirFin(urlSonidoFin)
}
