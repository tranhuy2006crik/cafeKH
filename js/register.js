document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    // Kiểm tra mật khẩu xác nhận
    if (password !== confirmPassword) {
        alert('Mật khẩu xác nhận không khớp!');
        return;
    }
    
    // Lấy danh sách người dùng từ localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Kiểm tra email đã tồn tại chưa
    if (users.find(u => u.email === email)) {
        alert('Email đã được sử dụng!');
        return;
    }
    
    // Thêm người dùng mới
    const newUser = {
        username,
        email,
        password
    };
    
    users.push(newUser);
    
    // Lưu danh sách người dùng mới vào localStorage
    localStorage.setItem('users', JSON.stringify(users));
    
    alert('Đăng ký thành công!');
    window.location.href = 'login.html';
});