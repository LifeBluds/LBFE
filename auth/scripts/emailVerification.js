// JavaScript for token verification and redirect
const urlParams = new URLSearchParams(window.location.search);
const token = urlParams.get('token');

if (token) {
    fetch(`https://gnarly-school-just-rail-production.pipeops.app/api/auth/verify-email/${token}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data.success) {
                // Redirect to login page after 5 seconds
                setTimeout(() => {
                    window.location.href = 'signin.html';
                }, 5000);
            } else {
                console.error('Email verification failed:', data.message);
                // Optionally display an error message to the user
                // For example, update DOM to show error message
                const errorMessage = document.createElement('p');
                errorMessage.textContent = 'Email verification failed. Please try again later.';
                document.body.appendChild(errorMessage);
            }
        })
        .catch(error => {
            console.error('Error verifying email:', error);
            // Handle network error or other issues
            // For example, display a generic error message to the user
            const errorMessage = document.createElement('p');
            errorMessage.textContent = 'An error occurred. Please try again later.';
            document.body.appendChild(errorMessage);
        });
} else {
    console.error('Token not found in URL');
    // Handle case where token is missing or invalid
    // For example, display an error message to the user
    const errorMessage = document.createElement('p');
    errorMessage.textContent = 'Token not found or invalid.';
    document.body.appendChild(errorMessage);
}
