document.addEventListener('DOMContentLoaded', () => {
    // Get form elements
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    
    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    // Username validation regex (letters only)
    const usernameRegex = /^[A-Za-z]+$/;
    
    // Password validation function
    function validatePassword(password) {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    return hasUpperCase && hasSpecialChar && password.length >= 8;
    }
    
    // Show/Hide password toggle function
    function togglePassword(id) {
    const input = document.getElementById(id);
    const icon = input.nextElementSibling;
    if (input.type === "password") {
    input.type = "text";
    icon.classList.remove('fa-eye-slash');
    icon.classList.add('fa-eye');
    } else {
    input.type = "password";
    icon.classList.remove('fa-eye');
    icon.classList.add('fa-eye-slash');
    }
    }
    

    // Display error message
    function showError(element, message) {
    const formGroup = element.parentElement;
    formGroup.classList.add('invalid');
    const errorDisplay = formGroup.querySelector('.error-message');
    errorDisplay.textContent = message;
    }
    
    // Clear error message
    function clearError(element) {
    const formGroup = element.parentElement;
    formGroup.classList.remove('invalid');
    const errorDisplay = formGroup.querySelector('.error-message');
    errorDisplay.textContent = '';
    }
    
    // Validate login form
    loginForm.addEventListener('submit', (e) => {
    const email = document.getElementById('loginEmail');
    const password = document.getElementById('loginPassword');
    
    let valid = true;
    
    // Validate email
    if (!emailRegex.test(email.value)) {
    showError(email, 'Invalid email address');
    valid = false;
    } else {
    clearError(email);
    }
    
    // Validate password (length check)
    if (!validatePassword(password.value)) {
        showError(password, 'Must be at least 8 characters,1 upper case and 1 special character');
        valid = false;
        } else {
        clearError(password);
        }
    
    if (!valid) e.preventDefault(); // Prevent form submission if validation fails
    });
    
    // Validate signup form
    signupForm.addEventListener('submit', (e) => {
    const username = document.getElementById('signupUsername');
    const email = document.getElementById('signupEmail');
    const password = document.getElementById('signupPassword');
    const confirmPassword = document.getElementById('signupConfirmPassword');
    
    let valid = true;
    
    // Validate username (letters only)
    if (!usernameRegex.test(username.value)) {
    showError(username, 'Username must contain only letters');
    valid = false;
    } else {
    clearError(username);
    }
    
    // Validate email
    if (!emailRegex.test(email.value)) {
    showError(email, 'Invalid email address');
    valid = false;
    } else {
    clearError(email);
    }
    
    // Validate password (at least one uppercase, one special character, and minimum 8 characters)
    if (!validatePassword(password.value)) {
    showError(password, 'Must be at least 8 characters,1 upper case and 1 special character');
    valid = false;
    } else {
    clearError(password);
    }
    
    
    // Validate confirm password (must match password)
    if (password.value !== confirmPassword.value) {
    showError(confirmPassword, 'Passwords do not match');
    valid = false;
    } else {
    clearError(confirmPassword);
    }
    ;
    if (!valid) e.preventDefault(); // Prevent form submission if validation fails
    });
    
    // Toggle between login and signup forms
    const loginFormBox = document.querySelector('.Loginform');
    const signupFormBox = document.querySelector('.Signupform');
    const signupLink = document.querySelector('.Signuplink');
    const loginLink = document.querySelector('.Loginlink');
    
    signupLink.onclick = () => {
    signupFormBox.classList.add('active');
    loginFormBox.classList.add('active');
    };
    
    loginLink.onclick = () => {
    signupFormBox.classList.remove('active');
    loginFormBox.classList.remove('active');
    };
    
    // Event listeners for show/hide password
    document.querySelectorAll('.toggle-password').forEach(icon => {
    icon.addEventListener('click', () => {
    const inputId = icon.previousElementSibling.id;
    togglePassword(inputId);


    });
    });
    });

    