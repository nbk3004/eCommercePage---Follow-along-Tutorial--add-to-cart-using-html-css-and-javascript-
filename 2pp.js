let listProductHTML = document.querySelector('.listProduct');
let listCartHTML = document.querySelector('.listCart');
let iconCart = document.querySelector('.icon-cart');
let iconCartSpan = document.querySelector('.icon-cart span');
let body = document.querySelector('body');
let closeCart = document.querySelector('.close');
let products = [];
let cart = [];

// Toggle cart visibility
iconCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
});
closeCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
});

const addDataToHTML = () => {
    listProductHTML.innerHTML = '';
    
    if (products.length > 0) {
        products.forEach(product => {
            let newProduct = document.createElement('div');
            newProduct.dataset.id = product.id;
            newProduct.classList.add('item');
            newProduct.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h2>${product.name}</h2>
                <div class="price">€${product.price.toFixed(2)}</div>
                <button class="addCart">Add To Cart</button>`;
            listProductHTML.appendChild(newProduct);
        });
    }
};

listProductHTML.addEventListener('click', (event) => {
    if (event.target.classList.contains('addCart')) {
        let productId = event.target.parentElement.dataset.id;
        addToCart(productId);
    }
});

const addToCart = (productId) => {
    let cartItemIndex = cart.findIndex(item => item.product_id == productId);

    if (cartItemIndex >= 0) {
        cart[cartItemIndex].quantity += 1;
    } else {
        cart.push({
            product_id: productId,
            quantity: 1
        });
    }
    updateCartHTML();
    saveCartToLocalStorage();
};

const saveCartToLocalStorage = () => {
    localStorage.setItem('cart', JSON.stringify(cart));
};

const updateCartHTML = () => {
    listCartHTML.innerHTML = '';
    let totalQuantity = 0;
    let totalPrice = 0; // Initialize total price

    if (cart.length > 0) {
        cart.forEach(item => {
            totalQuantity += item.quantity;
            let product = products.find(p => p.id == item.product_id);

            if (product) {
                let cartItem = document.createElement('div');
                cartItem.classList.add('item');
                cartItem.dataset.id = item.product_id;
                cartItem.innerHTML = `
                    <div class="image">
                        <img src="${product.image}" alt="${product.name}">
                    </div>
                    <div class="name">${product.name}</div>
                    <div class="totalPrice">€${(product.price * item.quantity).toFixed(2)}</div>
                    <div class="quantity">
                        <span class="minus">-</span>
                        <span>${item.quantity}</span>
                        <span class="plus">+</span>
                    </div>
                `;
                listCartHTML.appendChild(cartItem);

                // Add to the total price
                totalPrice += product.price * item.quantity;
            }
        });

        // Display the total price at the bottom of the cart
        let totalPriceElement = document.createElement('div');
        totalPriceElement.classList.add('totalPrice');
        totalPriceElement.innerHTML = `<h3>Total: €${totalPrice.toFixed(2)}</h3>`;
        listCartHTML.appendChild(totalPriceElement);
    }
    iconCartSpan.innerText = totalQuantity;
};

// Load products from JSON file
fetch('products.json')
    .then(response => response.json())
    .then(data => {
        products = data;
        addDataToHTML();
    });
