document.addEventListener('DOMContentLoaded', function() {
    // Fade in content on page load
    const content = document.querySelector('.content') || document.querySelector('.page-content');
    if (content) {
        setTimeout(() => {
            content.classList.add('fade-in');
        }, 100); // Slight delay for smoothness
    }

    // Check if user is logged in on index page
    const loggedInUser = localStorage.getItem('indexUsername');
    if (loggedInUser && window.location.pathname.includes('index.html')) {
        showFloatingWelcome(loggedInUser);
    }

    // Check if user is logged in on login.html
    const loginUser = localStorage.getItem('username');
    if (loginUser && window.location.pathname.includes('login.html')) {
        showWelcome(loginUser);
    }

    // Handle navigation link clicks
    document.querySelectorAll('a[href]').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '' && this.id !== 'update-username') { // Exclude update link
                e.preventDefault();
                const content = document.querySelector('.content') || document.querySelector('.page-content');
                content.classList.remove('fade-in');
                setTimeout(() => {
                    window.location.href = href;
                }, 1000); // Match CSS transition duration
            }
        });
    });

    // Feedback icon clicks
    document.querySelectorAll('.feedback-icon').forEach(icon => {
        icon.addEventListener('click', function(e) {
            e.preventDefault();
            const platform = this.querySelector('ion-icon').getAttribute('name').replace('logo-', '');
            alert(`Thank you for the feedback! Feel free to share your experience from ${platform}. GALAXY IAP HERE TO SERVE U!`);
        });
    });

    // Copyable text on contact page
    document.querySelectorAll('.copyable').forEach(element => {
        element.addEventListener('click', function() {
            const text = this.getAttribute('data-copy');
            navigator.clipboard.writeText(text).then(() => {
                alert(`Copied: ${text}`);
            });
        });
    });
});

// Index Login Form
document.getElementById('index-login-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = this.querySelector('input[name="email"]').value;
    const username = email.split('@')[0]; // Generate username from email
    localStorage.setItem('indexUsername', username);

    // Store login date
    const now = new Date();
    localStorage.setItem('lastLoginDate', now.toISOString());

    showFloatingWelcome(username);
    this.reset();
});

// Login Form (login.html)
document.getElementById('login-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const username = this.querySelector('input[name="username"]').value;
    localStorage.setItem('username', username);
    showWelcome(username);
    this.reset();
});

// Signup Form (login.html)
document.getElementById('signup-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const username = this.querySelector('input[name="username"]').value;
    localStorage.setItem('username', username);
    showWelcome(username);
    this.reset();
});

// Contact Form
document.getElementById('contact-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = this.querySelector('input[name="name"]').value;
    const email = this.querySelector('input[name="email"]').value;
    const message = this.querySelector('textarea[name="message"]').value;
    alert(`Thank you, ${name}! Your message has been sent.\nEmail: ${email}\nMessage: ${message}`);
    this.reset();
});

// Show floating welcome screen on index page
function showFloatingWelcome(username) {
    const welcomeScreen = document.getElementById('floating-welcome');
    welcomeScreen.style.display = 'flex';
    setTimeout(() => {
        welcomeScreen.classList.add('show');
    }, 10); // Slight delay for fade-in

    document.getElementById('username-display').textContent = username;

    // Calculate days since last login
    const lastLogin = localStorage.getItem('lastLoginDate');
    let daysSinceLogin = 'First login';
    if (lastLogin) {
        const lastDate = new Date(lastLogin);
        const now = new Date();
        const diffTime = Math.abs(now - lastDate);
        daysSinceLogin = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    }
    document.getElementById('days-since-login').textContent = daysSinceLogin;
}

// Close floating welcome screen
function closeFloatingWelcome() {
    const welcomeScreen = document.getElementById('floating-welcome');
    welcomeScreen.classList.remove('show');
    setTimeout(() => {
        welcomeScreen.style.display = 'none';
    }, 500); // Match CSS transition duration
}

// Show welcome message on login.html
function showWelcome(username) {
    document.getElementById('auth-forms').style.display = 'none';
    const welcomeMessage = document.getElementById('welcome-message');
    welcomeMessage.style.display = 'block';
    setTimeout(() => {
        welcomeMessage.classList.add('fade-in');
    }, 100);
}

// Logout function for login.html
function logout() {
    localStorage.removeItem('username');
    const welcomeMessage = document.getElementById('welcome-message');
    welcomeMessage.classList.remove('fade-in');
    setTimeout(() => {
        welcomeMessage.style.display = 'none';
        document.getElementById('auth-forms').style.display = 'block';
        document.getElementById('auth-forms').classList.add('fade-in');
    }, 1000);
}