// Đợi cho DOM load xong
document.addEventListener('DOMContentLoaded', function() {
    // Lấy tất cả các nút trong menu
    const menuButtons = document.querySelectorAll('.menu-button');
    
    // Thêm sự kiện click cho mỗi nút
    menuButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Lấy target section từ data attribute của nút
            const targetId = this.getAttribute('data-target');
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                // Tính toán vị trí scroll
                const headerOffset = 100; // Offset để tránh header cố định
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                // Scroll mượt đến vị trí
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Thêm hiệu ứng highlight cho section được chọn
                targetSection.classList.add('highlight');
                setTimeout(() => {
                    targetSection.classList.remove('highlight');
                }, 1000);
                
                // Cập nhật trạng thái active cho nút
                menuButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
    
    // Thêm sự kiện scroll để cập nhật menu active
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('.drink-section');
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 150) {
                currentSection = section.getAttribute('id');
            }
        });
        
        // Cập nhật trạng thái active cho menu
        menuButtons.forEach(button => {
            button.classList.remove('active');
            if (button.getAttribute('data-target') === currentSection) {
                button.classList.add('active');
            }
        });
    });
});

// Thêm animation khi scroll đến section
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, {
    threshold: 0.1
});

// Quan sát tất cả các section đồ uống
document.querySelectorAll('.drink-section').forEach((section) => {
    observer.observe(section);
});

document.addEventListener('DOMContentLoaded', function() {
    // Khởi tạo giỏ hàng mới mỗi khi tải trang
    let cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Cập nhật số lượng giỏ hàng khi trang được tải
    updateCartBadge();

    // Thêm sự kiện click cho tất cả nút "Thêm vào giỏ"
    const buyButtons = document.querySelectorAll('.product-item-button');
    buyButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const productInfo = e.target.closest('.product-item-info');
            const productName = productInfo.querySelector('h4').textContent;
            const productPrice = productInfo.querySelector('.product-item-price').textContent;
            const productImage = productInfo.querySelector('img').src;

            // Thêm sản phẩm vào giỏ hàng
            addToCart({
                name: productName,
                price: productPrice,
                image: productImage,
                quantity: 1
            });

            // Hiển thị thông báo
            showNotification();
        });
    });

    // Hàm thêm vào giỏ hàng
    function addToCart(product) {
        const existingProduct = cart.find(item => item.name === product.name);
        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.push(product);
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartBadge();
    }

    // Hàm cập nhật số lượng trên icon giỏ hàng
    function updateCartBadge() {
        const cartIcon = document.querySelector('.cart-icon');
        let badge = cartIcon.querySelector('.cart-badge');
        
        if (!badge) {
            badge = document.createElement('span');
            badge.className = 'cart-badge';
            cartIcon.appendChild(badge);
        }

        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        badge.textContent = totalItems;
        badge.style.display = totalItems > 0 ? 'block' : 'none';
    }

    // Hàm hiển thị thông báo
    function showNotification() {
        const notification = document.getElementById('notification');
        notification.style.display = 'block';
        
        setTimeout(() => {
            notification.style.display = 'none';
        }, 2000);
    }
});

// Thêm sự kiện cuộn trang cho menu navbar
document.addEventListener('DOMContentLoaded', function() {
    const menuLinks = document.querySelectorAll('.Menu-navbar a');
    
    menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Lấy text của link và tìm section tương ứng
            const targetText = this.textContent;
            const targetSection = Array.from(document.querySelectorAll('.product-item h3'))
                .find(heading => heading.textContent === targetText)
                ?.closest('.product-item');
            
            if (targetSection) {
                // Tính toán vị trí scroll
                const headerOffset = 100; // Offset để tránh header cố định
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                // Cuộn đến vị trí với animation mượt
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Thêm hiệu ứng highlight cho section được chọn
                targetSection.classList.add('highlight');
                setTimeout(() => {
                    targetSection.classList.remove('highlight');
                }, 1000);
            }
        });
    });
});