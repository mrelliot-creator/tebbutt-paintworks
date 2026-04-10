document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('.nav');
    if (hamburger && nav) {
        hamburger.addEventListener('click', () => {
            nav.classList.toggle('open');
            hamburger.textContent = nav.classList.contains('open') ? '✕' : '☰';
        });
    }

    const form = document.getElementById('estimate-form');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = form.querySelector('button');
            const original = btn.innerHTML;
            btn.innerHTML = 'Sending...';
            btn.disabled = true;

            const formData = new FormData(form);
            try {
                const response = await fetch(form.action, { method: 'POST', body: formData });
                if (response.ok || response.type === 'opaqueredirect') {
                    form.reset();
                    showMessage('✅ Thank you! Your estimate request has been received. We will contact you within 1 business day.', 'success');
                } else {
                    showMessage('❌ Something went wrong. Please try again or call YOUR_PHONE.', 'error');
                }
            } catch {
                showMessage('❌ Unable to send. Please email YOUR_EMAIL_HERE directly.', 'error');
            } finally {
                btn.innerHTML = original;
                btn.disabled = false;
            }
        });
    }

    function showMessage(text, type) {
        const fb = document.getElementById('form-feedback');
        if (fb) {
            fb.className = `form-feedback ${type}`;
            fb.innerHTML = text;
            fb.style.display = 'block';
            setTimeout(() => fb.style.display = 'none', 8000);
        }
    }
});
