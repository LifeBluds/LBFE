function handleFacilityFormSubmit(event) {
    event.preventDefault();

    const formData = {
        facilityType: document.getElementById('facility-type').value,
        regNumber: document.getElementById('reg-number').value,
        email: document.getElementById('facility-email').value,
        phoneNumber: document.getElementById('official-phone').value,
        address: document.getElementById('address').value,
        city: document.getElementById('city').value,
        state: document.getElementById('state').value,
        password: document.getElementById('password').value
    };

    fetch('https://gnarly-school-just-rail-production.pipeops.app/api/auth/onboard-facility', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json().then(data => ({ status: response.status, body: data })))
    .then(({ status, body }) => {
        const responseMessage = body.message || 'An error occurred.';
        sessionStorage.setItem('apiResponse', responseMessage);

        if (status === 201) { // Facility registered successfully
            window.location.href = 'email-verification.html';
        } else if (status === 409) { // Email address already registered
            window.location.href = 'email-already-registered.html';
        } else {
            window.location.href = 'error.html'; // Generic error page
        }
    })
    .catch(error => {
        const notification = document.getElementById('notification');
        notification.textContent = 'Error submitting form. Please try again.';
        notification.classList.remove('hidden');
        setTimeout(() => notification.classList.add('hidden'), 3000);
        console.error('Error:', error);
    });
}

document.addEventListener("DOMContentLoaded", function() {
    const facilityForm = document.getElementById('register-form');

    // Making fields required, except registration number
    facilityForm.querySelectorAll('input, select').forEach(field => {
        if (field.id !== 'reg-number') {
            field.setAttribute('required', 'required');
        }
    });

    // Toggle password visibility
    const togglePassword = document.getElementById('togglePassword');
    const password = document.getElementById('password');

    togglePassword.addEventListener('click', function() {
        const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
        password.setAttribute('type', type);
        this.classList.toggle('fa-eye-slash');
    });

    // Password validation
    const lengthCheck = document.getElementById('length-check');
    const specialCheck = document.getElementById('special-check');
    const registerBtn = document.getElementById('register-btn');

    password.addEventListener('input', function() {
        const value = password.value;
        const lengthValid = value.length >= 8;
        const specialValid = /[!@#$%^&*(),.?":{}|<>]/g.test(value);

        lengthCheck.classList.toggle('fa-times', !lengthValid);
        lengthCheck.classList.toggle('fa-check', lengthValid);
        lengthCheck.classList.toggle('invalid-check', !lengthValid);
        lengthCheck.classList.toggle('valid-check', lengthValid);

        specialCheck.classList.toggle('fa-times', !specialValid);
        specialCheck.classList.toggle('fa-check', specialValid);
        specialCheck.classList.toggle('invalid-check', !specialValid);
        specialCheck.classList.toggle('valid-check', specialValid);

        const allValid = lengthValid && specialValid;
        registerBtn.disabled = !allValid;
        registerBtn.classList.toggle('btn-disabled', !allValid);
    });

    facilityForm.addEventListener('submit', handleFacilityFormSubmit);
});


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
