// Toggle del menú de navegación en móvil
// Toggle del menú de navegación en móvil
document.getElementById('nav-toggle').addEventListener('click', function () {
    const menu = document.getElementById('nav-menu');
    menu.classList.toggle('active');

    // Deshabilita el scroll del cuerpo mientras el menú está abierto
    if (menu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
});
document.getElementById('nav-toggle').addEventListener('click', function () {
    console.log('Menú alternado');
    const menu = document.getElementById('nav-menu');
    menu.classList.toggle('active');
});


function scrollToProducts() {
    const productsSection = document.getElementById('products');
    productsSection.scrollIntoView({ behavior: 'smooth' });
}

// Función para actualizar el precio total en tiempo real
function updateTotal(quantityInputId, price, totalPriceId) {
    const quantityInput = document.getElementById(quantityInputId);
    const totalPriceElement = document.getElementById(totalPriceId);
    const quantity = parseInt(quantityInput.value);

    // Validación de cantidad
    if (quantity < 1 || isNaN(quantity)) {
        totalPriceElement.innerText = `Total: $0.00`;
        return;
    }

    // Calcular el precio total
    const total = price * quantity;
    totalPriceElement.innerText = `Total: $${total.toFixed(2)}`;
}

// Función para manejar la cantidad usando los botones "+" y "-"
function updateQuantity(quantityInputId, change) {
    const quantityInput = document.getElementById(quantityInputId);
    let currentValue = parseInt(quantityInput.value);

    // Asegurarse de que el valor sea válido
    if (isNaN(currentValue) || currentValue < 1) {
        currentValue = 1;
    }

    // Actualizar el valor según el botón presionado
    const newValue = currentValue + change;
    if (newValue > 0) {
        quantityInput.value = newValue;

        // Obtener el precio y el ID del precio total del producto actual
        const productPrice = parseFloat(quantityInput.getAttribute('data-price'));
        const totalPriceId = quantityInput.getAttribute('data-total-id');
        updateTotal(quantityInputId, productPrice, totalPriceId);
    }
}

// Función para manejar la compra y redirigir a WhatsApp
function handleBuy(productName, price, quantityInputId) {
    const quantityInput = document.getElementById(quantityInputId);
    const quantity = parseInt(quantityInput.value);

    // Validación de cantidad
    if (quantity < 1 || isNaN(quantity)) {
        alert('Por favor, selecciona una cantidad válida.');
        return;
    }

    // Calcular el precio total
    const total = price * quantity;

    // Crear el mensaje para WhatsApp
    const whatsappMessage = `Hola, me interesa comprar ${quantity} unidad(es) de ${productName}. El precio total sería $${total.toFixed(2)}.`;

    // Generar la URL de WhatsApp
    const whatsappUrl = `https://wa.me/50589940318?text=${encodeURIComponent(whatsappMessage)}`;

    // Redirigir al usuario a WhatsApp
    window.open(whatsappUrl, '_blank');
}


