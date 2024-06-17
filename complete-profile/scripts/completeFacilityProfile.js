async function submitProfileForm(event) {
    event.preventDefault();
    const profileForm = event.target;
    const formData = new FormData(profileForm);
    const formObject = {};
    formData.forEach((value, key) => {
        formObject[key] = value;
    });

    const errorMessageElement = document.getElementById('error-message');
    errorMessageElement.textContent = ''; // Clear any previous error messages

    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('User not authenticated');
        }

        const response = await fetch('https://gnarly-school-just-rail-production.pipeops.app/api/auth/complete-facility-profile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(formObject),
        });

        if (!response.ok) {
            throw new Error('Profile completion failed');
        }

        const data = await response.json();
        // Handle success, e.g., show success message, redirect, etc.
        console.log('Profile completion successful:', data);
        // Redirect to dashboard or another page after successful profile completion
        setTimeout(() => {
            window.location.href = '../../dashboard/facility-dashboard.html';
        }, 3000); // Redirect after 3 seconds (adjust timing as needed)

    } catch (error) {
        console.error('Profile completion error:', error);
        // Display error message to the user
        errorMessageElement.textContent = error.message;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section-container');
    const nextSectionButtons = document.querySelectorAll('.next-section-btn');
    const prevSectionButtons = document.querySelectorAll('.prev-section-btn');
    const submitButton = document.querySelector('.submit-btn');
    const confirmationCheckbox = document.getElementById('confirmation-checkbox');
    const contactCheckbox = document.getElementById('contact-checkbox');

    let currentSectionIndex = 0;

    function showSection(index) {
        sections.forEach((section, i) => {
            section.classList.toggle('active', i === index);
        });
        currentSectionIndex = index;
    }

    nextSectionButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            showSection(currentSectionIndex + 1);
        });
    });

    prevSectionButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            showSection(currentSectionIndex - 1);
        });
    });

    function toggleSubmitButton() {
        if (confirmationCheckbox.checked && contactCheckbox.checked) {
            submitButton.disabled = false;
            submitButton.classList.remove('btn-disabled');
        } else {
            submitButton.disabled = true;
            submitButton.classList.add('btn-disabled');
        }
    }

    confirmationCheckbox.addEventListener('change', toggleSubmitButton);
    contactCheckbox.addEventListener('change', toggleSubmitButton);
});
