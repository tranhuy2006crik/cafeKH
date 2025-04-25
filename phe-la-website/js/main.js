// Sample product data
const products = [
    {
        id: 1,
        name: "Matcha Phan Xi Păng",
        price: "64.000₫",
        image: "images/products/matcha-phan-xi-pang.jpg",
        description: "Matcha từ Ô Long Đặc Sản Việt Nam"
    },
    {
        id: 2,
        name: "Matcha-Coco-Latte",
        price: "59.000₫",
        image: "images/products/matcha-coco-latte.jpg",
        description: "Matcha Coco Latte thơm ngon"
    },
    {
        id: 3,
        name: "Thạch Ô Long Matcha",
        price: "15.000₫",
        image: "images/products/thach-o-long-matcha.jpg",
        description: "Thạch Ô Long Matcha đặc biệt"
    }
];

// Sample news data
const news = [
    {
        id: 1,
        title: "Ô Long Matcha – Matcha từ Ô Long Đặc Sản Việt Nam",
        date: "25/04/2024",
        image: "images/news/o-long-matcha.jpg",
        excerpt: "Đánh thức những Nốt Hương Đặc Sản ẩn sâu trong nông sản Việt Nam..."
    },
    {
        id: 2,
        title: "LY GẠO LÀNG CHILL 🎶🌾",
        date: "24/04/2024",
        image: "images/news/ly-gao-lang-chill.jpg",
        excerpt: "Góp nhặt tinh hoa đất trời, hạt gạo tuy nhỏ bé nhưng nuôi dưỡng bao thế hệ..."
    }
];

// Function to create product cards
function createProductCards() {
    const productGrid = document.querySelector('.product-grid');
    if (!productGrid) return;

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p class="price">${product.price}</p>
            <p class="description">${product.description}</p>
            <button class="btn add-to-cart" data-id="${product.id}">Thêm vào giỏ</button>
        `;
        productGrid.appendChild(productCard);
    });
}

// Function to create news cards
function createNewsCards() {
    const newsGrid = document.querySelector('.news-grid');
    if (!newsGrid) return;

    news.forEach(item => {
        const newsCard = document.createElement('div');
        newsCard.className = 'news-card';
        newsCard.innerHTML = `
            <img src="${item.image}" alt="${item.title}">
            <div class="news-content">
                <h3>${item.title}</h3>
                <p class="date">${item.date}</p>
                <p class="excerpt">${item.excerpt}</p>
                <a href="#" class="read-more">Đọc tiếp</a>
            </div>
        `;
        newsGrid.appendChild(newsCard);
    });
}

// Cart functionality
let cart = [];

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.push(product);
        updateCartCount();
        showNotification('Đã thêm sản phẩm vào giỏ hàng');
    }
}

function updateCartCount() {
    const cartIcon = document.querySelector('.cart-icon');
    if (cartIcon) {
        const count = cart.length;
        cartIcon.setAttribute('data-count', count);
    }
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    createProductCards();
    createNewsCards();

    // Add to cart event listeners
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = parseInt(e.target.dataset.id);
            addToCart(productId);
        });
    });

    // Mobile menu toggle
    const mobileMenuButton = document.createElement('button');
    mobileMenuButton.className = 'mobile-menu-button';
    mobileMenuButton.innerHTML = '<i class="fas fa-bars"></i>';
    document.querySelector('.navbar').prepend(mobileMenuButton);

    mobileMenuButton.addEventListener('click', () => {
        document.querySelector('.nav-links').classList.toggle('active');
    });
});

// Add notification styles
const style = document.createElement('style');
style.textContent = `
    .notification {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: #8B4513;
        color: white;
        padding: 1rem 2rem;
        border-radius: 5px;
        animation: slideIn 0.3s ease-out;
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

    .cart-icon {
        position: relative;
    }

    .cart-icon[data-count]:after {
        content: attr(data-count);
        position: absolute;
        top: -10px;
        right: -10px;
        background-color: #8B4513;
        color: white;
        border-radius: 50%;
        padding: 2px 6px;
        font-size: 12px;
    }

    @media (max-width: 768px) {
        .nav-links {
            display: none;
            width: 100%;
            text-align: center;
        }

        .nav-links.active {
            display: flex;
            flex-direction: column;
        }

        .mobile-menu-button {
            display: block;
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
        }
    }
`;
document.head.appendChild(style); 