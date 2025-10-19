// contact-form.js
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    const messagesDiv = document.querySelector('.messages');

    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        // Show loading state
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.innerHTML;
        submitButton.innerHTML = 'Sending...';
        submitButton.disabled = true;

        // Gather form data
        const formData = {
            name: document.getElementById('form_name').value,
            email: document.getElementById('form_email').value,
            subject: document.getElementById('form_subject').value,
            budget: document.getElementById('form_budget').value,
            message: document.getElementById('form_message').value
        };

        try {
            const response = await fetch('http://localhost:3000/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (response.ok) {
                console.log("running")
                // Show success message
                messagesDiv.innerHTML = `
                    <div class="alert alert-success">
                        Message sent successfully! We'll get back to you soon.
                    </div>
                `;
                contactForm.reset();
            } else {
                throw new Error(result.message || 'Failed to send message');
            }
        } catch (error) {
            // Show error message
            messagesDiv.innerHTML = `
                <div class="alert alert-danger">
                    ${error.message || 'An error occurred. Please try again later.'}
                </div>
            `;
        } finally {
            // Restore button state
            submitButton.innerHTML = originalButtonText;
            submitButton.disabled = false;
        }
    });
});