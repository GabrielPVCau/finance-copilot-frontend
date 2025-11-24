document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    if (window.lucide) {
        lucide.createIcons();
    }

    // Smooth Scroll
    document.querySelectorAll('[data-scroll]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = btn.getAttribute('data-scroll');
            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Mobile Nav Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.getElementById('primaryNav');
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
            navToggle.setAttribute('aria-expanded', !isExpanded);
            navMenu.classList.toggle('active');
            // Simple toggle for mobile menu visibility if needed by CSS, 
            // though CSS currently handles it via media queries. 
            // Let's add a class for the mobile state if strictly needed, 
            // but the current CSS uses display:none/flex based on media query.
            // For a true mobile menu overlay, we'd need extra CSS. 
            // Assuming the CSS provided handles the 'nav-menu' visibility on mobile 
            // via a class or similar if it was hidden. 
            // Looking at my CSS, .nav-menu is display:none on mobile. 
            // I need to add a rule for .nav-menu.active in CSS or handle it here inline for safety.
            if (!isExpanded) {
                navMenu.style.display = 'flex';
                navMenu.style.flexDirection = 'column';
                navMenu.style.position = 'absolute';
                navMenu.style.top = '100%';
                navMenu.style.left = '0';
                navMenu.style.right = '0';
                navMenu.style.background = '#0f172a';
                navMenu.style.padding = '1rem';
                navMenu.style.zIndex = '49';
            } else {
                navMenu.style.display = '';
            }
        });
    }

    // Dynamic Text Replacement (DTR)
    const dtrElement = document.querySelector('[data-dtr]');
    if (dtrElement) {
        const params = new URLSearchParams(window.location.search);
        const utmSource = params.get('utm_source');
        const segment = params.get('segment');

        if (segment) {
            dtrElement.textContent = `Crédito especializado para ${segment}`;
        } else if (utmSource === 'instagram') {
            dtrElement.textContent = 'Sua audiência virando crédito real';
        }
    }

    // Cascade Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.getAttribute('data-delay') || 0;
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.cascade').forEach(el => observer.observe(el));

    // Interactive Demo Logic
    const revenueRange = document.getElementById('revenueRange');
    const revenueValue = document.getElementById('revenueValue');
    const creditValue = document.getElementById('creditValue');

    if (revenueRange && revenueValue && creditValue) {
        const formatCurrency = (val) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

        revenueRange.addEventListener('input', (e) => {
            const val = parseInt(e.target.value);
            revenueValue.textContent = formatCurrency(val);

            // Simple logic: Credit is roughly 30% of revenue
            const credit = val * 0.3;
            creditValue.textContent = formatCurrency(credit);

            // Animate graph bars randomly for effect
            document.querySelectorAll('.graph-bar').forEach(bar => {
                const randomHeight = Math.floor(Math.random() * 60) + 20;
                bar.style.height = `${randomHeight}%`;
            });
        });
    }

    // Conversational Form Logic
    const form = document.getElementById('creditForm');
    if (form) {
        const steps = form.querySelectorAll('.form-step');
        const progressFill = document.getElementById('formProgress');
        let currentStep = 1;
        const totalSteps = steps.length;

        const updateProgress = () => {
            const percentage = (currentStep / totalSteps) * 100;
            progressFill.style.width = `${percentage}%`;
        };

        const showStep = (stepNumber) => {
            steps.forEach(step => {
                step.classList.remove('active');
                if (parseInt(step.dataset.step) === stepNumber) {
                    step.classList.add('active');
                }
            });
            currentStep = stepNumber;
            updateProgress();
        };

        // Step 1: Option Buttons
        form.querySelectorAll('.option-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const value = btn.dataset.value;
                const input = form.querySelector('input[name="objective"]');
                if (input) input.value = value;

                // Visual feedback
                form.querySelectorAll('.option-btn').forEach(b => b.style.borderColor = '');
                btn.style.borderColor = 'var(--brand-primary)';

                setTimeout(() => showStep(2), 300);
            });
        });

        // Next Buttons
        form.querySelectorAll('.next-step').forEach(btn => {
            btn.addEventListener('click', () => {
                const currentStepEl = form.querySelector(`.form-step[data-step="${currentStep}"]`);
                const input = currentStepEl.querySelector('input');

                if (input && !input.checkValidity()) {
                    input.reportValidity();
                    return;
                }

                showStep(currentStep + 1);
            });
        });

        // Form Submission
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const feedback = document.getElementById('formFeedback');
            const btn = form.querySelector('button[type="submit"]');

            if (btn) {
                const originalText = btn.textContent;
                btn.textContent = 'Gerando Dossiê...';
                btn.disabled = true;

                // Simulate API call
                setTimeout(() => {
                    form.style.display = 'none';
                    feedback.classList.remove('hidden');
                    feedback.innerHTML = `
                        <div class="text-center">
                            <i data-lucide="check-circle" class="text-brand mx-auto mb-4" style="width: 48px; height: 48px;"></i>
                            <h3 class="text-xl font-bold mb-2">Dossiê Solicitado!</h3>
                            <p class="text-muted">Enviamos um link de confirmação para o seu email.</p>
                        </div>
                    `;
                    lucide.createIcons();
                }, 1500);
            }
        });
    }

    // Hide Sticky CTA when near form
    const stickyBar = document.getElementById('mobileStickyBar');
    const formSection = document.getElementById('conversational-form');

    if (stickyBar && formSection) {
        window.addEventListener('scroll', () => {
            const formRect = formSection.getBoundingClientRect();
            if (formRect.top < window.innerHeight && formRect.bottom > 0) {
                stickyBar.style.transform = 'translateY(100%)';
                stickyBar.style.transition = 'transform 0.3s ease';
            } else {
                stickyBar.style.transform = 'translateY(0)';
            }
        });
    }
});