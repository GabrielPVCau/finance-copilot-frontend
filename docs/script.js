document.addEventListener('DOMContentLoaded', () => {
    const scrollButtons = document.querySelectorAll('[data-scroll]');
    scrollButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
            const target = document.querySelector(btn.dataset.scroll);
            target?.scrollIntoView({ behavior: 'smooth' });
        });
    });

    const navToggle = document.querySelector('.nav-toggle');
    const nav = document.getElementById('primaryNav');
    if (navToggle && nav) {
        navToggle.setAttribute('aria-expanded', 'false');
        nav.setAttribute('aria-expanded', 'false');
        navToggle.addEventListener('click', () => {
            const expanded = navToggle.getAttribute('aria-expanded') === 'true';
            navToggle.setAttribute('aria-expanded', (!expanded).toString());
            nav.setAttribute('aria-expanded', (!expanded).toString());
        });
    }

    const dtrTarget = document.querySelector('[data-dtr]');
    if (dtrTarget) {
        const params = new URLSearchParams(window.location.search);
        const segmento = params.get('segmento') || params.get('setor');
        const cidade = params.get('cidade');
        const uf = params.get('uf');
        let text = dtrTarget.getAttribute('data-dtr-default');
        if (segmento) {
            text = `Crédito justo para ${segmento}`;
        } else if (cidade) {
            text = `Crédito justo para PMEs de ${cidade}${uf ? ` - ${uf}` : ''}`;
        }
        dtrTarget.textContent = text;
    }

    const cascadeTargets = document.querySelectorAll('.cascade');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    cascadeTargets.forEach((el) => observer.observe(el));

    const buttons = document.querySelectorAll('.btn, .chip');
    buttons.forEach((item) => {
        item.addEventListener('pointerdown', () => {
            item.classList.add('is-pressed');
        });
        item.addEventListener('pointerup', () => {
            item.classList.remove('is-pressed');
        });
        item.addEventListener('pointerleave', () => {
            item.classList.remove('is-pressed');
        });
    });

    const form = document.getElementById('creditForm');
    const progressLabel = document.getElementById('formProgress');
    const feedback = document.getElementById('formFeedback');
    if (form && progressLabel && feedback) {
        const steps = Array.from(form.querySelectorAll('.form-step'));
        let currentStep = 0;

        const updateProgress = () => {
            progressLabel.textContent = `Passo ${currentStep + 1} de ${steps.length}`;
        };

        const showStep = (index) => {
            steps.forEach((step, i) => {
                step.hidden = i !== index;
            });
            currentStep = index;
            updateProgress();
        };

        const chips = form.querySelectorAll('.form-step[data-step="0"] .chip');
        const objectiveField = document.getElementById('objectiveField');
        chips.forEach((chip) => {
            chip.addEventListener('click', () => {
                chips.forEach((c) => c.classList.remove('active'));
                chip.classList.add('active');
                objectiveField.value = chip.dataset.value || '';
                showStep(1);
            });
        });

        form.addEventListener('click', (event) => {
            const target = event.target;
            if (target instanceof HTMLElement && target.hasAttribute('data-next')) {
                const fieldset = target.closest('.form-step');
                if (!fieldset) return;
                const input = fieldset.querySelector('input');
                if (input && !input.checkValidity()) {
                    input.reportValidity();
                    return;
                }
                const nextIndex = currentStep + 1;
                if (nextIndex < steps.length) {
                    showStep(nextIndex);
                }
            }
        });

        form.addEventListener('submit', (event) => {
            event.preventDefault();
            const valid = form.checkValidity();
            if (!valid) {
                form.reportValidity();
                return;
            }
            feedback.textContent = 'Analisando dados em tempo real...';
            const formData = new FormData(form);
            console.log('Lead submitted', Object.fromEntries(formData.entries()));
            setTimeout(() => {
                feedback.textContent = 'Tudo certo! Enviamos o link seguro para o seu email.';
                form.reset();
                steps.forEach((step) => {
                    const chipsInner = step.querySelectorAll('.chip');
                    chipsInner.forEach((chip) => chip.classList.remove('active'));
                });
                showStep(0);
            }, 1200);
        });

        showStep(0);
    }

    const quizForm = document.getElementById('qualifyQuiz');
    const quizResult = document.getElementById('quizResult');
    if (quizForm && quizResult) {
        const quizChips = quizForm.querySelectorAll('.quiz-question .chip');
        quizChips.forEach((chip) => {
            chip.addEventListener('click', () => {
                const parent = chip.closest('.chip-group');
                parent?.querySelectorAll('.chip').forEach((c) => c.classList.remove('active'));
                chip.classList.add('active');
            });
        });

        quizForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const picked = Array.from(quizForm.querySelectorAll('.quiz-question')).map((question) => {
                const selected = question.querySelector('.chip.active');
                return selected ? Number(selected.dataset.score) : 0;
            });
            if (picked.includes(0)) {
                quizResult.textContent = 'Selecione uma resposta para cada pergunta.';
                return;
            }
            const score = picked.reduce((sum, value) => sum + value, 0);
            if (score >= 8) {
                quizResult.textContent = 'Sinal verde! Vamos liberar o dossiê prioritário e conectar você a taxas agressivas.';
            } else if (score >= 6) {
                quizResult.textContent = 'Você está pronto, mas indicamos revisar previsibilidade de recebíveis. Nosso time ajuda nisso na etapa 1.';
            } else {
                quizResult.textContent = 'Ainda dá tempo: conecte seu Open Finance e normalize fluxo para subir de faixa. Nosso playbook envia o passo a passo.';
            }
        });
    }
});