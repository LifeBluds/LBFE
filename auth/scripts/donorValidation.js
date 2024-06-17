function handleDonorFormSubmit(event) {
    event.preventDefault();

    const formData = {
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        age: document.getElementById('age').value,
        weight: document.getElementById('weight').value,
        pregnancy: document.getElementById('pregnancy').value,
        password: document.getElementById('password').value
    };

    fetch('https://gnarly-school-just-rail-production.pipeops.app/api/auth/onboard-donor', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        const responseMessage = data.message || 'Registration successful. Check your email to verify your account.';
        sessionStorage.setItem('apiResponse', responseMessage);
        window.location.href = 'email-verification.html';
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
    const donorForm = document.getElementById('register-form');

    // Making all fields required for donor form
    donorForm.querySelectorAll('input, select').forEach(field => {
        field.setAttribute('required', 'required');
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

    donorForm.addEventListener('submit', handleDonorFormSubmit);
});
