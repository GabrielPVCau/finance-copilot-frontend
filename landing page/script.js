document.addEventListener('DOMContentLoaded', () => {

    // 1. Smooth Scroll para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // 2. Animação de Fade-In ao rolar a página (Intersection Observer)
    const observerOptions = {
        threshold: 0.1, // Aciona quando 10% do elemento aparece
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Para de observar depois de animar
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });

    // 3. Simulação do Botão de CTA Principal
    const ctaBtn = document.getElementById('cta-main');
    if (ctaBtn) {
        ctaBtn.addEventListener('click', () => {
            // Aqui você integraria com o n8n no futuro
            alert("Ótimo! No produto final, você seria redirecionado para conectar seu Open Finance de forma segura.");
        });
    }
});