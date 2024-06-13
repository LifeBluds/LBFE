document.addEventListener('DOMContentLoaded', function () {
    const signUpBtn = document.getElementById('signUpBtn');
    const getStartedBtn = document.getElementById('getStartedBtn');
    const signupModal = document.getElementById('signupModal');
    const donorCard = document.getElementById('donorCard');
    const facilityCard = document.getElementById('facilityCard');
    const continueBtn = document.getElementById('continueBtn');
    let selectedOption = '';

    function openModal(event) {
        event.preventDefault(); // Prevent default anchor behavior
        signupModal.classList.remove('hidden');
    }

    function closeModal() {
        signupModal.classList.add('hidden');
        selectedOption = '';
        continueBtn.disabled = true;
        donorCard.classList.remove('bg-red-500', 'text-white');
        facilityCard.classList.remove('bg-red-500', 'text-white');
    }

    function selectOption(option) {
        selectedOption = option;
        continueBtn.disabled = false;
        if (option === 'donor') {
            donorCard.classList.add('bg-red-500', 'text-white');
            facilityCard.classList.remove('bg-red-500', 'text-white');
        } else {
            facilityCard.classList.add('bg-red-500', 'text-white');
            donorCard.classList.remove('bg-red-500', 'text-white');
        }
    }

    function redirectToRegistration() {
        if (selectedOption === 'donor') {
            window.location.href = 'donor-register.html';
        } else if (selectedOption === 'facility') {
            window.location.href = 'facility-register.html';
        }
    }

    signUpBtn.addEventListener('click', openModal);
    getStartedBtn.addEventListener('click', openModal);

    donorCard.addEventListener('click', () => selectOption('donor'));
    facilityCard.addEventListener('click', () => selectOption('facility'));

    continueBtn.addEventListener('click', redirectToRegistration);

    window.addEventListener('click', function (event) {
        if (event.target === signupModal) {
            closeModal();
        }
    });
});
