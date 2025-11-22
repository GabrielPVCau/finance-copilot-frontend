document.addEventListener('DOMContentLoaded', () => {

    // --- 1. FAQ Toggle Logic ---
    window.toggleFaq = (button) => {
        const content = button.nextElementSibling;
        const icon = button.querySelector('span');

        // Close all other FAQs (Accordion style - optional, but cleaner)
        document.querySelectorAll('#faq-container > div > div').forEach(el => {
            if (el !== content) {
                el.classList.add('hidden');
                el.previousElementSibling.querySelector('span').style.transform = 'rotate(0deg)';
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

    // --- 2. Loan Calculator Logic ---
    const loanRange = document.getElementById('loanRange');
    const loanValue = document.getElementById('loanValue');

    if (loanRange && loanValue) {
        loanRange.addEventListener('input', (e) => {
            const value = parseInt(e.target.value);
            // Format as Currency BRL
            const formatted = value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
            loanValue.textContent = formatted;
        });
    }

    // --- 3. Scroll to CTA ---
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

    // --- 4. Form Submission Simulation ---
    const submitBtn = document.getElementById('final-submit-btn');
    const emailInput = document.getElementById('email-input');

    if (submitBtn) {
        submitBtn.addEventListener('click', () => {
            const email = emailInput.value;

            if (!email || !email.includes('@')) {
                // Simple validation visual feedback
                emailInput.classList.add('ring-2', 'ring-red-500');
                setTimeout(() => emailInput.classList.remove('ring-2', 'ring-red-500'), 2000);
                return;
            }

            // Simulate loading state
            const originalText = submitBtn.innerText;
            submitBtn.innerText = 'Processando...';
            submitBtn.disabled = true;
            submitBtn.classList.add('opacity-75', 'cursor-not-allowed');

            setTimeout(() => {
                // Success State
                submitBtn.innerText = 'Redirecionando...';
                submitBtn.classList.remove('bg-brand-600', 'hover:bg-brand-700');
                submitBtn.classList.add('bg-green-500', 'hover:bg-green-600');

                // Simulate redirect or success message
                alert(`Sucesso! No ambiente real, você seria redirecionado para o onboarding do Open Finance com o email: ${email}`);

                // Reset (for demo purposes)
                setTimeout(() => {
                    submitBtn.innerText = originalText;
                    submitBtn.disabled = false;
                    submitBtn.classList.remove('opacity-75', 'cursor-not-allowed', 'bg-green-500', 'hover:bg-green-600');
                    submitBtn.classList.add('bg-brand-600', 'hover:bg-brand-700');
                    emailInput.value = '';
                }, 3000);
            }, 1500);
        });
    }

    // --- 5. Navbar Scroll Effect ---
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 10) {
            navbar.classList.add('shadow-sm');
        } else {
            navbar.classList.remove('shadow-sm');
        }
    });
});