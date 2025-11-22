document.addEventListener('DOMContentLoaded', () => {

    // --- 1. FAQ Toggle Logic ---
    window.toggleFaq = (button) => {
        const content = button.nextElementSibling;
        const icon = button.querySelector('span');

        // Close all other FAQs for cleaner look
        document.querySelectorAll('#faq-container > div > div').forEach(el => {
            if (el !== content && !el.classList.contains('hidden')) {
                el.classList.add('hidden');
                const btn = el.previousElementSibling;
                const icn = btn.querySelector('span');
                if (icn) icn.style.transform = 'rotate(0deg)';
            }
        });

        // Toggle current
        content.classList.toggle('hidden');

        // Rotate icon
        if (!content.classList.contains('hidden')) {
            icon.style.transform = 'rotate(180deg)';
        } else {
            icon.style.transform = 'rotate(0deg)';
        }
    };

    // --- 2. Scroll to CTA ---
    window.scrollToCTA = () => {
        const ctaSection = document.getElementById('cta-final');
        if (ctaSection) {
            ctaSection.scrollIntoView({ behavior: 'smooth' });
            // Focus on input for better UX
            setTimeout(() => {
                document.getElementById('email-input')?.focus();
            }, 800);
        }
    };

    // --- 3. Form Submission Simulation ---
    const submitBtn = document.getElementById('final-submit-btn');
    const emailInput = document.getElementById('email-input');

    if (submitBtn) {
        submitBtn.addEventListener('click', () => {
            const email = emailInput.value;

            if (!email || !email.includes('@')) {
                // Visual feedback for error
                emailInput.classList.add('ring-4', 'ring-red-300', 'bg-red-50');
                emailInput.focus();
                setTimeout(() => emailInput.classList.remove('ring-4', 'ring-red-300', 'bg-red-50'), 2000);
                return;
            }

            // Simulate loading state
            const originalText = submitBtn.innerText;
            submitBtn.innerText = 'Analisando...';
            submitBtn.disabled = true;
            submitBtn.classList.add('opacity-80', 'cursor-not-allowed');

            setTimeout(() => {
                // Success State
                submitBtn.innerText = 'Redirecionando...';
                submitBtn.classList.remove('bg-brand-600', 'hover:bg-brand-700');
                submitBtn.classList.add('bg-green-500', 'hover:bg-green-600');

                // Simulate redirect
                alert(`Sucesso! Vamos iniciar sua análise para o email: ${email}`);

                // Reset (for demo)
                setTimeout(() => {
                    submitBtn.innerText = originalText;
                    submitBtn.disabled = false;
                    submitBtn.classList.remove('opacity-80', 'cursor-not-allowed', 'bg-green-500', 'hover:bg-green-600');
                    submitBtn.classList.add('bg-brand-600', 'hover:bg-brand-700');
                    emailInput.value = '';
                }, 2000);
            }, 1500);
        });
    }

    // --- 4. Navbar Scroll Effect ---
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 10) {
            navbar.classList.add('shadow-md', 'bg-white/95');
            navbar.classList.remove('bg-white/90');
        } else {
            navbar.classList.remove('shadow-md', 'bg-white/95');
            navbar.classList.add('bg-white/90');
        }
    });
});