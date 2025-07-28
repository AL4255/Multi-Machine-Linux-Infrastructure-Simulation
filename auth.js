
// Wait for the page to fully load before running code
document.addEventListener('DOMContentLoaded', function() {
    
    // Find the login form on the page
    const loginForm = document.querySelector('form');
    
    // Listen for when someone submits the form
    loginForm.addEventListener('submit', function(event) {
        // Stop the form from submitting the old-fashioned way
        event.preventDefault();
        
        // Get the values the user typed
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        // Show the user we're working on it
        showMessage('Logging in...', 'info');
        
        // Check if the credentials are correct
        validateLogin(username, password);
    });
});

// ============================================
// FUNCTION: Check if username/password is correct
// ============================================
function validateLogin(username, password) {
    
    // FOR NOW: Simple demo validation
    // In real life, this would call your IAM server
    
    if (username === 'admin' && password === 'password123') {
        // Success! 
        showMessage('Login successful! Redirecting...', 'success');
        
        // Save login info (so they stay logged in)
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('currentUser', username);
        localStorage.setItem('loginTime', new Date().toISOString());
        
        // Wait 2 seconds, then redirect to dashboard
        setTimeout(function() {
            window.location.href = '/dashboard.html';
        }, 2000);
        
    } else if (username === 'user' && password === 'user123') {
        // Another demo user
        showMessage('Login successful! Redirecting...', 'success');
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('currentUser', username);
        localStorage.setItem('loginTime', new Date().toISOString());
        
        setTimeout(function() {
            window.location.href = '/dashboard.html';
        }, 2000);
        
    } else {
        // Wrong username or password
        showMessage('Invalid username or password. Please try again.', 'error');
    }
}

// ============================================
// FUNCTION: Show messages to the user
// ============================================
function showMessage(message, type) {
    
    // Remove any existing message
    const existingMessage = document.getElementById('auth-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create a new message element
    const messageDiv = document.createElement('div');
    messageDiv.id = 'auth-message';
    messageDiv.textContent = message;
    
    // Style the message based on type
    if (type === 'success') {
        messageDiv.style.cssText = `
            background: #d4edda;
            color: #155724;
            border: 1px solid #c3e6cb;
            padding: 10px;
            margin: 15px 0;
            border-radius: 4px;
            text-align: center;
        `;
    } else if (type === 'error') {
        messageDiv.style.cssText = `
            background: #f8d7da;
            color: #721c24;
            border: 1px solid #f5c6cb;
            padding: 10px;
            margin: 15px 0;
            border-radius: 4px;
            text-align: center;
        `;
    } else if (type === 'info') {
        messageDiv.style.cssText = `
            background: #d1ecf1;
            color: #0c5460;
            border: 1px solid #bee5eb;
            padding: 10px;
            margin: 15px 0;
            border-radius: 4px;
            text-align: center;
        `;
    }
    
    // Add the message to the page (after the form)
    const form = document.querySelector('form');
    form.parentNode.insertBefore(messageDiv, form.nextSibling);
    
    // Remove the message after 5 seconds (if it's not a success message)
    if (type !== 'success') {
        setTimeout(function() {
            if (messageDiv.parentNode) {
                messageDiv.remove();
            }
        }, 5000);
    }
}

// ============================================
// FUNCTION: Check if user is already logged in
// ============================================
function checkExistingLogin() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const currentUser = localStorage.getItem('currentUser');
    
    if (isLoggedIn === 'true' && currentUser) {
        // User is already logged in, redirect to dashboard
        window.location.href = '/dashboard.html';
    }
}

// Check for existing login when page loads
document.addEventListener('DOMContentLoaded', function() {
    checkExistingLogin();
});
