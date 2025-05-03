
const products = [
    {
        id: 1,
        name: "Cà Phê Syphon",
        price: "69.000₫",
        image: "images/syphon.jpg",
        category: "coffee"
    },
    {
        id: 2,
        name: "Trà Ô Long Đặc Sản",
        price: "54.000₫",
        image: "images/traOlongDacSan.jpg",
        category: "tea"
    },
    {
        id: 3,
        name: "Matcha Phan Xi Păng",
        price: "64.000₫",
        image: "images/matcha-fansipan.jpg",
        category: "special"
    },
    {
        id: 4,
        name: "Espresso",
        price: "45.000₫",
        image: "images/espresso.jpg",
        category: "coffee"
    },
    {
        id: 5,
        name: "Matcha-Coco-Latte",
        price: "59.000₫",
        image: "images/matcha-cocolatte.jpg",
        category: "special"
    },
    {
        id: 6,
        name: "Thạch Ô Long Matcha",
        price: "15.000₫",
        image: "images/thachOlongMatcha.jpg",
        category: "special"
    }
];

// Cart functionality
let cart = [];

// Function to create product cards
function createProductCards(category = 'all') {
    const productsGrid = document.querySelector('.products-grid');
    productsGrid.innerHTML = '';

    const filteredProducts = category === 'all' 
        ? products 
        : products.filter(product => product.category === category);

    filteredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p class="price">${product.price}</p>
                <button class="add-to-cart" data-id="${product.id}">
                    Thêm vào giỏ
                </button>
            </div>
        `;
        productsGrid.appendChild(productCard);
    });

    // Add event listeners to new add-to-cart buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = parseInt(e.target.dataset.id);
            addToCart(productId);
        });
    });
}

// Function to add product to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.push(product);
        updateCartCount();
        showNotification('Đã thêm sản phẩm vào giỏ hàng');
    }
}

// Function to update cart count
function updateCartCount() {
    const cartIcon = document.querySelector('.cart-icon');
    if (cartIcon) {
        const count = cart.length;
        cartIcon.setAttribute('data-count', count);
    }
}

// Function to show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);

    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Initial product load
    createProductCards();

    // Category filter functionality
    document.querySelectorAll('.category-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            // Remove active class from all buttons
            document.querySelectorAll('.category-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Add active class to clicked button
            e.target.classList.add('active');
            
            // Filter products
            const category = e.target.dataset.category;
            createProductCards(category);
        });
    });

    // Add notification styles
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background-color: var(--primary-color);
            color: white;
            padding: 1rem 2rem;
            border-radius: 5px;
            animation: slideIn 0.3s ease-out;
            z-index: 1000;
        }

        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);
});
