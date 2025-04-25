document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Lấy danh sách người dùng từ localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Kiểm tra thông tin đăng nhập
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        // Lưu thông tin đăng nhập hiện tại
        localStorage.setItem('currentUser', JSON.stringify(user));
        alert('Đăng nhập thành công!');
        // Chuyển hướng đến trang chính
        window.location.href = 'index.html';
    } else {
        alert('Email hoặc mật khẩu không chính xác!');
    }
});