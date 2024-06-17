async function submitLoginForm(event) {
    event.preventDefault();

    const loginButton = document.getElementById('login-btn');
    const loginLoader = document.getElementById('login-loader');
    const notification = document.getElementById('notification');
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Show loader and disable button during login process
    loginButton.disabled = true;
    loginLoader.classList.remove('hidden');
    notification.textContent = ''; // Clear previous notifications
    notification.classList.add('hidden'); // Hide notification

    try {
        const response = await fetch('https://gnarly-school-just-rail-production.pipeops.app/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            console.error('Error response:', errorMessage);
            throw new Error('Login failed: ' + errorMessage);
        }

        const data = await response.json();
        console.log('Response data:', data);

        // Validate expected response structure
        if (!data.token || !data.user || !data.user.role) {
            throw new Error('Invalid response structure');
        }

        // Store token in local storage or session storage
        localStorage.setItem('token', data.token);

        // Determine where to redirect based on user role
        let redirectUrl = '';
        switch (data.user.role) {
            case 'Donor':
                redirectUrl = '../../complete-profile/donor.html';
                break;
            case 'Facility':
                redirectUrl = '../../complete-profile/facility.html';
                break;
            case 'Admin':
                redirectUrl = '../../admin/dashboard.html';
                break;
            default:
                throw new Error('Unexpected user role');
        }

        // Redirect after successful login
        setTimeout(() => {
            window.location.href = redirectUrl;
        }, 3000); // Redirect after 3 seconds (adjust timing as needed)

    } catch (error) {
        console.error('Login error:', error);
        notification.textContent = 'Login failed. Please check your credentials.';
        notification.classList.remove('hidden');
    } finally {
        loginButton.disabled = false;
        loginLoader.classList.add('hidden');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Any additional initialization code can go here
    const loginForm = document.getElementById('login-form');
    loginForm.addEventListener('submit', submitLoginForm);

    // Example: Hide the loader and notification by default
    const loginLoader = document.getElementById('login-loader');
    const notification = document.getElementById('notification');

    if (loginLoader) {
        loginLoader.classList.add('hidden');
    }
    
    if (notification) {
        notification.classList.add('hidden');
    }
});
