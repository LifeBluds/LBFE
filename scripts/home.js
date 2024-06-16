 // Mobile button click handler
 document.getElementById('mobileContinueBtn').addEventListener('click', function () {
    window.location.href = 'reg.html'; 
});

let selectedCard = null;

document.getElementById('donorCard').addEventListener('click', function() {
    document.getElementById('continueBtn').disabled = false;
    document.getElementById('continueBtn').classList.remove('cursor-not-allowed');
    document.getElementById('continueBtn').classList.add('cursor-pointer');
    document.getElementById('donorCard').classList.add('selected');
    document.getElementById('facilityCard').classList.remove('selected');
    selectedCard = 'donor';
    document.querySelector('#donorCard i').classList.add('text-dark-red-500');
    document.querySelector('#facilityCard i').classList.remove('text-dark-red-500');
});

document.getElementById('facilityCard').addEventListener('click', function() {
    document.getElementById('continueBtn').disabled = false;
    document.getElementById('continueBtn').classList.remove('cursor-not-allowed');
    document.getElementById('continueBtn').classList.add('cursor-pointer');
    document.getElementById('facilityCard').classList.add('selected');
    document.getElementById('donorCard').classList.remove('selected');
    selectedCard = 'facility';
    document.querySelector('#facilityCard i').classList.add('text-dark-red-500');
    document.querySelector('#donorCard i').classList.remove('text-dark-red-500');
});

document.getElementById('continueBtn').addEventListener('click', function() {
    if (selectedCard === 'donor') {
        window.location.href = 'signup/donor.html';
    } else if (selectedCard === 'facility') {
        window.location.href = 'signup/facility.html';
    }
});

document.getElementById('leftContent').addEventListener('click', function(event) {
    if (!event.target.closest('#donorCard') && !event.target.closest('#facilityCard') && selectedCard) {
        document.getElementById('continueBtn').disabled = true;
        document.getElementById('continueBtn').classList.add('cursor-not-allowed');
        document.getElementById('continueBtn').classList.remove('cursor-pointer');
        document.getElementById('donorCard').classList.remove('selected');
        document.getElementById('facilityCard').classList.remove('selected');
        selectedCard = null;
        document.querySelector('#donorCard i').classList.remove('text-dark-red-500');
        document.querySelector('#facilityCard i').classList.remove('text-dark-red-500');
    }
});


