// script.js
const products = [
    {
        id: 1,
        name: "Alfajores Artesanales",
        price: 12,
        image: "https://picsum.photos/id/201/400/300",
        description: "Rellenos de manjar blanco casero. Paquete de 6 unidades.",
        flavors: ["Clásico", "Chocolate", "Coco", "Naranja"]
    },
    {
        id: 2,
        name: "Brownies de Chocolate",
        price: 18,
        image: "https://picsum.photos/id/292/400/300",
        description: "Suaves y jugosos con nueces opcionales.",
        flavors: ["Clásico", "Con Nueces", "Triple Chocolate", "Oreo"]
    },
    {
        id: 3,
        name: "Empanadas Caseras",
        price: 25,
        image: "https://picsum.photos/id/431/400/300",
        description: "Masa casera. Paquete de 12 unidades.",
        flavors: ["Carne", "Pollo", "Queso", "Verduras"]
    },
    {
        id: 4,
        name: "Tarta de Limón",
        price: 45,
        image: "https://picsum.photos/id/670/400/300",
        description: "Base de galleta y relleno cremoso de limón.",
        flavors: ["Limón", "Maracuyá", "Frambuesa", "Coco"]
    }
];

let cart = [];

// Renderizar productos
function renderProducts() {
    const container = document.getElementById('products-grid');
    container.innerHTML = '';

    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                
                <label>Sabor:</label>
                <select class="flavor-select" id="flavor-${product.id}">
                    ${product.flavors.map(flavor => `<option value="${flavor}">${flavor}</option>`).join('')}
                </select>
                
                <label>Cantidad / Precio por unidad:</label>
                <input type="number" class="price-input" id="qty-${product.id}" value="1" min="1">
                
                <button class="add-to-cart" onclick="addToCart(${product.id})">
                    <i class="fas fa-cart-plus"></i> Agregar al Carrito
                </button>
            </div>
        `;
        container.appendChild(card);
    });
}

// Agregar al carrito
function addToCart(id) {
    const product = products.find(p => p.id === id);
    const flavorSelect = document.getElementById(`flavor-${id}`);
    const qtyInput = document.getElementById(`qty-${id}`);
    
    const flavor = flavorSelect.value;
    const quantity = parseInt(qtyInput.value);
    
    const item = {
        ...product,
        flavor: flavor,
        quantity: quantity,
        total: product.price * quantity
    };
    
    cart.push(item);
    updateCart();
    
    // Animación breve
    const cartIcon = document.getElementById('cart-icon');
    cartIcon.style.transform = 'scale(1.3)';
    setTimeout(() => cartIcon.style.transform = 'scale(1)', 300);
}

// Actualizar carrito
function updateCart() {
    document.getElementById('cart-count').textContent = cart.length;
    
    const itemsContainer = document.getElementById('cart-items');
    itemsContainer.innerHTML = '';
    
    let total = 0;
    
    cart.forEach((item, index) => {
        total += item.total;
        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div>
                <strong>${item.name}</strong><br>
                <small>${item.flavor} × ${item.quantity}</small><br>
                <strong>S/ ${item.total.toFixed(2)}</strong>
            </div>
            <button onclick="removeFromCart(${index})" style="background:none;border:none;cursor:pointer;color:#e76f51;">🗑</button>
        `;
        itemsContainer.appendChild(div);
    });
    
    document.getElementById('cart-total').textContent = `S/ ${total.toFixed(2)}`;
}

// Eliminar del carrito
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

// Abrir/Cerrar carrito
function toggleCart() {
    const sidebar = document.getElementById('cart-sidebar');
    sidebar.classList.toggle('open');
}

// Enviar pedido por WhatsApp
function enviarPedidoWhatsApp() {
    if (cart.length === 0) {
        alert("Tu carrito está vacío");
        return;
    }
    
    let mensaje = "Hola! Quiero hacer el siguiente pedido:%0A%0A";
    
    cart.forEach(item => {
        mensaje += `• ${item.quantity} x ${item.name} (${item.flavor}) - S/ ${item.total.toFixed(2)}%0A`;
    });
    
    const total = cart.reduce((sum, item) => sum + item.total, 0);
    mensaje += `%0ATotal: S/ ${total.toFixed(2)}%0A%0A¡Gracias!`;
    
    const numeroWhatsApp = "51987654321"; // ← Cambia este número por tu WhatsApp real
    window.open(`https://wa.me/${numeroWhatsApp}?text=${mensaje}`, '_blank');
    
    // Vaciar carrito después de enviar
    cart = [];
    updateCart();
    toggleCart();
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    
    // Abrir carrito
    document.getElementById('cart-icon').addEventListener('click', toggleCart);
    document.getElementById('close-cart').addEventListener('click', toggleCart);
    
    // Cerrar carrito al hacer clic fuera
    document.addEventListener('click', (e) => {
        const sidebar = document.getElementById('cart-sidebar');
        if (!sidebar.contains(e.target) && !document.getElementById('cart-icon').contains(e.target)) {
            sidebar.classList.remove('open');
        }
    });
});
