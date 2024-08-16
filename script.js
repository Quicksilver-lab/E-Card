function generateCard() {
    const cardType = document.getElementById('cardType').value;
    const message = document.getElementById('message').value;
    const quoteSelection = document.getElementById('quoteSelection').value;

    const previewCard = document.getElementById('previewCard');
    previewCard.className = `card-preview ${cardType}`;
    previewCard.innerHTML = `
        <div class="message">${message}</div>
        <div class="quote"><em>${quoteSelection}</em></div>
    `;
    previewCard.style.display = 'block';
}

function downloadCard() {
    html2canvas(document.getElementById('previewCard')).then(canvas => {
        const gif = new GIF({
            workers: 2,
            quality: 10,
            repeat: 0,
            delay: 500 // Adjust delay as needed for animation
        });

        gif.addFrame(canvas, {delay: 500}); // Add frame with delay

        gif.on('finished', function(blob) {
            const a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = 'ecard.gif';
            a.click();
        });

        gif.render();
    }).catch(error => console.error('Error capturing card:', error));
}

function sendCard() {
    const recipientEmail = document.getElementById('recipientEmail').value;
    if (validateEmail(recipientEmail)) {
        const cardType = document.getElementById('cardType').value;
        const message = document.getElementById('message').value;
        const quoteSelection = document.getElementById('quoteSelection').value;

        fetch('sendEmail.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: recipientEmail,
                type: cardType,
                message: message,
                quote: quoteSelection
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('E-Card Sent to ' + recipientEmail + '!');
            } else {
                alert('Failed to send E-Card.');
            }
        })
        .catch(error => console.error('Error sending card:', error));
    } else {
        alert('Please enter a valid email address.');
    }
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}
