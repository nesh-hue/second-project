// State to track authentication and store signup password
let isAuthenticated = false;
let storedPassword = '';

// Helper function to validate inputs
function validateInputs(name = '', email) {
    const nameRegex = /^[a-zA-Z]{2,}$/; // 2+ letters
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email format

    if (name && !nameRegex.test(name)) {
        alert('Name must be at least 2 letters (no numbers or symbols).');
        return false;
    }
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email (e.g., user@example.com).');
        return false;
    }
    return true;
}

// Control site access
function updateSiteAccess() {
    const navLinks = document.querySelectorAll('.nav-links a');
    const destinations = document.querySelectorAll('.destination-card');

    navLinks.forEach(link => {
        link.style.pointerEvents = isAuthenticated ? 'auto' : 'none';
        link.style.opacity = isAuthenticated ? '1' : '0.5';
    });
    destinations.forEach(card => {
        card.style.pointerEvents = isAuthenticated ? 'auto' : 'none';
        card.style.opacity = isAuthenticated ? '1' : '0.5';
    });
    // Keep login link clickable
    const loginNavLink = document.querySelector('.nav-links a[href="#auth"]');
    if (loginNavLink) {
        loginNavLink.style.pointerEvents = 'auto';
        loginNavLink.style.opacity = '1';
    }
}

// Navigation handling
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        if (!isAuthenticated && this.getAttribute('href') !== '#auth') {
            alert('Please sign up or log in first!');
            document.getElementById('auth').scrollIntoView({ behavior: 'smooth' });
            return;
        }
        document.querySelectorAll('.nav-links a').forEach(l => l.classList.remove('active'));
        this.classList.add('active');
        document.getElementById(this.getAttribute('href').substring(1)).scrollIntoView({ behavior: 'smooth' });
    });
});

// Contact form submission
document.querySelector('.contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for your message!');
    this.reset();
});

// Signup/Login handling
const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');
const signupForm = document.querySelector('.sign-up form');
const signinForm = document.querySelector('.sign-in form');
const authSection = document.getElementById('auth');
const loginNavLink = document.querySelector('.nav-links a[href="#auth"]');

registerBtn.addEventListener('click', () => container.classList.add("active"));
loginBtn.addEventListener('click', () => container.classList.remove("active"));

signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = signupForm.querySelector('input[type="text"]').value.trim();
    const email = signupForm.querySelector('input[type="email"]').value.trim();
    const password = signupForm.querySelector('input[type="password"]').value.trim();

    if (!password) {
        alert('Password cannot be empty.');
        return;
    }
    if (validateInputs(name, email)) {
        storedPassword = password; // Store the password
        alert('Signup successful! Please log in with the same password.');
        container.classList.remove('active'); // Switch to login
        signupForm.reset();
    }
});

signinForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = signinForm.querySelector('input[type="email"]').value.trim();
    const password = signinForm.querySelector('input[type="password"]').value.trim();

    if (!password) {
        alert('Password cannot be empty.');
        return;
    }
    if (validateInputs('', email) && password === storedPassword) {
        alert('Logged in successfully!');
        isAuthenticated = true;
        updateSiteAccess();
        authSection.style.display = 'none';
        loginNavLink.style.display = 'none';
        signinForm.reset();
    } else if (validateInputs('', email)) {
        alert('Incorrect password. Use the same password you signed up with.');
    }
});

// Initialize site access
document.addEventListener('DOMContentLoaded', updateSiteAccess);