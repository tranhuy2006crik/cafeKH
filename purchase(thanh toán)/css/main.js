// Lấy giỏ hàng từ localStorage
const cart = JSON.parse(localStorage.getItem('cart')) || [];

// Hiển thị sản phẩm từ giỏ hàng
function displayProducts() {
    const productsList = document.querySelector('.products-list');
    let subtotal = 0;

    productsList.innerHTML = cart.map(product => {
        const total = parseFloat(product.price.replace('₫', '').replace(',', '')) * product.quantity;
        subtotal += total;
        
        return `
            <div class="product-item">
                <img src="../${product.image}" alt="${product.name}" class="product-image">
                <div class="product-details">
                    <div class="product-name">${product.name}</div>
                    <div class="product-price">${product.price}</div>
                    <div class="product-quantity">Số lượng: ${product.quantity}</div>
                </div>
            </div>
        `;
    }).join('');

    // Cập nhật tổng tiền
    updateOrderSummary(subtotal);
    displayCartQuantity();
}

// Cập nhật tổng thanh toán
function updateOrderSummary(subtotal) {
    const shippingFee = 30000;
    const total = subtotal + shippingFee;

    document.querySelector('.subtotal').textContent = formatPrice(subtotal) + '₫';
    document.querySelector('.total-amount').textContent = formatPrice(total) + '₫';
}

// Format giá tiền
function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

// Xử lý đặt hàng
document.querySelector('.place-order-btn').addEventListener('click', function() {
    if (cart.length === 0) {
        alert('Giỏ hàng của bạn đang trống!');
        return;
    }

    const selectedPayment = document.querySelector('input[name="payment"]:checked').value;
    
    // Thông báo đặt hàng thành công
    alert('Đặt hàng thành công! Cảm ơn bạn đã mua hàng.');
    
    // Xóa giỏ hàng
    localStorage.removeItem('cart');
    
    // Chuyển về trang chủ
    window.location.href = '../index.html';
});

// Hiển thị số lượng sản phẩm trong giỏ hàng
function displayCartQuantity() {
    const cartQuantity = cart.reduce((total, item) => total + item.quantity, 0);
    const cartIcon = document.querySelector('.cart-icon');
    
    // Tạo hoặc cập nhật badge hiển thị số lượng
    let badge = cartIcon.querySelector('.cart-badge');
    if (!badge) {
        badge = document.createElement('span');
        badge.className = 'cart-badge';
        cartIcon.appendChild(badge);
    }
    badge.textContent = cartQuantity;
}

// Khởi tạo trang
document.addEventListener('DOMContentLoaded', function() {
    displayProducts();
    displayCartQuantity();
});