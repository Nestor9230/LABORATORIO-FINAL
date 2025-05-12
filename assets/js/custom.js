// Agregar producto al carrito
function agregarAlCarrito(nombre, precio) {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  carrito.push({ nombre, precio });
  localStorage.setItem("carrito", JSON.stringify(carrito));
  alert("Producto agregado al carrito.");
  actualizarCantidadCarrito();
}

// Actualizar cantidad de productos en el carrito
function actualizarCantidadCarrito() {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const cantidad = document.getElementById("cantidad-carrito");
  if (cantidad) {
    cantidad.innerText = carrito.length;
  }
}

function mostrarCarrito() {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const contenedor = document.getElementById("lista-productos");
  const total = document.getElementById("total-carrito");
  const contenedorTotal = document.getElementById("contenedor-total");
  let suma = 0;

  contenedor.innerHTML = ""; // Limpiar contenido previo

  if (carrito.length === 0) {
    contenedor.innerHTML = `<p class="text-center text-muted">Tu carrito está vacío 🛒</p>`;
    contenedorTotal.style.display = "none";
    return;
  }

  carrito.forEach((producto, index) => {
    contenedor.innerHTML += `
      <div class="card mb-2">
        <div class="card-body d-flex justify-content-between align-items-center">
          <div>
            <h5 class="card-title mb-1">${producto.nombre}</h5>
            <p class="card-text mb-0 text-muted">$${producto.precio}</p>
          </div>
          <button class="btn btn-outline-danger btn-sm" onclick="eliminarProducto(${index})">🗑 Eliminar</button>
        </div>
      </div>`;
    suma += producto.precio;
  });

  total.innerText = `$${suma}`;
  contenedorTotal.style.display = "flex";
}


// Vaciar el carrito
function vaciarCarrito() {
  localStorage.removeItem("carrito");
  mostrarCarrito();
  actualizarCantidadCarrito();
}

// Ejecutarlo cuando cargue la página
document.addEventListener('DOMContentLoaded', () => {
  actualizarCantidadCarrito();
  if (document.getElementById("lista-productos")) {
    mostrarCarrito();
  }
});
