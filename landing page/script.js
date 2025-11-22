document.addEventListener('DOMContentLoaded', () => {

    // --- 1. FAQ Toggle Logic ---
    window.toggleFaq = (button) => {
        const content = button.nextElementSibling;
        const icon = button.querySelector('span');

        document.querySelectorAll('#faq-container > div > div').forEach(el => {
            if (el !== content && !el.classList.contains('hidden')) {
                el.classList.add('hidden');
                const btn = el.previousElementSibling;
                const icn = btn.querySelector('span');
                if (icn) icn.style.transform = 'rotate(0deg)';
            }
        });

        content.classList.toggle('hidden');
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
            setTimeout(() => {
                document.getElementById('email-input')?.focus();
            }, 600);
        }
    };

    // --- 3. Form Submission Simulation ---
    const submitBtn = document.getElementById('final-submit-btn');
    const emailInput = document.getElementById('email-input');
    const feedback = document.getElementById('cta-feedback');
    const defaultLabel = submitBtn ? submitBtn.innerHTML : '';

    const showFeedback = (message, type = 'success') => {
        if (!feedback) return;
        feedback.textContent = message;
        feedback.classList.remove('hidden', 'text-green-400', 'text-red-400');
        feedback.classList.add(type === 'success' ? 'text-green-400' : 'text-red-400');
    };

    if (submitBtn) {
        submitBtn.addEventListener('click', () => {
            const email = emailInput.value.trim();

            if (!email.includes('@')) {
                emailInput.classList.add('ring-2', 'ring-red-500', 'bg-red-500/10');
                emailInput.focus();
                showFeedback('Digite um e-mail válido para continuar.', 'error');
                setTimeout(() => emailInput.classList.remove('ring-2', 'ring-red-500', 'bg-red-500/10'), 1800);
                return;
            }

            submitBtn.innerHTML = 'Analisando dados...';
            submitBtn.disabled = true;
            submitBtn.classList.add('opacity-80', 'cursor-not-allowed');
            showFeedback('Estamos conferindo suas vendas com segurança.', 'success');

            setTimeout(() => {
                submitBtn.innerHTML = 'Oferta pronta';
                submitBtn.classList.remove('bg-brand-500', 'hover:bg-brand-400');
                submitBtn.classList.add('bg-green-500', 'hover:bg-green-400', 'text-white');
                showFeedback('Pronto! Enviamos a simulação para o seu e-mail.', 'success');

                setTimeout(() => {
                    submitBtn.innerHTML = defaultLabel || 'Liberar meu limite';
                    submitBtn.disabled = false;
                    submitBtn.classList.remove('opacity-80', 'cursor-not-allowed', 'bg-green-500', 'hover:bg-green-400', 'text-white');
                    submitBtn.classList.add('bg-brand-500', 'hover:bg-brand-400');
                    emailInput.value = '';
                }, 1800);
            }, 1400);
        });
    }

    // --- 4. Navbar Scroll Effect ---
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 10) {
            navbar.classList.add('shadow-lg', 'bg-dark-950/90');
            navbar.classList.remove('bg-dark-950/80');
        } else {
            navbar.classList.remove('shadow-lg', 'bg-dark-950/90');
            navbar.classList.add('bg-dark-950/80');
        }
    });
});