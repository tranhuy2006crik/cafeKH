// Lấy danh sách sản phẩm từ localStorage
function getCartItems() {
    return JSON.parse(localStorage.getItem('cartItems')) || [];
}

// Tính tổng tiền của giỏ hàng
function calculateTotal(items) {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// Hiển thị sản phẩm trong giỏ hàng
function displayCartItems() {
    const cartItems = getCartItems();
    const productsList = document.querySelector('.products-list');
    
    // Xóa nội dung cũ
    productsList.innerHTML = '';
    
    // Hiển thị từng sản phẩm
    cartItems.forEach(item => {
        const productElement = document.createElement('div');
        productElement.className = 'product-item';
        productElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="product-image">
            <div class="product-details">
                <div class="product-name">${item.name}</div>
                <div class="product-price">${item.price.toLocaleString('vi-VN')}₫</div>
                <div class="product-quantity">Số lượng: ${item.quantity}</div>
            </div>
        `;
        productsList.appendChild(productElement);
    });

    // Cập nhật tổng tiền
    updateTotalAmount(cartItems);
}

// Cập nhật tổng tiền thanh toán
function updateTotalAmount(items) {
    const subtotal = calculateTotal(items);
    const shippingFee = 30000; // Phí vận chuyển cố định
    const total = subtotal + shippingFee;

    // Cập nhật hiển thị
    document.querySelector('.subtotal').textContent = `${subtotal.toLocaleString('vi-VN')}₫`;
    document.querySelector('.total-amount').textContent = `${total.toLocaleString('vi-VN')}₫`;
}

// Xử lý nút đặt hàng
document.querySelector('.place-order-btn').addEventListener('click', function() {
    const cartItems = getCartItems();
    if (cartItems.length === 0) {
        alert('Giỏ hàng của bạn đang trống!');
        return;
    }

    // Lấy phương thức thanh toán được chọn
    const selectedPayment = document.querySelector('input[name="payment"]:checked').value;
    
    // Xử lý đặt hàng (có thể thêm logic gửi đơn hàng lên server ở đây)
    alert('Đặt hàng thành công!');
    
    // Xóa giỏ hàng sau khi đặt hàng thành công
    localStorage.removeItem('cartItems');
    
    // Chuyển về trang chủ
    window.location.href = '../index.html';
});

// Khởi tạo hiển thị khi trang được load
document.addEventListener('DOMContentLoaded', displayCartItems);


// Thêm hàm để hiển thị form chỉnh sửa thông tin
function showEditForm() {
    const currentName = document.querySelector('.name').textContent;
    const currentPhone = document.querySelector('.phone').textContent.replace(/[()+ ]/g, '');
    const currentAddress = document.querySelector('.address').textContent.trim();

    const formHTML = `
        <div class="edit-form">
            <div class="form-group">
                <label>Họ và tên:</label>
                <input type="text" id="editName" value="${currentName}">
            </div>
            <div class="form-group">
                <label>Số điện thoại:</label>
                <input type="tel" id="editPhone" value="${currentPhone}">
            </div>
            <div class="form-group">
                <label>Địa chỉ:</label>
                <textarea id="editAddress">${currentAddress}</textarea>
            </div>
            <div class="form-buttons">
                <button class="save-btn">Lưu thay đổi</button>
                <button class="cancel-btn">Hủy</button>
            </div>
        </div>
    `;

    const addressContent = document.querySelector('.address-content');
    addressContent.innerHTML = formHTML;

    // Thêm sự kiện cho nút Lưu
    document.querySelector('.save-btn').addEventListener('click', saveChanges);
    
    // Thêm sự kiện cho nút Hủy
    document.querySelector('.cancel-btn').addEventListener('click', cancelEdit);
}

// Hàm lưu thay đổi
function saveChanges() {
    const newName = document.getElementById('editName').value;
    const newPhone = document.getElementById('editPhone').value;
    const newAddress = document.getElementById('editAddress').value;

    // Kiểm tra dữ liệu
    if (!newName || !newPhone || !newAddress) {
        alert('Vui lòng điền đầy đủ thông tin!');
        return;
    }

    // Cập nhật giao diện
    const addressContent = document.querySelector('.address-content');
    addressContent.innerHTML = `
        <div class="user-info">
            <span class="name">${newName}</span>
            <span class="phone">(+84) ${newPhone}</span>
        </div>
        <div class="address">
            ${newAddress}
        </div>
        <button class="change-address-btn" onclick="showEditForm()">Thay đổi</button>
    `;
}

// Hàm hủy chỉnh sửa
function cancelEdit() {
    const addressContent = document.querySelector('.address-content');
    addressContent.innerHTML = `
        <div class="user-info">
            <span class="name">Nguyễn Văn A</span>
            <span class="phone">(+84) 123456789</span>
        </div>
        <div class="address">
            123 Đường ABC, Phường XYZ, Quận 1, TP.HCM
        </div>
        <button class="change-address-btn" onclick="showEditForm()">Thay đổi</button>
    `;
}

// Thêm sự kiện click cho nút thay đổi
document.addEventListener('DOMContentLoaded', function() {
    const changeAddressBtn = document.querySelector('.change-address-btn');
    if (changeAddressBtn) {
        changeAddressBtn.addEventListener('click', showEditForm);
    }
});