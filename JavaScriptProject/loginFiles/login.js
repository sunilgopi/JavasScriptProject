const togglePassword = document.getElementById('togglePassword');
const passwordField = document.getElementById('password');
const userType = document.getElementById('userType');
const loginButton = document.getElementById('login-btn');
const userName = document.getElementById('username');

// Toggle Password Visibility
togglePassword.addEventListener('click', function () {
    const type = passwordField.type === 'password' ? 'text' : 'password';
    passwordField.type = type;
    this.classList.toggle('fa-eye-slash');
});
// const isLogesin = JSON.parse(localStorage.getItem("loginSecurity"))
// console.log(isLogesin);
// if(!isLogesin)
// {
//     window.location.href = "../loginFiles/login.html"

// }


// Validation of username and password using local storage
loginButton.addEventListener('click', (e) => {
    e.preventDefault();

    // Retrieve stored data for admin and users
    const adminData = JSON.parse(localStorage.getItem('admin')) || [];
    const userData = JSON.parse(localStorage.getItem('userData')) || [];



    const usernameInput = userName.value.trim();
    const passwordInput = passwordField.value.trim();

    if (userType.value === 'user') {
        // Check if user exists and password matches
        const user = userData.find((u) => u.username === usernameInput && u.password === passwordInput);
        if (user) {
            console.log('User login successful');

            // Store the current user's data in localStorage as activeUser
            localStorage.setItem('activeUser', JSON.stringify(user));
            localStorage.setItem('loginSecurity', JSON.stringify(true));
            let user_admin = JSON.parse(localStorage.getItem("usersAdmin")) || [];

            user_admin.push(user);
            localStorage.setItem("usersAdmin", JSON.stringify(user_admin))

            Swal.fire({
                icon: 'success',
                title: 'Welcome, User',
                text: 'You have successfully logged in.',
                confirmButtonText: 'OK',
            }).then(() => {
                window.location.href = "../userFiles/user.html";
            });
        } else {
            console.log('Invalid username or password');
            window.location.href = "../loginFiles/login.html"
            Swal.fire({
                icon: 'error',
                title: 'Login Failed',
                text: 'Invalid User credentials!',
            });
        }
    } else if (userType.value === 'admin') {
        // Check if admin exists and password matches
        const admin = adminData.find((a) => a.username === usernameInput && a.password === passwordInput);
        if (admin) {
            console.log('Admin login successful');

            // Store the current admin's data in localStorage as activeUser
            localStorage.setItem('activeUser', JSON.stringify(admin));

            Swal.fire({
                icon: 'success',
                title: 'Welcome, Admin!',
                text: 'You have successfully logged in.',
                confirmButtonText: 'OK',
            }).then(() => {
                window.location.href = "../adminFiles/admin.html";
            });
        } else {
            console.log('Invalid admin username or password');
            Swal.fire({
                icon: 'error',
                title: 'Login Failed',
                text: 'Invalid Admin credentials!',
            });
        }
    } else {
        Swal.fire({
            icon: 'warning',
            title: 'User Type Missing',
            text: 'Please select a user type!',
        });
    }
});
