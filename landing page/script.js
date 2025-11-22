document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Zero-Party Data Logic (Multi-step Form) ---
    window.selectObjective = (obj) => {
        const step1 = document.getElementById('step1');
        const form = document.getElementById('leadForm');
        const input = document.getElementById('selectedObjective');

        if (step1 && form && input) {
            input.value = obj;

            // Animate transition
            step1.style.opacity = '0';
            step1.style.transform = 'translateY(-10px)';

            setTimeout(() => {
                step1.classList.add('hidden');
                form.classList.remove('hidden');
                form.classList.add('animate-fade-in-up');

                // Auto-focus email for speed
                setTimeout(() => document.getElementById('email')?.focus(), 100);
            }, 200);
        }
    };

    window.backToStep1 = () => {
        const step1 = document.getElementById('step1');
        const form = document.getElementById('leadForm');

        if (step1 && form) {
            form.classList.add('hidden');
            form.classList.remove('animate-fade-in-up');

            step1.classList.remove('hidden');
            // Reset animation state
            setTimeout(() => {
                step1.style.opacity = '1';
                step1.style.transform = 'translateY(0)';
            }, 50);
        }
    };

    // --- 2. Form Submission & Modal ---
    const form = document.getElementById('leadForm');
    const modal = document.getElementById('successModal');
    const modalOverlay = document.getElementById('modalOverlay');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const objective = document.getElementById('selectedObjective').value;
            const btn = form.querySelector('button[type="submit"]');
            const originalText = btn.innerText;

            // Simulate API Call / Loading State
            btn.disabled = true;
            btn.innerText = 'Processando...';
            btn.classList.add('opacity-80');

            // 5. EXTERNAL REQUIREMENT: GTM/CAPI Placeholder
            console.log('GTM Event: Lead Generated', {
                event: 'generate_lead',
                email: email,
                objective: objective,
                timestamp: new Date().toISOString()
            });

            setTimeout(() => {
                // Show Modal
                if (modal) {
                    document.getElementById('userEmailDisplay').innerText = email;
                    modal.classList.remove('hidden');
                    modal.classList.add('flex');
                }

                // Reset Button
                btn.disabled = false;
                btn.innerText = originalText;
                btn.classList.remove('opacity-80');
            }, 1500);
        });
    }

    window.closeModal = () => {
        if (modal) {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
            form.reset();
            window.backToStep1();
        }
    };

    // Close modal on overlay click
    if (modalOverlay) {
        modalOverlay.addEventListener('click', window.closeModal);
    }

    // --- 3. Scroll to CTA ---
    window.scrollToCTA = () => {
        const ctaSection = document.getElementById('simulacao'); // Changed to the form section
        if (ctaSection) {
            ctaSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // --- 4. Navbar Scroll Effect ---
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 10) {
            navbar.classList.add('shadow-lg', 'bg-slate-950/95');
            navbar.classList.remove('bg-slate-950/80');
        } else {
            navbar.classList.remove('shadow-lg', 'bg-slate-950/95');
            navbar.classList.add('bg-slate-950/80');
        }
    });
});