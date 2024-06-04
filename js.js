// Obtener los elementos del DOM
const cartModal = document.getElementById('cartModal');
const cartBtn = document.getElementById('cartBtn');
const closeBtn = document.getElementById('closeBtn');
const formaEntrega = document.getElementById('formaEntrega');
const direccionInput = document.getElementById('direccion');
const formaPago = document.getElementById('formaPago');
const borrarCarritoBtn = document.getElementById('borrarCarritoBtn');
const carrito = document.getElementById('carrito');

// Función para abrir el modal
cartBtn.onclick = function () {
  cartModal.style.display = 'block';
}

// Función para cerrar el modal
closeBtn.onclick = function () {
  cartModal.style.display = 'none';
}

// Cerrar el modal si el usuario hace clic fuera de él
window.onclick = function (event) {
  if (event.target == cartModal) {
    cartModal.style.display = 'none';
  }
}

// Habilitar o deshabilitar el input de dirección basado en la selección de forma de entrega
formaEntrega.addEventListener('change', function() {
  if (this.value === 'domicilio') {
    direccionInput.disabled = false;
  } else {
    direccionInput.disabled = true;
    direccionInput.value = ''; // Limpiar el campo de dirección
  }
});

// Función para guardar la forma de entrega
function guardarFormaEntrega() {
  if (formaEntrega.value === 'domicilio') {
    const direccion = direccionInput.value.trim();
    if (direccion) {
      formaPago.textContent = direccion;
      // Aquí puedes agregar la lógica para agregar la dirección al objeto del carrito
      console.log(`Dirección guardada: ${direccion}`);
    } else {
      alert('Por favor ingrese una dirección.');
    }
  } else if (formaEntrega.value === 'recoger') {
    formaPago.textContent = 'Recoger';
    // Aquí puedes agregar la lógica para agregar el mensaje al objeto del carrito
    console.log('Recoger');
  } else {
    alert('Por favor seleccione una forma de entrega.');
  }
}

// Función para borrar el carrito del localStorage
function borrarLocalStorage() {
  localStorage.removeItem('carrito');
  carrito.textContent = 'Carrito vacio';
  formaPago.textContent = '';
  actualizarBotonBorrarCarrito();
}

// Función para finalizar la compra
function finalizarCompra() {
  // Lógica para finalizar la compra
  alert('Compra finalizada');
}

// Función para actualizar el estado del botón "Borrar Carrito"
function actualizarBotonBorrarCarrito() {
  const carritoContenido = localStorage.getItem('carrito');
  if (!carritoContenido) {
    borrarCarritoBtn.disabled = true;
  } else {
    borrarCarritoBtn.disabled = false;
  }
}

// Inicializar el estado del botón "Borrar Carrito"
document.addEventListener('DOMContentLoaded', function() {
  actualizarBotonBorrarCarrito();
});
