async function submitLoginForm(event) {
    event.preventDefault();
    
    const loginForm = document.getElementById('login-form');
    const loginButton = document.getElementById('login-btn');
    const loginLoader = document.getElementById('login-loader');
    const notification = document.getElementById('notification');
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Show loader and disable button during login process
    loginButton.disabled = true;
    loginLoader.classList.remove('hidden');

    try {
        const response = await fetch('https://gnarly-school-just-rail-production.pipeops.app/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            throw new Error('Login failed');
        }

        const data = await response.json();
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
                // Handle unexpected roles
                break;
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
    const loginForm = document.getElementById('login-form');
    loginForm.addEventListener('submit', submitLoginForm);
});
