<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <link rel="apple-touch-icon" sizes="76x76" href="assets/img/logo.jpeg">
  <link rel="icon" type="gif" href="assets/img/logoorg.png">
  <title>
    ¡BENDITO PERRO!
  </title>
  <!--     Fonts and icons     -->
  <link rel="stylesheet" type="text/css"
    href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,900|Roboto+Slab:400,700" />
  <!-- Nucleo Icons -->
  <link href=" assets/css/nucleo-icons.css" rel="stylesheet" />
  <link href=" assets/css/nucleo-svg.css" rel="stylesheet" />

  <link rel="stylesheet" href="assets/css/intro.css">

  <!-- Font Awesome Icons -->
  <script src="https://kit.fontawesome.com/42d5adcbca.js" crossorigin="anonymous"></script>
  <!-- Material Icons -->
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons+Round" rel="stylesheet">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Caveat:wght@400..700&display=swap" rel="stylesheet">
  <!-- CSS Files -->
  <link id="pagestyle" href="assets/css/material-kit.css?v=3.0.4" rel="stylesheet" />
  <!-- Nepcha Analytics (nepcha.com) -->
  <!-- Nepcha is a easy-to-use web analytics. No cookies and fully compliant with GDPR, CCPA and PECR. -->
  <script defer data-site="YOUR_DOMAIN_HERE" src="https://api.nepcha.com/js/nepcha-analytics.js"></script>
</head>
<body>

    <h1>Listado de Productos</h1>
    <div id="productos"></div>

    <script>
        function agregarAlCarrito(nombre, precio) {
            console.log('Producto agregado al carrito:', nombre, precio);
            // Implementa la lógica para agregar el producto al carrito
        }

        function disminuirCantidad(nombre) {
            console.log('Disminuir cantidad de:', nombre);
            // Implementa la lógica para disminuir la cantidad del producto en el carrito
        }

        fetch('api.php')
            .then(response => response.json())
            .then(data => {
                const productosDiv = document.getElementById('productos');

                if (data.error) {
                    productosDiv.innerText = data.error;
                } else if (data.message) {
                    productosDiv.innerText = data.message;
                } else {
                    // Iterar sobre las categorías
                    for (const categoria in data) {
                        if (data.hasOwnProperty(categoria)) {
                            // Crear un título para cada categoría
                            const categoriaTitulo = document.createElement('h3');
                            categoriaTitulo.innerText = categoria;
                            productosDiv.appendChild(categoriaTitulo);

                            // Crear un contenedor para los productos de la categoría
                            const productosContainer = document.createElement('div');
                            productosContainer.classList.add('productos-container');

                            data[categoria].forEach((producto, index) => {
                                const productoCard = document.createElement('div');
                                productoCard.classList.add('card', 'mb-3', 'boton', 'py-2');
                                productoCard.innerHTML = `
                                    <div class="d-flex align-items-center my-auto">
                                        <div class="author">
                                            <img src="${producto.imagen}" alt="${producto.nombre}" class="border-radius-lg shadow ms-2">
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
                                `;
                                productosContainer.appendChild(productoCard);
                            });

                            productosDiv.appendChild(productosContainer);
                        }
                    }
                }
            })
            .catch(error => {
                document.getElementById('productos').innerText = 'Error al cargar los productos: ' + error;
            });
    </script>



      <!-- -------- END FOOTER 5 w/ DARK BACKGROUND ------- -->
  <!--   Core JS Files   -->
  <script src=" assets/js/core/popper.min.js" type="text/javascript"></script>
  <script src=" assets/js/core/bootstrap.min.js" type="text/javascript"></script>
  <script src=" assets/js/plugins/perfect-scrollbar.min.js"></script>
  <!-- Control Center for Material UI Kit: parallax effect, scripts for the example pages etc -->
  <!--  Google Maps Plugin    -->
  <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDTTfWur0PDbZWPr7Pmq8K3jiDp0_xUziI"></script>
  <script src=" assets/js/material-kit.min.js?v=3.0.4" type="text/javascript"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/intro.js/4.2.2/intro.min.js"></script>
  <script src="assets/js/instrucciones.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>


  <script>
    // Función para borrar todos los datos guardados en `localStorage`
    function borrarLocalStorage() {
        // Borra todos los datos de `localStorage`
        localStorage.removeItem('carrito');
        document.getElementById('carrito').innerText = 'Carrito vacío';
        // Recarga la página
        window.location.reload();
    }
    // Función para reproducir un sonido al agregar
    function reproducirMas(urlSonidoMas) {
        const sonido = new Audio(urlSonidoMas);
        sonido.play()
    }
    // Función para reproducir un sonido al borrar
    function reproducirMenos(urlSonidoMenos) {
        const sonido = new Audio(urlSonidoMenos);
        sonido.play()
    }
    // Función para reproducir un sonido al finalizar
    function reproducirFin(urlSonidoFin) {
        const sonido = new Audio(urlSonidoFin);
        sonido.play()
    }
    // Puedes usar una URL local o remota
    const urlSonidoMas = 'assets/audio/7.mp3';
    const urlSonidoMenos = 'assets/audio/11.mp3';
    const urlSonidoFin = 'assets/audio/6.mp3';

  </script>
</body>
</html>
