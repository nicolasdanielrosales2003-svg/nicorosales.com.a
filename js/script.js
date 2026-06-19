let carrito = [];
let productoSeleccionado = {};

// --- Modal sabores ---
function abrirModal(nombre, precio, sabores) {
  productoSeleccionado = { nombre, precio };
  document.getElementById('modalProducto').innerText = nombre;
  const saboresDiv = document.getElementById('sabores');
  saboresDiv.innerHTML = '';
  sabores.forEach(sabor => {
    saboresDiv.innerHTML += `<label><input type="radio" name="sabor" value="${sabor}"> ${sabor}</label><br>`;
  });
  document.getElementById('modal').style.display = 'flex';
}

function cerrarModal() {
  document.getElementById('modal').style.display = 'none';
}

function agregarAlCarrito() {
  const sabor = document.querySelector('input[name="sabor"]:checked');
  if (!sabor) { alert("Selecciona un sabor"); return; }
  carrito.push({ ...productoSeleccionado, sabor: sabor.value });
  actualizarCarrito();
  cerrarModal();
}

// --- Carrito ---
function actualizarCarrito() {
  const itemsDiv = document.getElementById('items');
  itemsDiv.innerHTML = '';
  let subtotal = 0;
  carrito.forEach(item => {
    subtotal += item.precio;
    itemsDiv.innerHTML += `<div class="item">${item.nombre} - ${item.sabor} - $${item.precio}</div>`;
  });
  document.getElementById('subtotal').innerText = subtotal;
  calcularTotal();
}

function aplicarCupon() {
  const cupon = document.getElementById('cupon').value.trim();
  let descuento = 0;
  const subtotal = parseFloat(document.getElementById('subtotal').innerText);

  if (cupon === "PROMO10") descuento = 0.1 * subtotal;
  if (cupon === "2X1" && carrito.length >= 2) descuento = carrito[0].precio;

  document.getElementById('descuento').innerText = descuento;
  calcularTotal();

