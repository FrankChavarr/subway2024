// Variables para manejar el carrito de compras
const cart = [];
const cartSection = document.getElementById('cart-section');
const cartItems = document.getElementById('cart-items');
const totalPriceElement = document.getElementById('total-price');

// Añadir evento a los botones de "Añadir al Carrito"
document.querySelectorAll('.btn-add-to-cart').forEach(button => {
    button.addEventListener('click', event => {
        const productItem = event.target.parentElement;
        const productName = productItem.querySelector('h3').textContent;
        const productPrice = parseFloat(productItem.querySelector('.price').textContent.replace('$', ''));
        
        // Añadir producto al carrito
        cart.push({ name: productName, price: productPrice });
        updateCart();
        alert(`${productName} ha sido añadido al carrito.`);
    });
});

// Función para actualizar el carrito de compras
function updateCart() {
    cartSection.classList.remove('hidden');
    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price;
        const li = document.createElement('li');
        li.classList.add('cart-item');
        li.innerHTML = `${item.name} - $${item.price.toFixed(2)} <button onclick="removeItem(${index})">Eliminar</button>`;
        cartItems.appendChild(li);
    });

    totalPriceElement.textContent = total.toFixed(2);
}

// Función para eliminar un producto del carrito
function removeItem(index) {
    cart.splice(index, 1);
    updateCart();
}
// Toggle del menú de navegación en móvil
document.getElementById('nav-toggle').addEventListener('click', function () {
    document.getElementById('nav-menu').classList.toggle('active');
});
