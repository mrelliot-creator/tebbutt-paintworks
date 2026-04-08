/* Main shared JavaScript – navigation & form handling */

document.addEventListener('DOMContentLoaded', () => {
    // Mobile hamburger menu
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('.nav');
    
    // Mobile hamburger menu
const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('.nav');

if (hamburger && nav) {
    hamburger.addEventListener('click', () => {
        nav.classList.toggle('open');
        const isOpen = nav.classList.contains('open');
        hamburger.setAttribute('aria-expanded', isOpen);
        hamburger.textContent = isOpen ? '✕' : '☰';
    });
}

    // Estimate form handler (only on contact page)
    const form = document.getElementById('estimate-form');
    if (form) {
        form.addEventListener('submit', async function (e) {
            e.preventDefault();

            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = 'Sending...';
            submitBtn.disabled = true;

            // Honeypot spam check
            const honeypot = form.querySelector('input[name="honeypot"]');
            if (honeypot && honeypot.value.trim() !== '') {
                showFormMessage('Thank you!', 'success');
                form.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                return;
            }

            const formData = new FormData(form);

            try {
                const response = await fetch(form.action, {
                    method: 'POST',
                    body: formData
                });

                if (response.ok || response.type === 'opaqueredirect') {
                    form.reset();
                    showFormMessage('✅ Thank you! Your free estimate request has been received.<br>We will contact you within 1 business day.', 'success');
                } else {
                    showFormMessage('❌ Sorry, something went wrong. Please try again or call 07903431503.', 'error');
                }
            } catch (err) {
                showFormMessage('❌ Unable to send request. Please email tebbuttandson@gmail.com directly.', 'error');
            } finally {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        });
    }

    function showFormMessage(html, type) {
        const feedback = document.getElementById('form-feedback');
        if (!feedback) return;
        
        feedback.className = `form-feedback ${type}`;
        feedback.innerHTML = html;
        feedback.style.display = 'block';
        
        setTimeout(() => {
            feedback.style.display = 'none';
        }, 8000);
    }
});
