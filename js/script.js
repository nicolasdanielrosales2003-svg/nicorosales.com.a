const products = [
    { id: 1, name: "Alfajores Artesanales", price: 12, image: "https://picsum.photos/id/201/400/300", description: "Paquete de 6 unidades", flavors: ["Clásico", "Chocolate", "Coco"] },
    { id: 2, name: "Brownies de Chocolate", price: 18, image: "https://picsum.photos/id/292/400/300", description: "Con nueces o sin", flavors: ["Clásico", "Nueces", "Triple Chocolate"] },
    { id: 3, name: "Empanadas Caseras", price: 25, image: "https://picsum.photos/id/431/400/300", description: "Paquete 12 unidades", flavors: ["Carne", "Pollo", "Queso"] },
    { id: 4, name: "Tarta de Limón", price: 45, image: "https://picsum.photos/id/670/400/300", description: "Tamaño familiar", flavors: ["Limón", "Maracuyá"] },
    { id: 5, name: "Galletas de Mantequilla", price: 15, image: "https://picsum.photos/id/870/400/300", description: "Paquete de 12", flavors: ["Vainilla", "Chocolate"] }
];

let cart = [];

function renderProducts(filteredProducts = products) {
    const container = document.getElementById('products-grid');
    container.innerHTML = '';

    filteredProducts.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <p><strong>S/ ${product.price}</strong> c/u</p>
                
                <select class="flavor-select" id="flavor-${product.id}">
                    ${product.flavors.map(f => `<option value="${f}">${f}</option>`).join('')}
                </select>
                
                <input type="number" class="qty-input" id="qty-${product.id}" value="1" min="1">
                
                <button class="add-to-cart" onclick="addToCart(${product.id})">
                    Agregar al Carrito
                </button>
            </div>
        `;
        container.appendChild(card);
    });
}

function addToCart(id) {
    const product = products.find(p => p.id === id);
    const flavor = document.getElementById(`flavor-${id}`).value;
    const quantity = parseInt(document.getElementById(`qty-${id}`).value) || 1;

    cart.push({ ...product, flavor, quantity, total: product.price * quantity });
    updateCart();
    
    // Feedback visual
    const icon = document.getElementById('cart-icon');
    icon.style.transform = 'scale(1.4)';
    setTimeout(() => icon.style.transform = 'scale(1)', 250);
}

function updateCart() {
    document.getElementById('cart-count').textContent = cart.length;
    
    const container = document.getElementById('cart-items');
    container.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        total += item.total;
        container.innerHTML += `
            <div class="cart-item">
                <strong>${item.quantity} × ${item.name}</strong><br>
                <small>${item.flavor}</small><br>
                <span>S/ ${item.total.toFixed(2)}</span>
                <button onclick="removeFromCart(${index})" style="float:right; color:red;">Eliminar</button>
            </div>
        `;
    });

    document.getElementById('cart-total').textContent = `S/ ${total.toFixed(2)}`;
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

function enviarPedidoWhatsApp() {
    if (cart.length === 0) return alert("El carrito está vacío");
    
    let msg = "Hola, quiero hacer este pedido:%0A%0A";
    cart.forEach(item => {
        msg += `• ${item.quantity} x ${item.name} (${item.flavor}) - S/ ${item.total}%0A`;
    });
    msg += `%0ATotal: S/ ${cart.reduce((a, b) => a + b.total, 0).toFixed(2)}`;

    window.open(`https://wa.me/3534114434?text=${msg}`, '_blank'); // ← Cambia el número
    cart = [];
    updateCart();
    document.getElementById('cart-sidebar').classList.remove('open');
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();

    // Búsqueda
    document.getElementById('search').addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        const filtered = products.filter(p => p.name.toLowerCase().includes(term));
        renderProducts(filtered);
    });

    // Carrito
    document.getElementById('cart-icon').addEventListener('click', () => {
        document.getElementById('cart-sidebar').classList.toggle('open');
    });

    document.getElementById('close-cart').addEventListener('click', () => {
        document.getElementById('cart-sidebar').classList.remove('open');
    });
});
