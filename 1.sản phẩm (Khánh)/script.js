// Hàm thêm sản phẩm vào giỏ hàng
function addToCart(productElement) {
    // Lấy thông tin sản phẩm
    const name = productElement.querySelector('h4').textContent;
    const priceText = productElement.querySelector('.product-item-price').textContent;
    const price = parseInt(priceText.replace(/\D/g, '')); // Chuyển đổi giá từ string sang number
    const image = productElement.querySelector('img').src;

    // Lấy giỏ hàng hiện tại từ localStorage
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
    const existingItem = cartItems.find(item => item.name === name);

    if (existingItem) {
        // Nếu sản phẩm đã có, tăng số lượng
        existingItem.quantity += 1;
    } else {
        // Nếu sản phẩm chưa có, thêm mới
        cartItems.push({
            name: name,
            price: price,
            image: image,
            quantity: 1
        });
    }

    // Lưu giỏ hàng vào localStorage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));

    // Hiển thị thông báo
    showNotification();
}

// Thêm hàm hiển thị thông báo
function showNotification() {
    // Tạo phần tử thông báo nếu chưa tồn tại
    let notification = document.getElementById('notification');
    if (!notification) {
        notification = document.createElement('div');
        notification.id = 'notification';
        notification.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background-color: #8B4513;
            color: white;
            padding: 15px 25px;
            border-radius: 5px;
            display: none;
            z-index: 1000;
            animation: slideIn 0.3s ease-out;
        `;
        document.body.appendChild(notification);

        // Thêm style cho animation
        const style = document.createElement('style');
        style.textContent = `
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
    }

    // Cập nhật nội dung và hiển thị thông báo
    notification.textContent = 'Đã thêm sản phẩm vào giỏ hàng';
    notification.style.display = 'block';

    // Ẩn thông báo sau 2 giây
    setTimeout(() => {
        notification.style.display = 'none';
    }, 2000);
}

// Thêm sự kiện click cho tất cả nút "Thêm vào giỏ"
document.addEventListener('DOMContentLoaded', function() {
    const addToCartButtons = document.querySelectorAll('.product-item-button');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productElement = this.closest('.product-item-info');
            addToCart(productElement);
        });
    });
});